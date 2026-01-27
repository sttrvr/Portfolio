import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Sparkles, Send, Copy, RefreshCw, Trash2, Cpu, MessageSquare, Terminal, Zap } from 'lucide-react'
import ShapeBlur from '../ShapeBlur'
import SpotlightCard from '../SpotlightCard'

// Gemini API
const GEMINI_API = {
  name: 'Luma 1.0 Pro',
  url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  headers: {
    'Content-Type': 'application/json'
  }
}

// Smart Offline Responses
const SMART_RESPONSES = {
  'salom': 'Salom! Men Luma 1.0 Pro bilan ishlaydigan AI yordamchiman. Hozir API bilan muammo bor, lekin men sizga yordam berishga harakat qilaman.',
  'nima': 'Men Luma 1.0 Pro model asosida ishlaydigan sun\'iy intellekt yordamchisiman. Bu Google ning eng kuchli modeli.',
  'ai': 'Sun\'iy intellekt (AI) - kompyuterlarning inson kabi o\'ylash qobiliyati. Luma 1.0 Pro multimodal model bo\'lib, matn va tasvirni tushunadi.',
  'yordam': 'Men Luma 1.0 Pro orqali dasturlash, ta\'lim, yozish va tadqiqot ishlarida yordam beraman. Hozir API bilan muammo bor.',
  'luma': 'Luma 1.0 Pro - bu Google ning eng yangi va kuchli modeli. Omni (har qanday) modallik bilan ishlaydi.',
  'gemini': 'Gemini API - bu Google ning rasmiy API. Luma 1.0 Pro va boshqa modellarni taklif qiladi.',
  'api': 'Gemini API hozir ishlamayapti. Internet aloqangizni yoki API kalitni tekshiring.',
  'test': 'Test so\'rovi yuborildi. Gemini API serveri ishlamayapti. API kalitni tekshiring.',
  'default': 'Kechirasiz, hozir Luma 1.0 Pro API ishlamayapti. Keyinroq qayta urinib ko\'ring.'
}

export default function LumaAI() {
  const chatContainerRef = useRef(null)

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('lumaai-chat-history')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Chat history parse error:', e)
      }
    }
    return [
      { role: 'assistant', content: 'Salom! Men Luma 1.0 Pro model asosida ishlaydigan AI yordamchiman. Sizga qanday yordam bera olaman?', timestamp: Date.now() }
    ]
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('unknown')
  const [copiedMessageId, setCopiedMessageId] = useState(null)

  useEffect(() => {
    localStorage.setItem('lumaai-chat-history', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const copyMessage = async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const clearChat = () => {
    const initialMessage = {
      role: 'assistant',
      content: 'Salom! Men Luma 1.0 Pro model asosida ishlaydigan AI yordamchiman. Sizga qanday yordam bera olaman?',
      timestamp: Date.now()
    }
    setMessages([initialMessage])
    localStorage.setItem('lumaai-chat-history', JSON.stringify([initialMessage]))
  }

  const callGeminiAPI = async (message) => {
    try {
      const response = await fetch(GEMINI_API.url, {
        method: 'POST',
        headers: GEMINI_API.headers,
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      })

      if (response.ok) {
        const data = await response.json()
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Luma 1.0 Pro javob bermadi'
        return `${result}` // Clean response
      } else {
        const errorText = await response.text()
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error('Gemini API Error:', error)
      throw error
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input, timestamp: Date.now() }
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    try {
      const response = await callGeminiAPI(currentInput)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }])
      setApiStatus('working')
    } catch (geminiError) {
      setApiStatus('error')
      const smartResponse = getSmartResponse(currentInput)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `${smartResponse}\n\n⚠️ (Offline rejimi: API xatosi)`,
        timestamp: Date.now()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const getSmartResponse = (input) => {
    const lowerInput = input.toLowerCase()
    for (const [key, response] of Object.entries(SMART_RESPONSES)) {
      if (lowerInput.includes(key)) {
        return response
      }
    }
    return SMART_RESPONSES.default
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-[#000] relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] opacity-20 dark:opacity-30">
          <ShapeBlur variation={0} circleSize={0.4} />
        </div>
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] opacity-20 dark:opacity-20">
          <ShapeBlur variation={2} circleSize={0.3} />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 h-[85vh] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <Sparkles size={14} className="text-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Powered by Gemini Pro</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 uppercase italic">
            Luma AI
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Intelligence redefined. Ask anything.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col min-h-0"
        >
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.15)"
            className="flex-1 flex flex-col rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl shadow-indigo-500/5"
          >
            {/* Header Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${apiStatus === 'error' ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {apiStatus === 'error' ? 'Offline Mode' : 'Online'}
                </span>
              </div>
              <button
                onClick={clearChat}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-colors"
                title="Clear Chat"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.timestamp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`relative group max-w-[80%] md:max-w-[70%] rounded-2xl px-6 py-4 ${msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-sm'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                    }`}>
                    {msg.role === 'assistant' && (
                      <div className="absolute -top-6 left-0 flex items-center gap-2 opacity-50">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Luma AI</span>
                      </div>
                    )}
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                    {/* Copy Button */}
                    <button
                      onClick={() => copyMessage(msg.content, msg.timestamp)}
                      className={`absolute top-2 right-2 p-1.5 rounded-lg bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity ${copiedMessageId === msg.timestamp ? 'text-emerald-400' : 'text-white/70 hover:text-white'
                        }`}
                    >
                      {copiedMessageId === msg.timestamp ? <RefreshCw size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-2xl rounded-tl-sm flex items-center gap-3">
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 dark:bg-black/20 backdrop-blur-md border-t border-slate-200 dark:border-white/5">
              <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask something wonderful..."
                    rows={1}
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 pl-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none max-h-32 transition-all scrollbar-hide"
                    disabled={isLoading}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Terminal size={18} />
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
                >
                  {isLoading ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400 dark:text-slate-600">
                  Luma AI can make mistakes. Consider checking important information.
                </span>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  )
}