import { useEffect, useState } from "react";
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

import { getFirebaseAuth } from "@/firebase";
import { isEmailFormatCorrect } from "@/lib";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUser = (user: User | null) => {
    setUser(user);
    setLoading(false);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    if (!isEmailFormatCorrect(email)) return;
    signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      .then(({ user }) => handleUser(user))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    setLoading(true);
    getFirebaseAuth()
      .signOut()
      .then(() => handleUser(null))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(getFirebaseAuth(), handleUser);
    return () => unsubscribe();
  }, []);

  return { user, loading, signIn, signOut };
};
