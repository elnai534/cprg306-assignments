"use client";  // Required for client-side code in Next.js 13+

import React from 'react';
import { useUserAuth } from './_utils/auth-context';
import { useRouter } from 'next/navigation';  // Correct import for useRouter

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main>
      {!user ? (
        <button onClick={handleLogin}>Login with GitHub</button>
      ) : (
        <>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => router.push('/week-10/shopping-list')}>Go to Shopping List</button>
        </>
      )}
    </main>
  );
};
