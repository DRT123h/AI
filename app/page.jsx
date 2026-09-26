'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot' | 'verify_otp'
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
      },
    });

    if (error) {
      setStatusMessage({ type: 'error', text: error.message });
      setIsLoading(false);
    }
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setStatusMessage({ type: 'error', text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
        } else {
          setStatusMessage({ type: 'success', text: 'تم تسجيل الدخول بنجاح!' });
        }
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) {
          setStatusMessage({ type: 'error', text: error.message });
        } else {
          setStatusMessage({ type: 'success', text: 'تم إنشاء الحساب! يرجى مراجعة بريدك الإلكتروني للتأكيد.' });
          setTimeout(() => setMode('login'), 2500);
        }
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          setStatusMessage({ type: 'error', text: error.message });
        } else {
          setStatusMessage({ type: 'success', text: 'تم إرسال رابط/رمز إعادة التعيين إلى بريدك الإلكتروني!' });
          setMode('verify_otp');
        }
      } else if (mode === 'verify_otp') {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token: otpCode,
          type: 'recovery',
        });

        if (verifyError) {
          setStatusMessage({ type: 'error', text: 'رمز التحقق غير صحيح أو انتهت صلاحيته.' });
        } else {
          const { error: updateError } = await supabase.auth.updateUser({ password });
          if (updateError) {
            setStatusMessage({ type: 'error', text: updateError.message });
          } else {
            setStatusMessage({ type: 'success', text: 'تم تغيير كلمة المرور بنجاح!' });
            setTimeout(() => setMode('login'), 2000);
          }
        }
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'حدث خطأ أثناء الاتصال بالخدمة.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#0b0f17] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/3 h-96 w-96 bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 h-96 w-96 bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <main className="w-full max-w-lg glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl neon-glow relative z-10 flex flex-col items-center">
        
        <div className="mb-6 flex flex-col items-center">
          <BrandLogo className="w-28 h-28 mb-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            {mode === 'login' && 'تسجيل الدخول'}
            {mode === 'signup' && 'إنشاء حساب جديد'}
            {mode === 'forgot' && 'استعادة كلمة المرور'}
            {mode === 'verify_otp' && 'إدخال رمز التحقق'}
          </h1>
        </div>

        {statusMessage.text && (
          <div className={`w-full mb-6 p-4 rounded-2xl text-sm font-medium border text-center ${
            statusMessage.type === 'error' 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {(mode === 'login' || mode === 'signup') && (
          <>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-semibold text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-lg hover:bg-slate-100 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              متابعة باستخدام جوجل
            </button>

            <div className="w-full flex items-center my-6">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-4 text-xs sm:text-sm text-slate-400 font-medium">أو عبر البريد الإلكتروني</span>
              <div className="flex-1 border-t border-white/10" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {mode === 'signup' && (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-3.5 px-5 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>
          )}

          {mode !== 'verify_otp' && (
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-3.5 px-5 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>
          )}

          {mode !== 'forgot' && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'verify_otp' ? "كلمة المرور الجديدة" : "كلمة المرور"}
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-3.5 px-5 pl-12 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
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
          )}

          {mode === 'verify_otp' && (
            <div>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="أدخل رمز التحقق (6 أرقام)"
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-3.5 px-5 text-center text-xl font-mono tracking-widest text-cyan-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="text-left">
              <button
                type="button"
                onClick={() => { setMode('forgot'); setStatusMessage({ type: '', text: '' }); }}
                className="text-sm text-cyan-400 hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 disabled:opacity-50"
          >
            {isLoading ? 'جاري المعالجة...' : (
              mode === 'login' ? 'تسجيل الدخول' :
              mode === 'signup' ? 'إنشاء حساب' :
              mode === 'forgot' ? 'إرسال رمز التحقق' : 'حفظ كلمة المرور الجديدة'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          {mode === 'login' && (
            <p>
              ليس لديك حساب؟{" "}
              <button
                onClick={() => { setMode('signup'); setStatusMessage({ type: '', text: '' }); }}
                className="text-cyan-400 font-semibold hover:underline"
              >
                إنشاء حساب جديد
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              لديك حساب بالفعل؟{" "}
              <button
                onClick={() => { setMode('login'); setStatusMessage({ type: '', text: '' }); }}
                className="text-cyan-400 font-semibold hover:underline"
              >
                تسجيل الدخول
              </button>
            </p>
          )}

          {(mode === 'forgot' || mode === 'verify_otp') && (
            <button
              onClick={() => { setMode('login'); setStatusMessage({ type: '', text: '' }); }}
              className="text-cyan-400 font-semibold hover:underline"
            >
              العودة لشاشة تسجيل الدخول
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
