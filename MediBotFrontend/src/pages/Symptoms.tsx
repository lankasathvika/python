import React, { useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBA5rtNNVSNures_Gwpe3ZBq4Bq44O6Mbw";

const symptoms = [
  "headache",
  "fever",
  "cough",
  "sore throat",
  "runny nose",
  "nausea",
  "vomiting",
  "diarrhea",
  "abdominal pain",
  "muscle aches",
  "joint pain",
  "fatigue",
  "rash",
  "itching",
  "swelling",
  "redness",
  "pain",
  "difficulty breathing",
  "chest pain",
  "confusion",
  "seizures",
  "loss of consciousness",
];

const Symptoms = () => {
  const [result, setResult] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const generateContent = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
    const parts = [
      { text: `I am having the following symptoms: ${selectedSymptoms.join(", ")}. What disease might I have? `},
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    setResult(response.text());
  };

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <div className="grad2 py-5 h-100">
      <div className="rounded-3 shadow col-10 mx-auto ">
        <div className="mx-auto d-flex flex-column justify-content-center p-5 glass py-5">
          <h1 className="">Symptom Checker</h1>
          <p>
            Select the symptoms you are experiencing and click the "Generate Content" button to get a possible diagnosis.
          </p>
          <ul className="d-flex flex-wrap gap-3 col-8 mx-auto">
            {symptoms.map((symptom) => (
              <li key={symptom} className="d-flex flex-row align-items-center  justify-content-center gap-2">
                <input type="checkbox" className="form-check m-0" id={symptom} onChange={() => toggleSymptom(symptom)} />
                <label className="form-label m-0" htmlFor={symptom}>{symptom}</label>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary col-8 mx-auto" onClick={generateContent}>Generate Content</button>
        </div>
        <div className="bg-light mx-auto p-5">{result}</div>
      </div>
    </div>
  );
};

export default Symptoms;
