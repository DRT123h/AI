'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import AuthButton from '@/components/AuthButton';
import ChatInterface from '@/components/ChatInterface';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

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

function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="animate-float absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#00bfa7] opacity-25 blur-[100px]" />
      <div
        className="animate-float absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#00fa5a] opacity-20 blur-[110px]"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
}

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center px-4 overflow-hidden">
      <BackgroundGlow />

      <div className="relative w-full max-w-sm flex flex-col items-center animate-fade-in-up">
        <div className="relative mb-10">
          <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-tr from-[#00bfa7] to-[#00fa5a] opacity-40 blur-2xl" />
          <div className="relative bg-white rounded-3xl px-7 py-5 shadow-[0_0_45px_rgba(0,250,90,0.3)]">
            <img src="/logo.png" alt="Verdia" className="h-16 w-auto" />
          </div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="animate-glow w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-medium py-3 rounded-xl hover:brightness-105 active:scale-[0.99] transition-all mb-6"
        >
          <GoogleIcon />
          تسجيل الدخول باستخدام جوجل
        </button>

        <div className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/40">قريباً</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="w-full space-y-4 opacity-50 pointer-events-none select-none">
          <div className="relative">
            <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-sm placeholder:text-white/40 outline-none"
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور"
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-10 text-sm placeholder:text-white/40 outline-none"
            />
            {showPassword ? (
              <EyeOff size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            ) : (
              <Eye size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            )}
          </div>

          <p className="text-center text-xs text-white/30">نسيت كلمة المرور؟</p>

          <button
            disabled
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-l from-[#00bfa7] to-[#00fa5a] shadow-[0_0_25px_rgba(0,250,90,0.3)] cursor-not-allowed"
          >
            تسجيل الدخول
          </button>
        </div>

        <p className="text-xs text-white/40 mt-8">
          ليس لديك حساب؟{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#00bfa7] to-[#00fa5a] font-medium">
            إنشاء حساب جديد
          </span>
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-white/40 text-sm">جارٍ التحميل...</p>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <main className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <BackgroundGlow />
      <header className="relative flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-white/10 sticky top-0 z-30 bg-[#150a29]/80 backdrop-blur">
        <div className="bg-white rounded-xl px-2.5 py-1.5">
          <img src="/logo.png" alt="Verdia" className="h-6 w-auto" />
        </div>
        <AuthButton />
      </header>

      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6">
        <ChatInterface />
      </div>
    </main>
  );
}
