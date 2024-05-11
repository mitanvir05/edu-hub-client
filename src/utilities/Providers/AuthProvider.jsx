import React, { createContext, useEffect, useState } from "react";
import { app } from "../../config/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,

  
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth(app);

  // signup new user
  const signUp = async (email, password) => {
    try {
      setLoader(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //log in user

  const login = async (email, password) => {
    try {
      setLoader(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };
  
  //logout user
  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //update user profile
  const updateUser = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //google login
  // const googleProvider = new GoogleAuthProvider();
  // const googleLogin = async () => {
  //   try {
  //     setLoader(true);
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (error) {
  //     setError(error.code);
  //     throw error;
  //   }
  // };

  const googleProvider = new GoogleAuthProvider();
const googleLogin = async () => {
  try {
    setLoader(true);
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential;
  } catch (error) {
    setError(error.code);
    console.error("Google login error:", error.message);
    throw error;
  } finally {
    setLoader(false);
  }
};

  //observeer for user

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        axios
          .post("https://edu-hub1-server.vercel.app/api/set-token", {
            email: user.email,
            name: user.displayName,
          })
          .then((data) => {
            if (data.data.token) {
              localStorage.setItem("token", data.data.token);
              setLoader(false);
            }
          });
      } else {
        localStorage.removeItem("token");
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user,
    signUp,
    login,
    logout,
    updateUser,
    googleLogin,
    error,
    setError,
    loader,
    setLoader
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
