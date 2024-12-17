import { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  //   sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setGlobalUser(null);
    setGlobalData(null);
    return signOut(auth);
  }

  //   function resetPassword(email) {
  //     return sendPasswordResetEmail(auth, email);
  //   }

  const value = {
    globalUser,
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setGlobalUser(user);
      //if there's no user, empty user state and return
      if (!user) {
        console.log("no active user");
        return;
      }

      //If user, check if there is data, fetch it and update global state
      //1. create reference for the document
      const docRef = doc(db, "users", user.uid);
      //get the doc and snapshot it to see if there's anything there
      const docSnap = await getDoc(docRef);

      let fireBaseData = {};

      if (docSnap.exists()) {
        console.log("Found user data");
        fireBaseData = docSnap.data();
      }

      setGlobalData(fireBaseData);

      try {
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
