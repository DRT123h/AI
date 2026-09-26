'use client';

import { useEffect, useRef, useState } from "react";

/* ----------------------------- Icons & Logo ----------------------------- */
const Icon = {
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Paperclip: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.67 3.67 0 0 1 5.19 5.19l-9.2 9.19a1.83 1.83 0 0 1-2.59-2.59l8.49-8.48" />
    </svg>
  ),
  Send: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3.4 20.6 21 12 3.4 3.4 3 10l13 2-13 2z" />
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.13.42.43.77.83 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ChevronDouble: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
    </svg>
  ),
  Logo: (p) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="50%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00ff87" />
        </linearGradient>
      </defs>
      <polygon points="50,90 10,15 90,15" fill="#0b0f17" stroke="url(#neonGradient)" strokeWidth="6" strokeLinejoin="round" />
    </svg>
  )
};

const seedSessions = [
  { id: "s1", title: "تطوير مشروع AI جديد" },
  { id: "s2", title: "أفكار لتصميم واجهات المطورين" },
  { id: "s3", title: "مراجعة كود Next.js & Tailwind" },
];

const seedMessages = [
  {
    id: "m1",
    role: "user",
    content: "مرحباً، كيف يمكنك مساعدتي اليوم؟",
  },
  {
    id: "m2",
    role: "assistant",
    content: "أهلاً بك! أنا مساعد الذكاء الاصطناعي الذكي الخاص بك. يمكنني مساعدتك في كتابة الأكواد، تحليل البيانات، أو تصميم الأفكار والمشاريع. ماذا تحب أن نبدأ اليوم؟",
  },
];

function MessageBody({ content }) {
  return <div className="text-[0.98rem] leading-8 text-slate-200 font-normal">{content}</div>;
}

function Sidebar({ collapsed, onToggle, sessions, activeId, onSelect, onNewChat }) {
  return (
    <aside
      className={`relative flex h-full flex-col border-l border-white/10 bg-[#0d131f]/90 backdrop-blur-xl transition-[width] duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[280px]"
      }`}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          onClick={onToggle}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-white/10 hover:text-cyan-400"
        >
          {collapsed ? <Icon.Menu className="h-5 w-5" /> : <Icon.ChevronDouble className="h-5 w-5" />}
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <Icon.Logo className="h-7 w-7 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" />
            <span className="text-base font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              AI CHAT
            </span>
          </div>
        )}
      </div>

      <div className="px-3 pt-6">
        <button
          onClick={onNewChat}
          className={`flex w-full items-center gap-3 rounded-2xl neon-border-gradient px-3.5 py-3 text-sm font-semibold text-slate-100 transition-all hover:scale-[1.02] neon-glow ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Icon.Plus className="h-5 w-5 shrink-0 text-cyan-400" />
          {!collapsed && <span>محادثة جديدة</span>}
        </button>
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto px-3">
        {!collapsed && (
          <p className="px-2 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">المحادثات</p>
        )}
        <ul className="space-y-1.5">
          {sessions.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onSelect(s.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-medium transition-all ${
                  s.id === activeId
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon.Chat className="h-4 w-4 shrink-0 opacity-80" />
                {!collapsed && <span className="truncate">{s.title}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button className={`flex w-full items-center gap-3 rounded-xl p-2 text-right transition-colors hover:bg-white/5 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 font-bold text-xs shadow-md">
            م
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-slate-200">المستخدم</p>
              <p className="truncate text-xs text-cyan-400 font-medium">الخطة الاحترافية</p>
            </div>
          )}
          {!collapsed && <Icon.Settings className="h-4 w-4 text-slate-500" />}
        </button>
      </div>
    </aside>
  );
}

function UserBubble({ content }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/30 px-5 py-3.5 text-slate-100 shadow-lg">
        {content}
      </div>
    </div>
  );
}

function AssistantBubble({ content }) {
  return (
    <div className="flex justify-end">
      <div className="flex max-w-[85%] gap-3.5">
        <div className="glass-card rounded-2xl rounded-tl-sm px-5 py-3.5 border border-white/10 shadow-xl">
          <MessageBody content={content} />
        </div>
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl neon-border-gradient shadow-md">
          <Icon.Logo className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Composer({ onSend }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="sticky bottom-0 flex justify-center px-4 pb-6 pt-2">
      <div className="w-full max-w-3xl">
        <div className="flex items-end gap-3 rounded-3xl glass-panel p-2.5 shadow-2xl neon-glow border border-white/10 focus-within:border-cyan-500/50 transition-all">
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-cyan-400">
            <Icon.Paperclip className="h-5 w-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            placeholder="اكتب رسالتك الذكية هنا..."
            className="max-h-[200px] flex-1 resize-none bg-transparent py-2.5 text-[0.98rem] leading-6 text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold transition-all enabled:hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed shadow-md"
          >
            <Icon.Send className="h-4 w-4 -translate-x-px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatInterface() {
  const [collapsed, setCollapsed] = useState(false);
  const [sessions] = useState(seedSessions);
  const [activeId, setActiveId] = useState("s1");
  const [messages, setMessages] = useState(seedMessages);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "تم استلام رسالتك بنجاح! الواجهة الآن متناسقة كلياً مع الشعار وأسلوب النيون العصري.",
        },
      ]);
    }, 800);
  };

  return (
    <div dir="rtl" className="flex h-screen w-full overflow-hidden bg-[#0b0f17] text-slate-100">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        sessions={sessions}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={() => setMessages([])}
      />

      <main className="flex min-w-0 flex-1 flex-col bg-[#0b0f17] relative">
        <div className="absolute top-0 right-1/4 h-72 w-72 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-1/4 h-72 w-72 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-6 glass-panel z-10">
          <div className="flex items-center gap-3">
            <Icon.Logo className="h-6 w-6" />
            <span className="text-sm font-semibold text-slate-200">
              {sessions.find((s) => s.id === activeId)?.title || "محادثة جديدة"}
            </span>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 z-10">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            {messages.map((m) =>
              m.role === "user" ? (
                <UserBubble key={m.id} content={m.content} />
              ) : (
                <AssistantBubble key={m.id} content={m.content} />
              )
            )}
          </div>
        </div>

        <Composer onSend={handleSend} />
      </main>
    </div>
  );
}
