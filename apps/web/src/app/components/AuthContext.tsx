"use client";

import { supabase } from "@/lib/supabaseClient";
import { SessionContextProvider, User } from "@supabase/auth-helpers-react";
import {
  AuthError,
  AuthOtpResponse,
  OAuthResponse,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string) => Promise<AuthOtpResponse>;
  signInWithGoogle: () => Promise<OAuthResponse>;
  signOut: () => Promise<{
    error: AuthError | null;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("User is signed in:", session.user.email);
        setUser(session.user);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth changed:", session?.user?.email);
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithEmail = (email: string) => {
    return supabase.auth.signInWithOtp({ email });
  };
  const signInWithGoogle = () => {
    return supabase.auth.signInWithOAuth({ provider: "google" });
  };
  const signOut = () => {
    return supabase.auth.signOut();
  };

  const value = {
    user,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <SessionContextProvider supabaseClient={supabase}>
        {children}
      </SessionContextProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
