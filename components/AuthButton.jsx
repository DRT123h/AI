'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="w-9 h-9 rounded-full bg-white/10" />
        <div className="hidden sm:block w-20 h-4 bg-white/10 rounded" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-1 pl-2 pr-2 sm:pr-3 hover:bg-white/10 transition-colors"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user?.name || 'المستخدم'}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full ring-2 ring-white/10"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-l from-[#00bfa7] to-[#00fa5a] text-white flex items-center justify-center text-sm font-medium">
            {session.user?.name?.charAt(0) || '؟'}
          </div>
        )}
        <span className="hidden sm:inline text-sm font-medium text-white/90 max-w-[120px] truncate">
          {session.user?.name}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/40 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute left-0 mt-2 w-52 bg-[#1f1338] border border-white/10 rounded-xl shadow-xl py-2 z-20 overflow-hidden"
            dir="rtl"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
              <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
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
