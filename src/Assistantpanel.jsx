import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

const ink = { fill: "var(--mood, #7cf0c4)" };
const line = {
  stroke: "var(--mood, #7cf0c4)",
  fill: "none",
  strokeWidth: 2.4,
  strokeLinecap: "round",
};

const MOUTHS = {
  happy: "M19 37 Q28 47 37 37",
  worried: "M20 42 Q28 34 36 42",
  alert: "M22 39 H34",
  calm: "M21 38 Q28 43 35 38",
  curious: "M21 39 Q28 39 35 39",
};

export function BotFace({ mood = "calm", size = 52 }) {
  let eyes;
  if (mood === "happy") {
    eyes = (
      <>
        <path d="M18 30 Q21.5 25 25 30" style={line} />
        <path d="M31 30 Q34.5 25 38 30" style={line} />
      </>
    );
  } else if (mood === "worried") {
    eyes = (
      <>
        <circle cx="21.5" cy="29" r="3" style={ink} />
        <circle cx="34.5" cy="29" r="3" style={ink} />
        <path d="M17 23 L25 25" style={{ ...line, strokeWidth: 2 }} />
        <path d="M39 23 L31 25" style={{ ...line, strokeWidth: 2 }} />
      </>
    );
  } else {
    const r = mood === "alert" ? 4 : 3;
    eyes = (
      <>
        <circle cx="21.5" cy="29" r={r} style={ink} />
        <circle cx="34.5" cy="29" r={r} style={ink} />
      </>
    );
  }
  return (
    <svg viewBox="0 0 56 56" width={size} height={size} aria-hidden="true">
      <line x1="28" y1="5" x2="28" y2="12" stroke="#c9c3ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="4.5" r="3" style={ink} />
      <rect x="4" y="24" width="5" height="12" rx="2.5" fill="#7c80d8" />
      <rect x="47" y="24" width="5" height="12" rx="2.5" fill="#7c80d8" />
      <rect x="9" y="12" width="38" height="36" rx="13" fill="#e9e8ff" />
      <rect x="13" y="17" width="30" height="26" rx="9" fill="#14153a" />
      {eyes}
      <path d={MOUTHS[mood] || MOUTHS.calm} style={line} />
    </svg>
  );
}

export function BotFab({ mood, message, count, syncing, peek, open, onClick, name }) {
  return (
    <div className="bot-wrap">
      {!open && (
        <div className={`bot-bubble ${peek ? "show" : ""}`} role="status">
          {syncing ? "Syncing your latest changes…" : message}
        </div>
      )}
      <button
        className={`bot-fab mood-${mood} ${syncing ? "syncing" : ""}`}
        onClick={onClick}
        aria-label={open ? `Close ${name}` : `Open ${name}, your finance assistant`}
        aria-expanded={open}
      >
        <span className="bot-ring" />
        <BotFace mood={mood} size={46} />
        {count > 0 && !open && <span className="bot-badge">{count}</span>}
      </button>
    </div>
  );
}

const MOOD_LABEL = {
  happy: "Feeling good about your money",
  worried: "Needs your attention",
  alert: "Heads up",
  calm: "All synced",
  curious: "Waiting for your data",
};

export function ChatPanel({ botName, mood, status, messages, typing, chips, onSend, onClose, full }) {
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <section
      className={`chat ${full ? "chat-full" : "chat-pop"}`}
      aria-label={`${botName} assistant`}
    >
      <header className="chat-head">
        <div className={`chat-avatar mood-${mood}`}>
          <BotFace mood={mood} size={34} />
        </div>
        <div className="chat-title">
          <strong>{botName}</strong>
          <small>{MOOD_LABEL[mood]}</small>
        </div>
        {onClose && (
          <button className="icon-button" onClick={onClose} aria-label="Close assistant">
            <X size={19} />
          </button>
        )}
      </header>

      {status?.message && <p className="chat-status">{status.message}</p>}

      <div className="chat-body" ref={listRef} aria-live="polite">
        {messages.map((m, i) => (
          <div className={`msg ${m.role}`} key={i}>
            <p>{m.text}</p>
          </div>
        ))}
        {typing && (
          <div className="msg bot">
            <p className="typing">
              <i />
              <i />
              <i />
            </p>
          </div>
        )}
      </div>

      <div className="chat-chips">
        {chips.map((c) => (
          <button key={c} onClick={() => onSend(c)}>
            {c}
          </button>
        ))}
      </div>

      <form className="chat-input" onSubmit={submit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Ask ${botName} about your money...`}
          aria-label="Your question"
        />
        <button type="submit" className="primary-button" aria-label="Send">
          <Send size={17} />
        </button>
      </form>
    </section>
  );
}