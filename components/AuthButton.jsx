'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.4 0-13.8 4.2-17 10.3z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.5 34.9 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.9 39.7 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4 5.6l6.5 5.4C40.3 36.5 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="w-9 h-9 rounded-full bg-gray-200" />
        <div className="hidden sm:block w-20 h-4 bg-gray-200 rounded" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur border border-gray-200 rounded-full py-1 pl-2 pr-2 sm:pr-3 shadow-sm hover:shadow-md transition-shadow"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user?.name || 'المستخدم'}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full ring-2 ring-blue-100"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
              {session.user?.name?.charAt(0) || '؟'}
            </div>
          )}
          <span className="hidden sm:inline text-sm font-medium text-gray-700 max-w-[120px] truncate">
            {session.user?.name}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div
              className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20 overflow-hidden"
              dir="rtl"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800 truncate">{session.user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                تسجيل الخروج
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-[0.98] transition-all text-sm font-medium"
    >
      <GoogleIcon />
      <span>الدخول بحساب جوجل</span>
    </button>
  );
}
