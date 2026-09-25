"use client";

/**
 * ChatInterface — Arabic RTL AI Chat UI
 * ---------------------------------------------------------------
 * Drop this file anywhere in your Next.js `app/` or `components/`
 * folder (e.g. components/ChatInterface.jsx) and render it directly:
 *
 *   import ChatInterface from "@/components/ChatInterface";
 *   export default function Page() { return <ChatInterface />; }
 *
 * Requirements:
 * 1. Tailwind CSS already configured in the project.
 * 2. The "Cairo" font loaded once, e.g. in app/layout.js:
 *
 *      import { Cairo } from "next/font/google";
 *      const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400","500","600","700"] });
 *      export default function RootLayout({ children }) {
 *        return (
 *          <html lang="ar" dir="rtl" className={cairo.className}>
 *            <body>{children}</body>
 *          </html>
 *        );
 *      }
 *
 *    (If you'd rather not touch layout.js, the component below also
 *    works with the system font stack — just remove the className
 *    reference to `font-cairo` if you haven't wired the font up.)
 *
 * No external icon or markdown libraries are required — icons are
 * inline SVG and message formatting (bold / inline code / code
 * blocks / lists) is parsed with a small local helper so the file
 * stays a single, copy-pasteable component.
 * ---------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";

/* ----------------------------- Icons ----------------------------- */
/* Small inline icon set so the component has zero extra dependencies. */

const Icon = {
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Paperclip: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.67 3.67 0 0 1 5.19 5.19l-9.2 9.19a1.83 1.83 0 0 1-2.59-2.59l8.49-8.48" />
    </svg>
  ),
  Send: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3.4 20.6 21 12 3.4 3.4 3 10l13 2-13 2z" />
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.13.42.43.77.83 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l1.8 5.4L19 9.2l-5.2 1.8L12 16l-1.8-5-5.2-1.8 5.2-1.8z" />
    </svg>
  ),
  ChevronDouble: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
    </svg>
  ),
};

/* ------------------------- Demo seed data ------------------------- */

const seedSessions = [
  { id: "s1", title: "خطة لإطلاق منتج جديد" },
  { id: "s2", title: "تلخيص تقرير مالي" },
  { id: "s3", title: "أفكار لتصميم واجهة" },
  { id: "s4", title: "مراجعة كود React" },
];

const seedMessages = [
  {
    id: "m1",
    role: "user",
    content: "اكتب لي دالة بلغة JavaScript تحسب مجموع أرقام مصفوفة، مع شرح مختصر.",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "بكل تأكيد. إليك دالة بسيطة تستخدم `reduce` لجمع عناصر المصفوفة:\n\n```javascript\nfunction sumArray(numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\nconsole.log(sumArray([1, 2, 3, 4])); // 10\n```\n\nملاحظات مهمة:\n- **reduce** يمر على كل عنصر ويجمعه مع القيمة التراكمية.\n- القيمة الابتدائية هنا هي `0`.\n- إذا كانت المصفوفة فارغة، ستُعيد الدالة `0` بدل أن تفشل.",
  },
];

/* --------------------- Tiny inline markdown parser -------------------- */
/* Handles: ```code blocks```, `inline code`, **bold**, and - / 1. lists. */

function renderInline(text, keyPrefix) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-neutral-50">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${i}`}
          className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[0.85em] text-amber-200/90"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

function MessageBody({ content }) {
  const blocks = content.split(/```(\w*)\n([\s\S]*?)```/g);
  // split() with capturing groups yields: [text, lang, code, text, lang, code, ...]
  const nodes = [];
  for (let i = 0; i < blocks.length; i += 3) {
    const text = blocks[i];
    const lang = blocks[i + 1];
    const code = blocks[i + 2];

    if (text && text.trim().length) {
      const lines = text.split("\n").filter((l) => l.length > 0);
      let listBuffer = [];

      const flushList = (key) => {
        if (listBuffer.length) {
          nodes.push(
            <ul key={`ul-${key}`} className="my-2 list-disc space-y-1 pr-5 marker:text-amber-400/70">
              {listBuffer.map((li, idx) => (
                <li key={idx} className="leading-7">
                  {renderInline(li, `li-${key}-${idx}`)}
                </li>
              ))}
            </ul>
          );
          listBuffer = [];
        }
      };

      lines.forEach((line, idx) => {
        const listMatch = line.match(/^\s*(?:-|\d+\.)\s+(.*)/);
        if (listMatch) {
          listBuffer.push(listMatch[1]);
        } else {
          flushList(`${i}-${idx}`);
          nodes.push(
            <p key={`p-${i}-${idx}`} className="my-1.5 leading-7">
              {renderInline(line, `p-${i}-${idx}`)}
            </p>
          );
        }
      });
      flushList(`${i}-end`);
    }

    if (code !== undefined) {
      nodes.push(
        <div key={`code-${i}`} className="my-2 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]" dir="ltr">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-xs text-neutral-500">
            <span className="font-mono">{lang || "code"}</span>
          </div>
          <pre className="overflow-x-auto px-4 py-3 text-[0.85rem] leading-6 text-neutral-200">
            <code className="font-mono">{code.replace(/\n$/, "")}</code>
          </pre>
        </div>
      );
    }
  }
  return <div className="text-[0.95rem] text-neutral-200">{nodes}</div>;
}

/* ------------------------------ Sidebar ------------------------------ */

