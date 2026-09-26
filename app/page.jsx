'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

/* ----------------------------- Neon Triangle Logo ----------------------------- */
function BrandLogo({ className = "w-28 h-28" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-[0_0_20px_rgba(0,242,254,0.45)] transition-transform hover:scale-105 duration-300`}
    >
      <defs>
        <linearGradient id="vLogoNeonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="50%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00ff87" />
        </linearGradient>
      </defs>
      {/* Triangle outline with neon gradient, filled with matching dark background */}
      <polygon
        points="50,88 12,16 88,16"
        fill="#0b0f17"
        stroke="url(#vLogoNeonGradient)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email/password login logic if needed
  };

  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#0b0f17] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/3 h-96 w-96 bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 h-96 w-96 bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <main className="w-full max-w-lg glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl neon-glow relative z-10 flex flex-col items-center">
        {/* Logo without white background */}
        <div className="mb-8 flex flex-col items-center">
          <BrandLogo className="w-32 h-32 mb-3" />
        </div>

        {/* Google Sign-in Button */}
        <button
          onClick={() => signIn('google')}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-semibold text-lg py-4 px-6 rounded-2xl shadow-lg hover:bg-slate-100 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          تسجيل الدخول باستخدام جوجل
        </button>

        {/* Divider */}
        <div className="w-full flex items-center my-8">
          <div className="flex-1 border-t border-white/10" />
          <span className="px-4 text-sm text-slate-400 font-medium">أو عبر البريد</span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-4 px-5 pr-12 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-4 px-5 pr-12 pl-12 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-left">
            <a href="#" className="text-sm text-cyan-400 hover:underline">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-lg py-4 px-6 rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          ليس لديك حساب؟{" "}
          <a href="#" className="text-cyan-400 font-semibold hover:underline">
            إنشاء حساب جديد
          </a>
        </p>
      </main>
    </div>
  );
}
