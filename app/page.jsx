'use client';

import { useSession } from 'next-auth/react';
import AuthButton from '@/components/AuthButton';
import ChatInterface from '@/components/ChatInterface';
import { MessageCircle } from 'lucide-react';

export default function Page() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-[100dvh] bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
            <MessageCircle size={18} />
          </div>
          <h1 className="text-base sm:text-xl font-bold text-gray-800">مساعد الدردشة الذكي</h1>
        </div>
        <AuthButton />
      </header>

      <div className="flex-1 flex items-center justify-center p-3 sm:p-6">
        {status === 'loading' ? (
          <p className="text-gray-400 text-sm">جارٍ التحميل...</p>
        ) : session ? (
          <ChatInterface />
        ) : (
          <div className="text-center max-w-xs sm:max-w-sm px-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={26} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">أهلاً بك</h2>
            <p className="text-gray-500 text-sm mb-6">
              سجّل الدخول بحساب جوجل للبدء في المحادثة مع المساعد الذكي
            </p>
            <div className="flex justify-center">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
