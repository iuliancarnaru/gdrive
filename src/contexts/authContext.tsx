import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  signOut,
} from "firebase/auth";

interface DefaultContext {
  currentUser: User | null | undefined;
  registerWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logOut(): void;
}

const AuthContext = React.createContext({} as DefaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactElement }) {
  const [currentUser, setCurrentUser] = useState<User | null>();

  function registerWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
