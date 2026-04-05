import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Tu es un assistant intelligent, précis et efficace. Tu réponds aux questions de manière claire et structurée. 
Si la question est technique, tu fournis des explications détaillées. 
Tu utilises parfois des emojis pour rendre les réponses plus lisibles.
Réponds toujours en français sauf si l'utilisateur écrit dans une autre langue.`;

const TypingIndicator = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "14px 18px" }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "#00ff88",
        animation: "bounce 1.2s infinite",
        animationDelay: `${i * 0.2}s`,
        display: "inline-block",
      }} />
    ))}
  </div>
);

const Message = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "18px",
      animation: "fadeSlideIn 0.3s ease forwards",
    }}>
      {!isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          background: "linear-gradient(135deg, #00ff88, #00b8ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", marginRight: "10px", flexShrink: 0,
          boxShadow: "0 0 12px rgba(0,255,136,0.4)",
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: "72%",
        background: isUser ? "linear-gradient(135deg, #1a3a5c, #0d2440)" : "rgba(255,255,255,0.04)",
        border: isUser ? "1px solid rgba(0,184,255,0.3)" : "1px solid rgba(0,255,136,0.15)",
        borderRadius: isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
        padding: "12px 16px",
        color: "#e2e8f0", fontSize: "14px", lineHeight: "1.7",
        whiteSpace: "pre-wrap",
      }}>
        {msg.content}
      </div>
      {isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          background: "linear-gradient(135deg, #0d2440, #1a3a5c)",
          border: "1px solid rgba(0,184,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", marginLeft: "10px", flexShrink: 0,
        }}>👤</div>
      )}
    </div>
  );
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Aucune réponse.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setError("Une erreur est survenue. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060c14; height: 100vh; overflow: hidden; }
        #root { height: 100vh; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-8px);opacity:1} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:2px}
        textarea:focus{outline:none}
      `}</style>

      <div style={{
        height: "100vh", background: "#060c14",
        fontFamily: "'Inter', sans-serif",
        display: "flex", flexDirection: "column",
        backgroundImage: `linear-gradient(rgba(0,255,136,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.03) 1px,transparent 1px)`,
        backgroundSize: "40px 40px",
      }}>
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(0,255,136,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(0,255,136,0.02)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,184,255,0.2))",
              border: "1px solid rgba(0,255,136,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
            }}>⚡</div>
            <div>
              <div style={{ fontFamily: "'Space Mono',monospace", color: "#00ff88", fontSize: "14px", fontWeight: 700 }}>SCP-BOT</div>
              <div style={{ color: "rgba(0,255,136,0.5)", fontSize: "11px", fontFamily: "'Space Mono',monospace", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse 2s infinite" }} />
                ACTIF
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} style={{
              background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.3)",
              color: "rgba(255,100,100,0.8)", padding: "6px 12px", borderRadius: "8px",
              cursor: "pointer", fontSize: "11px", fontFamily: "'Space Mono',monospace",
            }}>EFFACER</button>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
          {messages.length === 0 ? (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <div style={{ fontSize: "48px" }}>🤖</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono',monospace", color: "#00ff88", fontSize: "15px", marginBottom: "8px" }}>SCP-BOT en ligne</div>
                <div style={{ color: "rgba(200,220,240,0.4)", fontSize: "13px" }}>Pose n'importe quelle question !</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: 300 }}>
                {["Comment fonctionne l'IA ?", "Explique le Big Bang", "C'est quoi une API ?"].map(q => (
                  <button key={q} onClick={() => setInput(q)} style={{
                    background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)",
                    color: "rgba(0,255,136,0.7)", padding: "10px 14px", borderRadius: "20px",
                    cursor: "pointer", fontSize: "12px", textAlign: "left",
                  }}>{q}</button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => <Message key={i} msg={msg} />)}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg,#00ff88,#00b8ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🤖</div>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: "4px 18px 18px 18px" }}>
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
          {error && (
            <div style={{ background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.25)", color: "rgba(255,120,120,0.9)", borderRadius: "10px", padding: "12px", fontSize: "13px", marginBottom: "12px" }}>⚠️ {error}</div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,255,136,0.1)", background: "rgba(0,0,0,0.2)", flexShrink: 0 }}>
          <div style={{
            display: "flex", gap: "10px", alignItems: "flex-end",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${input ? "rgba(0,255,136,0.35)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "12px", padding: "10px 12px",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Pose ta question..."
              rows={1}
              style={{
                flex: 1, background: "transparent", border: "none", resize: "none",
                color: "#e2e8f0", fontSize: "14px", lineHeight: "1.6",
                fontFamily: "'Inter',sans-serif", maxHeight: "100px", overflowY: "auto",
                caretColor: "#00ff88",
              }}
              onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
                background: loading || !input.trim() ? "rgba(0,255,136,0.1)" : "linear-gradient(135deg,#00ff88,#00c070)",
                border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px",
              }}
            >{loading ? "⏳" : "➤"}</button>
          </div>
        </div>
      </div>
    </>
  );
}
