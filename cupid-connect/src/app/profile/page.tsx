// ProfilePage.js
"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'; 
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'; 
import "./styles.css"; 
import { firebaseApp} from "../../lib/firebaseConfig";

import { addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
const ProfilePage = () => {

  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  // const [interests, setInterests] = useState<string>('');
  const [age, setAge] = useState<number>(0);


  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [selectedRelationshipOption, setSelectedRelationshipOption] = useState<string>('');  
  const [selectedCommunicationOption, setSelectedCommunicationOption] = useState<string>('');  
  const [selectedStanceOnChildren, setSelectedStanceOnChildren] = useState<string>('');  
  const [selectedLifestyle , setSelectedLifestyle] = useState<string>('');  
  const [selectedIdealFirstDate , setSelectedIdealFirstDate] = useState<string>('');  
  const [selectedAttitudeTowardsPets , setSelectedAttitudeTowardsPets] = useState<string>('');  
  const [selectedReligionSpirituality  , setSelectedReligionSpirituality] = useState<string>('');  
  const [selectedConflictResolution  , setSelectedConflictResolution] = useState<string>('');  
  const [selectedFinancesApproach   , setSelectedFinancesApproach] = useState<string>(''); 
  const [selectedPhysicalIntimacy    , setSelectedPhysicalIntimacy ] = useState<string>('');  
  const [loading, setLoading] = useState(false);


  
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDocRef);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setName(userData.name || '');
          setAge(userData.age || 18);
          setGender(userData.gender || '');
          // setInterests(userData.interests || '');
          setSelectedCommunicationOption(userData.selectedCommunicationOption || '');
          setSelectedRelationshipOption(userData.selectedRelationshipOption || '');
          setSelectedStanceOnChildren(userData.selectedStanceOnChildren || '');
          setSelectedLifestyle(userData.selectedLifestyle || '');
          setSelectedIdealFirstDate(userData.selectedIdealFirstDate || '');
          setSelectedAttitudeTowardsPets(userData.selectedAttitudeTowardsPets || '');
          setSelectedReligionSpirituality(userData.selectedReligionSpirituality || '');
          setSelectedConflictResolution(userData.selectedConflictResolution || '');
          setSelectedPhysicalIntimacy(userData.selectedPhysicalIntimacy || '');
          setSelectedFinancesApproach(userData.selectedFinancesApproach || '');
        }

      } else {

        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
 
const maxUnlockedProfiles=6 ;
const maxmatchScore=60;
const fcmToken="";

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent default form submission behavior
      setLoading(true); // Set loading state to true

  // Get the currently authenticated user
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    // Handle case where there's no authenticated user
    console.error('No authenticated user found.');
    return;
  }

  try {
    // Get Firestore instance from the Firebase app
    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, 'users');
    
    // Check if the user's profile already exists
    const userDoc = doc(usersCollection, currentUser.uid);
    const userDocSnapshot = await getDoc(userDoc);
    
    if (userDocSnapshot.exists()) {
      // Update the existing profile with the new data
        await updateDoc(userDoc, {isOnline: true, fcmToken, name, age,maxUnlockedProfiles, maxmatchScore,gender,selectedCommunicationOption,selectedRelationshipOption,selectedStanceOnChildren,selectedLifestyle ,selectedIdealFirstDate ,selectedAttitudeTowardsPets ,selectedReligionSpirituality ,selectedConflictResolution ,selectedFinancesApproach ,selectedPhysicalIntimacy  });
      alert('Profile updated successfully!');
    } else {
      // Add a new document with the user input data to a "users" collection
        await setDoc(userDoc, {isOnline: true, fcmToken, name, age,maxUnlockedProfiles, maxmatchScore,gender,selectedCommunicationOption,selectedRelationshipOption,selectedStanceOnChildren,selectedLifestyle ,selectedIdealFirstDate ,selectedAttitudeTowardsPets ,selectedReligionSpirituality ,selectedConflictResolution ,selectedFinancesApproach ,selectedPhysicalIntimacy  });

      alert('Profile created successfully!');
    }

    setName('');
    setSelectedCommunicationOption('');
    setSelectedRelationshipOption('');
    setSelectedStanceOnChildren('');
    setSelectedIdealFirstDate('');
    setSelectedLifestyle('');
    setSelectedAttitudeTowardsPets('');
    setSelectedReligionSpirituality(''); 
    setSelectedConflictResolution(''); 
    setSelectedPhysicalIntimacy(''); 
    setSelectedFinancesApproach('');  
    setAge(18);
    setGender('');
    // setInterests(''); 

          window.location.href = '/match';

  } catch (error) {
    console.error('Error updating/creating profile:', error);
    alert('Error updating/creating profile. Please try again.');
  } finally {
      setLoading(false);  
    }
};

const relationshipOptions = [
  "Casual dating",
  "Serious relationship",
  "Just looking for friends",
  "Open to different options"
];

const communicationOptions = [
  "Daily",
  "A few times a week",
  "Occasionally",
  "Depends on the day"
];
const stanceOnChildrenOptions = [
  "Want children someday",
  "Don't want children",
  "Still undecided",
  "Prefer not to disclose"
];

 

const lifestyleOptions = [
  "Active and adventurous",
  "Chill and laid-back",
  "Social and outgoing",
  "Balanced b/w activities and relaxation"
];

