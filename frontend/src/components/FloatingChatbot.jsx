import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import api from "../api/axios";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me about events, registration, payment, or entry OTP.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    try {
      const res = await api.post("/chatbot/ask", {
        message: userText,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I cannot answer now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                <Bot size={18} />
              </div>
              <h2 className="text-sm font-semibold text-black">Help Chatbot</h2>
            </div>

            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t p-3">
            <input
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black disabled:opacity-50"
              placeholder="Ask..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />

            <button
              className="rounded-lg bg-black px-3 text-white disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
      >
        <Bot size={24} />
      </button>
    </>
  );
};

export default FloatingChatbot;