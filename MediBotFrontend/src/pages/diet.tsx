import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface DietItem {
  food: string;
  servingSize: string;
}
const DietPage = () => {
  const [formData, setFormData] = useState({
    age: 25,
    gender: "male",
    activityLevel: "moderately-active",
    weight: 150,
    height: 68,
    goal: "lose-weight",
    allergies: "",
    likedFood: "chicken,rice,broccoli",
    dislikedFood: "fish,eggs,mushrooms",
  });
  const [dietPlan, setDietPlan] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBA5rtNNVSNures_Gwpe3ZBq4Bq44O6Mbw";

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const generationConfig = {
      temperature: 0.1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    // const prompt = `Generate a personalized diet plan for a ${formData.age} year old ${formData.gender}. ` +
    //   `Their activity level is ${formData.activityLevel}, weight is ${formData.weight} lbs, and height is ${formData.height} inches. ` +
    //   `Their goal is to ${formData.goal}. ` +
    //   `They are allergic to ${formData.allergies}. ` +
    //   `They like ${formData.likedFood} and dislike ${formData.dislikedFood}. ` +
    //   Include a variety of foods and serving sizes.;
    const parts = [
      { text:  `Generate a personalized diet plan for a ${formData.age} year old ${formData.gender}. ` +
      `Their activity level is ${formData.activityLevel}, weight is ${formData.weight} lbs, and height is ${formData.height} inches. ` +
      `Their goal is to ${formData.goal}. ` +
      `They are allergic to ${formData.allergies}. ` +
      `They like ${formData.likedFood} and dislike ${formData.dislikedFood}. ` +
      `Include a variety of foods and serving sizes. ` },
    ];

     const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
     });

    // const generativelanguageModel = model.generateContent;
    // const [response] = await generativelanguageModel.arguments({
    //   initialText: prompt,
    //   numReturnValues: 1,
    // });
    const response = result.response;
    setDietPlan(response.text()); 
    // Sample response data
// const rawResponse = dietPlan;

// // Function to format the response
// const formatResponse = (rawResponse) => {
//   const sections = rawResponse.split('').filter(section => section.trim() !== '');

//   return sections.map(section => {
//     const lines = section.split('*').filter(line => line.trim() !== '');
//     const title = lines[0].trim().replace(':', '');
//     const items = lines.slice(1).map(item => item.trim());
    
//     return { title, items };
//   });
// };

// // Formatted response
// const formattedResponse = formatResponse(rawResponse);

  };

  return (
    <div className="px-5 grad2">
        <div className="d-flex flex-row">
            <div className="d-flex flex-wrap gap-2 col-5 text-start p-3 shadow my-4" style={{background:'#ffffff',}}>
              <h1>Personalized Diet Plan</h1>
              <p>
                Enter your personal information and we will generate a personalized diet plan
                tailored to your needs and goals.
              </p>
            
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                <div>
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="form-control"
                    />
                </div>
            
                <div className="d-flex flex-row justify-content-between ">
                    <div>
                        <label htmlFor="gender" className=" form-label ">Gender:</label>
                        <select name="gender" value={formData.gender} className=" form-select " onChange={handleChange}>
                          <option value="male" className=" form-control ">Male</option>
                          <option value="female" className=" form-control ">Female</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="activity-level" className="form-label">Activity Level:</label>
                        <select
                          name="activityLevel"
                          value={formData.activityLevel}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="lightly-active">Lightly Active</option>
                          <option value="moderately-active">Moderately Active</option>
                          <option value="very-active">Very Active</option>
                          <option value="extremely-active">Extremely Active</option>
                        </select>
                    </div>
                </div>
            
                <div className="d-flex flex-row justify-content-between ">
                    <div>
                        <label htmlFor="weight" className="form-label">Weight (lbs):</label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="form-control"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="height" className="form-label">Height (inches):</label>
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className="form-control"
                        />
                    </div>
                </div>
            
                <div className=" d-flex flex-row justify-content-between ">
                    <div>
                        <label htmlFor="goal" className="form-label">Goal:</label>
                        <select name="goal" value={formData.goal} onChange={handleChange} className="form-control">
                          <option value="lose-weight">Lose Weight</option>
                          <option value="gain-weight">Gain Weight</option>
                          <option value="maintain-weight">Maintain Weight</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="allergies" className="form-label">Allergies (comma-separated):</label>
                        <input
                          type="text"
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleChange}
                          className="form-control"
                        />
                    </div>
                </div>
            
                <div className=" d-flex flex-row justify-content-between gap-4">
                    <div>
                        <label htmlFor="liked-food" className="form-label">Liked Foods:</label>
                        <input
                          type="text"
                          name="likedFood"
                          value={formData.likedFood}
                          onChange={handleChange}
                          className=" form-control "
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="disliked-food" className=" form-label ">Disliked Foods:</label>
                        <input
                          type="text"
                          name="dislikedFood"
                          value={formData.dislikedFood}
                          onChange={handleChange}
                          className=" form-control "
                        />
                    </div>
                </div>
            
                <button type="submit" className=" btn btn-success ">Generate Diet Plan</button>
              </form>
            </div>
            <div className="col-7 px-5 py-3 my-4" style={{background:'#F5F7FA'}}>{dietPlan}</div>
        </div>
    </div>
  );
};

export default DietPage;
