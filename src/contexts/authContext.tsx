import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";

interface DefaultContext {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = React.createContext({} as DefaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactElement }) {
  const [currentUser, setCurrentUser] = useState<User | null>();

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
