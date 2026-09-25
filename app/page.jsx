'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>مرحباً، {session.user?.name}</p>
        <button 
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          تسجيل الخروج
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center gap-2 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
      تسجيل الدخول باستخدام جوجل
    </button>
  );
}
