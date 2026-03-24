import { useState, useRef, useEffect, useCallback } from 'react';
import './Chatbot.css';

// ─── Types ───────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ─── Constants ───────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are a friendly and professional AI assistant embedded in Suraj Kokane's portfolio website. You help visitors learn about Suraj's skills, projects, experience, and background. Suraj is an ECE engineer specializing in VLSI Design, RTL Design, and Digital Electronics. He has 3+ years of learning, 5+ VLSI projects, and 10+ HDL modules. His skills include Verilog, VHDL, SystemVerilog, Cadence, Vivado, and ModelSim. You answer questions concisely and helpfully. If asked about things outside the scope of the portfolio, politely redirect the conversation. Keep your answers brief (2-4 sentences) unless the user asks for detail.`;

const SUGGESTIONS = [
  "Tell me about Suraj",
  "What skills does he have?",
  "Show me his projects",
  "Work experience?",
];

// ─── SVG Icons ───────────────────────────────────────────────
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="9" cy="16" r="1" />
    <circle cx="15" cy="16" r="1" />
    <path d="M12 11V7" />
    <circle cx="12" cy="5" r="2" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

// ─── Helpers ─────────────────────────────────────────────────
const formatTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const genId = () => Math.random().toString(36).slice(2, 10);

/** Call Gemini API for chat completions */
async function callGemini(
  history: { role: string; content: string }[]
): Promise<string> {
  try {
    const contents = history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const res = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: contents,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        }
      }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      let lastError = errBody?.error?.message ?? `API error ${res.status}`;
      
      if (res.status === 400 && lastError.toLowerCase().includes("api key not valid")) {
        lastError = 'API Key invalid. Please check your Gemini API key on line 13.';
      }
      throw new Error(lastError);
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (reply) return reply;

    throw new Error("Empty response from AI.");
  } catch (err: unknown) {
    throw new Error(err instanceof Error ? err.message : 'Network error');
  }
}

// ─── Component ───────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [lastFailedText, setLastFailedText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto‑scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // ── Open / Close ──
  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 250);
    } else {
      setIsOpen(true);
      setHasNewMessage(false);
    }
  };

  // ── Send message ──
  const sendMessage = useCallback(
    async (text: string, isRetry = false) => {
      if (!text.trim() || isLoading) return;

      let userMsg: Message | null = null;

      if (!isRetry) {
        userMsg = {
          id: genId(),
          role: 'user',
          content: text.trim(),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg!]);
      }

      setInputValue('');
      setError(null);
      setLastFailedText(null);
      setIsLoading(true);

      try {
        // Build conversation history (last 10 messages for context)
        const currentMessages = isRetry ? messages : [...messages, userMsg!];
        const history = currentMessages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const reply = await callGemini(history);

        const botMsg: Message = {
          id: genId(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMsg]);
        if (!isOpen) setHasNewMessage(true);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.';
        setError(msg);
        setLastFailedText(text);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, isOpen]
  );

  // ── Retry handler ──
  const handleRetry = () => {
    if (lastFailedText) {
      sendMessage(lastFailedText, true);
    }
  };

  // ── Keyboard handling ──
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // ── Auto-resize textarea ──
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  };

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <>
      {/* ── FAB Button ── */}
      <button
        className={`chatbot-fab${isOpen ? ' open' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        id="chatbot-fab"
      >
        {!isOpen && <span className="chatbot-fab-ring" />}
        <span className="chatbot-fab-icon">
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </span>
        {hasNewMessage && !isOpen && <span className="chatbot-fab-badge" />}
      </button>

      {/* ── Chat Window ── */}
      {(isOpen || isClosing) && (
        <div className={`chatbot-window${isClosing ? ' closing' : ''}`} id="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <BotIcon />
            </div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-title">AI Assistant</div>
              <div className="chatbot-header-status">
                <span className="chatbot-status-dot" />
                Online • Ready to help
              </div>
            </div>
            <button
              className="chatbot-header-close"
              onClick={handleToggle}
              aria-label="Close chat"
              id="chatbot-close-btn"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          {showWelcome ? (
            <div className="chatbot-welcome">
              <div className="chatbot-welcome-icon">
                <SparklesIcon />
              </div>
              <h3>Hey there! 👋</h3>
              <p>
                I'm Suraj's AI assistant. Ask me anything about his skills,
                projects, or experience!
              </p>
            </div>
          ) : (
            <div className="chatbot-messages" id="chatbot-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chatbot-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                  <div className="chatbot-msg-avatar">
                    {msg.role === 'assistant' ? (
                      <BotIcon />
                    ) : (
                      'You'
                    )}
                  </div>
                  <div className="chatbot-msg-bubble">
                    {msg.content}
                    <span className="chatbot-msg-time">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="chatbot-typing">
                  <div className="chatbot-typing-avatar">
                    <BotIcon />
                  </div>
                  <div className="chatbot-typing-bubble">
                    <span className="chatbot-typing-dot" />
                    <span className="chatbot-typing-dot" />
                    <span className="chatbot-typing-dot" />
                  </div>
                </div>
              )}

              {error && (
                <div className="chatbot-error">
                  <span>⚠️ {error}</span>
                  <button
                    className="chatbot-retry-btn"
                    onClick={handleRetry}
                    id="chatbot-retry-btn"
                  >
                    🔄 Retry
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Suggestions */}
          {showWelcome && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chatbot-suggestion-btn"
                  onClick={() => sendMessage(s)}
                  id={`chatbot-suggestion-${s.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <div className="chatbot-input-wrapper">
              <textarea
                ref={inputRef}
                className="chatbot-input"
                placeholder="Type a message…"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading}
                id="chatbot-input"
              />
              <button
                className="chatbot-send-btn"
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                id="chatbot-send-btn"
              >
                <SendIcon />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="chatbot-footer">
            Powered by <span>AI</span> • Ask me anything
          </div>
        </div>
      )}
    </>
  );
}