const idealFirstDateOptions = [
  "Fancy dinner out",
  "Outdoor adventure (hiking, etc.)",
  "Netflix and snacks at home",
  "Coffee or drinks at a cozy spot"
];

const attitudeTowardsPetsOptions = [
  "Love them! Have pets or want them",
  "Like them but don't have any",
  "Not a fan",
  "Allergic to pets"
];

const religionSpiritualityOptions = [
  "Very important to me",
  "Somewhat important",
  "Not important",
  "Prefer not to say"
];

const conflictResolutionOptions = [
  "Open communication",
  "Taking time to cool off",
  "Seeking advice",
  "Avoiding conflicts"
];

const financesApproachOptions = [
  "Keeping finances separate",
  "Sharing joint finances",
  "Combination of both",
  "Prefer not to share financial details"
];
 
 
const physicalIntimacyOptions = [
  "Extremely important",
  "Important, but not crucial",
  "Not very important",
  "Depends on the relationship"
];
  return (
   
    <section className="  h-screen relative">
     
    <form className="fixed h-[calc(100vh-6rem)] w-[90vw] md:w-[28vw]  overflow-auto top-24 left-[calc(50%-45vw)] z-10 bg-white p-8 rounded-lg shadow-lg " onSubmit={handleSubmit}>


 
            <div> 
                  {user && (
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2"> Welcome,{user.displayName}</label>
                        <label htmlFor="name" className="block text-gray-700  font-w400 mb-2"> Please create your profile genuinely</label>
                      {/* <button onClick={handleSignOut}>Sign out</button> */}
                    </div>
                  )}
            </div> 

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-900 font-bold mb-2">Name:</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white text-gray-900 focus:outline-none focus:border-pink-400 focus:ring-pink-400"
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-900 font-bold mb-2">Age:</label>
              <input 
                type="number" 
                id="age" 
                value={age} 
                onChange={(e) => setAge(parseInt(e.target.value))} 
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white text-gray-900 focus:outline-none focus:border-pink-400 focus:ring-pink-400"
                min="18" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-900 font-bold mb-2">Gender:</label>
              <select 
                id="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white text-gray-900 focus:outline-none focus:border-pink-400 focus:ring-pink-400"
                required 
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
 
          {[
            {
              label: "Relationship Preference",
              options: relationshipOptions,
              value: selectedRelationshipOption,
              onChange: setSelectedRelationshipOption
            },
            {
              label: "Communication Frequency",
              options: communicationOptions,
              value: selectedCommunicationOption,
              onChange: setSelectedCommunicationOption
            },
            {
              label: "Stance on Children",
              options: stanceOnChildrenOptions,
              value: selectedStanceOnChildren,
              onChange: setSelectedStanceOnChildren
            },
            {
              label: "Lifestyle",
              options: lifestyleOptions,
              value: selectedLifestyle,
              onChange: setSelectedLifestyle
            },
            {
              label: "Ideal First Date",
              options: idealFirstDateOptions,
              value: selectedIdealFirstDate,
              onChange: setSelectedIdealFirstDate
            },
            {
              label: "Attitude Towards Pets",
              options: attitudeTowardsPetsOptions,
              value: selectedAttitudeTowardsPets,
              onChange: setSelectedAttitudeTowardsPets
            },
            {
              label: "Importance of Religion/Spirituality",
              options: religionSpiritualityOptions,
              value: selectedReligionSpirituality,
              onChange: setSelectedReligionSpirituality
            },
            {
              label: "Conflict Resolution",
              options: conflictResolutionOptions,
              value: selectedConflictResolution,
              onChange: setSelectedConflictResolution
            },
            {
              label: "Approach to Finances",
              options: financesApproachOptions,
              value: selectedFinancesApproach,
              onChange: setSelectedFinancesApproach
            },
            {
              label: "Importance of Physical Intimacy",
              options: physicalIntimacyOptions,
              value: selectedPhysicalIntimacy,
              onChange: setSelectedPhysicalIntimacy
            }
          ].map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4 p-4 bg-white">
              <label className="block text-gray-900 font-medium text-lg">
                {group.label}
              </label>
              <div className="space-y-2">
                {group.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`${group.label}-${index}`} 
                      value={option} 
                      checked={group.value === option} 
                      onChange={() => group.onChange(option)} 
                      className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-400"
                    />
                    <label 
                      htmlFor={`${group.label}-${index}`} 
                      className="ml-2 text-gray-900"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

 
 

 
      <button 
        type="submit"
        className=" rounded-full mx-auto block bg-pink-500 text-white font-bold py-2 px-4  focus:outline-none hover:bg-pink-700 disabled:bg-gray-400 my-12"
        disabled={!name || !age || !gender || !selectedRelationshipOption || !selectedCommunicationOption || !selectedStanceOnChildren || !selectedLifestyle || !selectedIdealFirstDate || !selectedAttitudeTowardsPets || !selectedReligionSpirituality || !selectedConflictResolution || !selectedFinancesApproach || !selectedPhysicalIntimacy}
      >
        {loading ? 'Creating Profile...' : 'Create Profile'}
      </button>
 
 
          
</form>


 
      <iframe
        src="https://saisreesatyassss.github.io/LoveTree/"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="z-0"
      />

      <style jsx>
        {

        `   
       @media (max-width: 768px) {iframe {display: block; }} 
        .logo {display: block;}
      `

      }
      </style>
    </section>
  );
};

export default ProfilePage;
