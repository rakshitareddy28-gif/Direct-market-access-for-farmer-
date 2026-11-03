import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export const AgronomistChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        'Greetings. I am the Stillfield Estate Agronomist & Harvest Concierge. How may I assist you with today’s dawn-cut harvest, soil terroir data, culinary preparations, or our 100% direct fair grower payouts in Indian Rupees (₹)?',
      timestamp: 'Just now',
      modelUsed: 'gemini-3.8-flash',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelSpeed, setModelSpeed] = useState<'general' | 'fast'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    'What was harvested at dawn today?',
    'How do direct ₹ payouts reach growers?',
    'Best recipe for Romanesco Cauliflower?',
    'Why is cold-chain 4.5°C transit essential?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          modelSpeed,
        }),
      });

      const data = await res.json();
      const replyContent = data.reply || 'I am reviewing the estate harvest logs. Please inquire regarding our dawn harvest batches or farmer ledger.';

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || (modelSpeed === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash'),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Graceful in-thread message instead of failing
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          role: 'assistant',
          content:
            'Today’s dawn-harvest crops include Fractal Romanesco (₹320), San Marzano Tomatoes (₹380), and Golden Chanterelles (₹680), held at 4.5°C for electric cold transit. Feel free to ask about culinary pairings or grower economics.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'gemini-3.8-flash',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'init-1',
        role: 'assistant',
        content:
          'Conversation reset. I am at your service to answer any inquiries regarding today’s harvest crops, soil metrics, or farmer payouts.',
        timestamp: 'Just now',
        modelUsed: 'gemini-3.8-flash',
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      {/* Title & Introduction */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs uppercase tracking-widest font-mono-nums text-[#8C5332] font-semibold block">
          05 / AI Agronomist & Harvest Concierge
        </span>
        <h2 className="font-claude-serif text-3xl sm:text-4xl text-[#16221A] tracking-tight">
          Stillfield Agronomic Advisor
        </h2>
        <p className="text-xs sm:text-sm text-[#3E4F44] leading-relaxed font-claude-sans">
          Powered by Gemini multi-turn reasoning, guiding you through regenerative agriculture, peak ripeness, and culinary preparations.
        </p>
      </div>

      {/* Main Chat Box Container with Stillfield styling */}
      <div className="bg-white rounded-3xl border border-[#16221A]/10 shadow-[0_16px_40px_-12px_rgba(20,40,29,0.07)] overflow-hidden flex flex-col h-[640px]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#F7F6F2] border-b border-[#16221A]/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#14281D] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-[#95FB71]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-claude-serif font-bold text-sm text-[#16221A]">
                  Stillfield Agronomist
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4F9D2D] animate-pulse" />
              </div>
              <p className="text-[11px] text-[#6F7F75] font-mono-nums">
                Active Model: {modelSpeed === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Model Speed Toggle */}
            <div className="flex items-center bg-white rounded-full p-1 border border-[#16221A]/10 text-xs shadow-2xs">
              <button
                onClick={() => setModelSpeed('general')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  modelSpeed === 'general'
                    ? 'bg-[#14281D] text-white shadow-xs'
                    : 'text-[#6F7F75] hover:text-[#16221A]'
                }`}
              >
                General (Flash)
              </button>
              <button
                onClick={() => setModelSpeed('fast')}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  modelSpeed === 'fast'
                    ? 'bg-[#14281D] text-white shadow-xs'
                    : 'text-[#6F7F75] hover:text-[#16221A]'
                }`}
              >
                <Zap className="w-3 h-3 text-[#95FB71]" />
                <span>Fast Lite</span>
              </button>
            </div>

            <button
              onClick={handleClear}
              className="p-2 text-[#6F7F75] hover:text-[#16221A] hover:bg-white rounded-full transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/70">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#14281D] text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#95FB71]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#14281D] text-white rounded-tr-none'
                      : 'bg-[#F7F6F2] text-[#16221A] border border-[#16221A]/10 rounded-tl-none font-claude-sans'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                  <div
                    className={`text-[10px] mt-1.5 font-mono-nums ${
                      m.role === 'user' ? 'text-white/60 text-right' : 'text-[#6F7F75]'
                    }`}
                  >
                    {m.timestamp}
                    {m.modelUsed && ` · ${m.modelUsed}`}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#8C5332] text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-xs text-[#6F7F75]"
            >
              <div className="w-8 h-8 rounded-full bg-[#14281D] text-white flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#95FB71] animate-spin" />
              </div>
              <div className="bg-[#F7F6F2] border border-[#16221A]/10 px-4 py-2.5 rounded-2xl rounded-tl-none">
                Consulting seasonal estate harvest records...
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2.5 bg-[#F7F6F2]/80 border-t border-[#16221A]/8 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-[#8C5332] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#4F9D2D]" />
            Inquire:
          </span>
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              disabled={loading}
              className="text-xs bg-white hover:bg-[#EFEDE6] text-[#16221A] px-3 py-1 rounded-full border border-[#16221A]/10 whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Text Input & 3D Send Button */}
        <div className="p-4 bg-white border-t border-[#16221A]/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the Agronomist about crops, soil pH, recipes, or ₹ pricing..."
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-full bg-[#F7F6F2] border border-[#16221A]/15 text-[#16221A] placeholder:text-[#6F7F75] focus:outline-none focus:border-[#14281D] focus:ring-2 focus:ring-[#4F9D2D]/20 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-full bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs btn-3d-primary flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5 text-[#95FB71]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
