"use client";

import { useAuth } from "./components/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="container py-10">
      <h1>Home</h1>
      {user?.email && <h2>Hello, {user?.email} 👋</h2>}
    </div>
  );
}
