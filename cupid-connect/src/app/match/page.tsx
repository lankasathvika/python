
"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'; 
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'; 
import { firebaseApp } from "../../lib/firebaseConfig";
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import FloatingWidget from '../FloatingWidget';
import axios from 'axios';

const BACKEND_URL = "https://cupid-connect-backend.vercel.app/send-notification";

const sendNotification = async (token: string, senderName: string, message: string) => {
  const data = {
    title: `${senderName} matched with you! ❤️`,
    body: message,
    token,
  };

  try {
    const response = await axios.post(BACKEND_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Notification sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};

interface MatchedUser {
  id: string;
  name: string;
  gender: string;
  isUnlocked?: boolean;
  fcmToken?: string;
}

interface UserPreferences {
  relationshipPreference?: string;
  communicationFrequency?: string;
  conflictResolution?: string;
  importanceOfPhysicalIntimacy?: string;
  stanceOnChildren?: string;
  lifestyle?: string;
}

const Match = () => {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);
  const [currentUserGender, setCurrentUserGender] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [maxUnlockedProfiles, setMaxUnlockedProfiles] = useState<number | 0>(0);
  const [maxmatchScore, setmaxmatchScore] = useState<number | 60>(60);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [unlockedProfiles, setUnlockedProfiles] = useState<string[]>([]);

  

  const [currentUserPreferences, setCurrentUserPreferences] = useState({
    relationshipPreference: "",
    communicationFrequency: "",
    stanceOnChildren: "",
    lifestyle: "",
    conflictResolution: "",
    importanceOfPhysicalIntimacy: "",
  });

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(collection(db, 'users'), user.uid);
        
        try {
          const userDocSnapshot = await getDoc(userDoc);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data(); 
            setCurrentUserGender(userData.gender);
            setCurrentUserId(userDocSnapshot.id);
            
            // Set user preferences
            setCurrentUserPreferences({
              relationshipPreference: userData.selectedRelationshipOption || "",
              communicationFrequency: userData.selectedCommunicationOption || "",
              stanceOnChildren: userData.selectedStanceOnChildren || "",
              lifestyle: userData.selectedLifestyle || "",
              conflictResolution: userData.selectedConflictResolution || "",
              importanceOfPhysicalIntimacy: userData.selectedPhysicalIntimacy || "",
            });

            // Fetch unlocked profiles
            const unlockedProfileIds = userData.unlockedProfiles || [];
            setUnlockedProfiles(unlockedProfileIds);
            const maxUnlockedProfiles = userData.maxUnlockedProfiles || 3;
            setMaxUnlockedProfiles(maxUnlockedProfiles);
            const maxmatchScore = userData.maxmatchScore || 60;
            setmaxmatchScore(maxmatchScore);


          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);


  // Fetch matched users based on preferences
  useEffect(() => {  
    if (currentUserId && currentUserGender && currentUserPreferences) {
      fetchMatchedUsers(currentUserId, currentUserGender, currentUserPreferences);
    }
  }, [currentUserId, currentUserGender, currentUserPreferences]);


// ✅ Notify users when they get matched
useEffect(() => {
  const notifyMatches = async () => {
    if (matchedUsers.length > 0) {
      for (const match of matchedUsers) {
        if (match.fcmToken) {
          await sendNotification(
            match.fcmToken,
            user?.displayName || "Someone",
            `You've been matched with ${user?.displayName}! Open the app to start chatting.`
          );
        }
      }
    }
  };

  notifyMatches();
}, [matchedUsers]);

const calculateMatchScore = (currentUser: UserPreferences, otherUser: DocumentData): number => {
  let score = 0;

  // Ensure both users have valid data
  if (!currentUser || !otherUser || !otherUser || typeof otherUser !== "object") {
    console.warn("Invalid user data for matching:", currentUser, otherUser);
    return 0;
  }

  // Relationship option compatibility (Highest weight)
  if (currentUser.relationshipPreference && currentUser.relationshipPreference === otherUser.selectedRelationshipOption) {
    score += 30;
  }

  // Communication frequency compatibility
  if (currentUser.communicationFrequency && currentUser.communicationFrequency === otherUser.selectedCommunicationOption) {
    score += 10;
  }

  // Lifestyle similarity
  if (currentUser.lifestyle && currentUser.lifestyle === otherUser.selectedLifestyle) {
    score += 15;
  }

  // Conflict resolution preference
  if (currentUser.conflictResolution && currentUser.conflictResolution === otherUser.selectedConflictResolution) {
    score += 10;
  }

  // Stance on children
  if (currentUser.stanceOnChildren && currentUser.stanceOnChildren === otherUser.selectedStanceOnChildren) {
    score += 10;
  }

  // Physical intimacy importance
  if (currentUser.importanceOfPhysicalIntimacy && currentUser.importanceOfPhysicalIntimacy === otherUser.selectedPhysicalIntimacy) {
    score += 10;
  }

  console.log("Final Match Score:", score);
  return score;
};
  // Fetch matched users
  const fetchMatchedUsers = async (
    currentUserId: string,
    currentUserGender: string,
    currentUserPreferences: UserPreferences
  ) => {
    if (!currentUserGender) return;

    const usersCollectionRef = collection(db, 'users');
    let usersQuery;

    // Get opposite gender users
    if (currentUserGender === 'male') {
      usersQuery = query(usersCollectionRef, where('gender', '==', 'female'));
    } else if (currentUserGender === 'female') {
      usersQuery = query(usersCollectionRef, where('gender', '==', 'male'));
    } else {
      return;
    }

    try {
      const querySnapshot = await getDocs(usersQuery);
      let potentialMatches: MatchedUser[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.name) {
          const matchScore = calculateMatchScore(currentUserPreferences, userData);
          
          // if (matchScore >= 50) {
          if (matchScore >= maxmatchScore) {
            potentialMatches.push({
              id: doc.id,
              name: userData.name,
              gender: userData.gender,
              isUnlocked: unlockedProfiles.includes(doc.id)
            });
          }
        }
      });

      // Sort matches by score (highest first)
      potentialMatches.sort((a, b) => {
        // Prioritize unlocked profiles
        if (a.isUnlocked && !b.isUnlocked) return -1;
        if (!a.isUnlocked && b.isUnlocked) return 1;
        return 0;
      });

      setMatchedUsers(potentialMatches);

    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  // Handle unlocking a profile
  const handleUnlockProfile = async (profileId: string) => {
    if (!user || !currentUserId) return;

    // Check if user can unlock more profiles
    if (unlockedProfiles.length >= maxUnlockedProfiles) {
      alert(`You can only unlock ${maxUnlockedProfiles} profiles. Upgrade to unlock more!`);
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUserId);
      
      // Update unlocked profiles
      const updatedUnlockedProfiles = [...unlockedProfiles, profileId];
      
      // Update Firestore
      await updateDoc(userDocRef, {
        unlockedProfiles: updatedUnlockedProfiles
      });

      // Update local state
      setUnlockedProfiles(updatedUnlockedProfiles);

      // Update matched users to reflect unlocked status
      const updatedMatchedUsers = matchedUsers.map(user => 
        user.id === profileId ? {...user, isUnlocked: true} : user
      );
      setMatchedUsers(updatedMatchedUsers);

    } catch (error) {
      console.error('Error unlocking profile:', error);
    }
  };

  // Handle messaging a profile
  const handleMessageClick = (receiverId: string, receiverName: string) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }

    // Check if profile is unlocked
    if (!unlockedProfiles.includes(receiverId)) {
      alert('Please unlock this profile first to send a message.');
      return;
    }
    
    const encodedReceiverName = encodeURIComponent(receiverName);
    router.push(`/messages?receiverId=${receiverId}&receiverName=${encodedReceiverName}`);
  };

  return (

        <section className="h-screen relative">
      <form className="fixed h-[calc(100vh-6rem)] w-[90vw] md:w-[28vw] overflow-auto top-24 right-[calc(50%-45vw)] z-10 bg-white p-8 rounded-lg shadow-lg">
        <div>
          {user && (
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Welcome, {user.displayName}
              </label>
              <div className="mb-4 text-sm text-gray-600">
                Unlocked Profiles: {unlockedProfiles.length} / {maxUnlockedProfiles}
              </div>
              <label className="block text-gray-700 font-w400 mb-2">
                Profiles That'll Make Your Heart Skip a Beat
              </label>
            </div>
          )}

          <h1 style={{ fontFamily: 'Arial', color: '#333' }}>
            Meet Your Potential Matches!
          </h1>
          
          {matchedUsers.length > 0 ? (
            <ul className="space-y-4">
              {matchedUsers.map((matchedUser) => (
                <li 
                  key={matchedUser.id} 
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-grow">
                    <span className="text-gray-700 mr-2">{matchedUser.name}</span>
                    {!matchedUser.isUnlocked && (
                      <span className="text-xs text-red-500">(Locked)</span>
                    )}
                  </div>
                  {!matchedUser.isUnlocked ? (
                    <button  
                      type="button"
                      onClick={() => handleUnlockProfile(matchedUser.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      disabled={unlockedProfiles.length >= maxUnlockedProfiles}
                    >
                      Unlock Profile
                    </button>
                  ) : (
                    <button  
                      type="button"   
                      onClick={() => handleMessageClick(matchedUser.id, matchedUser.name)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Message
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontFamily: 'Arial', fontSize: '16px', color: '#666' }}>
              Oops, looks like your search history is as empty as your love life! 
              <br />
              No matches found that align with your preferences.
            </p>
          )}
        </div>
      </form>

      <iframe
        src="https://saisreesatyassss.github.io/loveBalloon/"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="z-0"
      />

      <style jsx>{`
        @media (max-width: 768px) {
          iframe {
            display: block;
          }
        }
        .logo {
          display: block;
        }
      `}</style>
      
  
    </section>
  );
};

export default Match;