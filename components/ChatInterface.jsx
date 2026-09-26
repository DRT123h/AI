'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) throw new Error('فشل الاتصال بالخادم');

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'لم يتم استلام رد.' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'حدث خطأ أثناء المعالجة، حاول مجدداً.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col w-full sm:max-w-2xl h-[calc(100dvh-140px)] sm:h-[75vh] mx-auto border border-white/10 sm:rounded-2xl rounded-xl bg-white/5 backdrop-blur"
      dir="rtl"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-white/30 mt-10">ابدأ محادثتك الآن ✨</p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-l from-[#00bfa7] to-[#00fa5a] text-white'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gradient-to-l from-[#00bfa7] to-[#00fa5a] text-white rounded-tr-sm'
                  : 'bg-white/10 text-white/90 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-white/30">
            <Loader2 size={16} className="animate-spin" />
            <span>جارٍ الكتابة...</span>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      <div className="border-t border-white/10 p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white outline-none focus:ring-2 focus:ring-[#00bfa7]/50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-l from-[#00bfa7] to-[#00fa5a] text-white p-2 rounded-full disabled:opacity-30 hover:brightness-110 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