function Sidebar({ collapsed, onToggle, sessions, activeId, onSelect, onNewChat }) {
  return (
    <aside
      className={`relative flex h-full flex-col border-l border-white/5 bg-[#1a1a1a] transition-[width] duration-200 ease-out ${
        collapsed ? "w-[68px]" : "w-[272px]"
      }`}
    >
      {/* Top: collapse + new chat */}
      <div className="flex items-center gap-2 px-3 pt-3">
        <button
          onClick={onToggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-neutral-100"
          aria-label="طي القائمة الجانبية"
        >
          {collapsed ? <Icon.Menu className="h-5 w-5" /> : <Icon.ChevronDouble className="h-5 w-5" />}
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2 px-1 text-neutral-200">
            <Icon.Sparkle className="h-4 w-4 text-amber-400/90" />
            <span className="text-sm font-semibold">المساعد</span>
          </div>
        )}
      </div>

      <div className="px-3 pt-4">
        <button
          onClick={onNewChat}
          className={`flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-neutral-100 transition-colors hover:bg-white/[0.07] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Icon.Plus className="h-4 w-4 shrink-0" />
          {!collapsed && <span>محادثة جديدة</span>}
        </button>
      </div>

      {/* Session list */}
      <nav className="mt-4 flex-1 overflow-y-auto px-2">
        {!collapsed && (
          <p className="px-2 pb-2 text-xs font-medium text-neutral-500">المحادثات السابقة</p>
        )}
        <ul className="space-y-0.5">
          {sessions.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onSelect(s.id)}
                title={s.title}
                className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-right text-sm transition-colors ${
                  s.id === activeId
                    ? "bg-white/[0.08] text-neutral-50"
                    : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon.Chat className="h-4 w-4 shrink-0 opacity-70" />
                {!collapsed && <span className="truncate">{s.title}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom: user profile / settings */}
      <div className="border-t border-white/5 p-3">
        <button
          className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-right transition-colors hover:bg-white/[0.05] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/80 to-amber-600/60 text-xs font-semibold text-neutral-900">
            سم
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden text-right">
              <p className="truncate text-sm text-neutral-200">سارة محمود</p>
              <p className="truncate text-xs text-neutral-500">الخطة المجانية</p>
            </div>
          )}
          {!collapsed && <Icon.Settings className="h-4 w-4 shrink-0 text-neutral-500" />}
        </button>
      </div>
    </aside>
  );
}

/* ------------------------------ Bubbles ------------------------------- */

function UserBubble({ content }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-[#2f2f2f] px-4 py-2.5 text-[0.95rem] leading-7 text-neutral-100">
        {content}
      </div>
    </div>
  );
}

function AssistantBubble({ content }) {
  return (
    <div className="flex justify-end">
      <div className="flex max-w-[85%] gap-3">
        <div className="min-w-0 px-1 pt-0.5">
          <MessageBody content={content} />
        </div>
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/10 ring-1 ring-amber-400/30">
          <Icon.Sparkle className="h-3.5 w-3.5 text-amber-400" />
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-transparent px-1 py-2">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500" />
      </div>
    </div>
  );
}

/* -------------------------------- Input -------------------------------- */

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pointer-events-none sticky bottom-0 flex justify-center px-4 pb-5 pt-2">
      <div className="pointer-events-auto w-full max-w-3xl">
        <div className="flex items-end gap-2 rounded-3xl border border-white/10 bg-[#2a2a2a] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] focus-within:border-white/20">
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/5 hover:text-neutral-100"
            aria-label="إرفاق ملف"
            type="button"
          >
            <Icon.Paperclip className="h-5 w-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="اكتب رسالتك هنا..."
            className="max-h-[200px] flex-1 resize-none bg-transparent py-2.5 text-[0.95rem] leading-6 text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-neutral-900 transition-opacity enabled:hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="إرسال"
            type="button"
          >
            <Icon.Send className="h-4 w-4 -translate-x-px" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-neutral-600">
          قد يخطئ المساعد أحياناً. تحقق من المعلومات المهمة.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- Main component ---------------------------- */

export default function ChatInterface() {
  const [collapsed, setCollapsed] = useState(false);
  const [sessions] = useState(seedSessions);
  const [activeId, setActiveId] = useState("s1");
  const [messages, setMessages] = useState(seedMessages);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Placeholder for a real API call — replace with your backend/model call.
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "تم استلام رسالتك. اربط هذا الجزء بواجهة الذكاء الاصطناعي الخاصة بك لعرض رد حقيقي هنا.",
        },
      ]);
    }, 900);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div dir="rtl" className="font-cairo flex h-screen w-full overflow-hidden bg-[#171717] text-neutral-100">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        sessions={sessions}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={handleNewChat}
      />

      <main className="flex min-w-0 flex-1 flex-col bg-[#171717]">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-5">
          <span className="text-sm font-medium text-neutral-300">
            {sessions.find((s) => s.id === activeId)?.title || "محادثة جديدة"}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/10 ring-1 ring-amber-400/30">
            <Icon.Sparkle className="h-3.5 w-3.5 text-amber-400" />
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center py-24 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 ring-1 ring-amber-400/30">
                  <Icon.Sparkle className="h-6 w-6 text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-neutral-200">كيف يمكنني مساعدتك اليوم؟</h2>
                <p className="mt-1.5 max-w-sm text-sm text-neutral-500">
                  اطرح سؤالاً، أو الصق نصاً، أو ابدأ بوصف ما تريد إنجازه.
                </p>
              </div>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <UserBubble key={m.id} content={m.content} />
              ) : (
                <AssistantBubble key={m.id} content={m.content} />
              )
            )}

            {isTyping && <TypingBubble />}
          </div>
        </div>

        <Composer onSend={handleSend} />
      </main>
    </div>
  );
}
