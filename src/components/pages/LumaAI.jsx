import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Gemini API
const GEMINI_API = {
  name: 'Luma 1.0 Pro',
  url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  headers: { 
    'Content-Type': 'application/json'
  }
}

// Aqlli offline javoblar (faqat Gemini API ishlamasa)
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
  const ref = useRef(null)
  const chatEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  const [messages, setMessages] = useState(() => {
    // localStorage dan chat history ni yuklash
    const saved = localStorage.getItem('lumaai-chat-history')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Chat history parse error:', e)
      }
    }
    return [
      { role: 'assistant', content: 'Salom! Men Luma 1.0 Pro model asosida ishlaydigan AI yordamchiman. Sizga qanday yordam bera olaman? 🤖', timestamp: Date.now() }
    ]
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('unknown') // 'working', 'error', 'unknown'
  const [copiedMessageId, setCopiedMessageId] = useState(null)

  // Chat history ni localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('lumaai-chat-history', JSON.stringify(messages))
  }, [messages])

  // Chat oxiriga scroll qilish - faqat chat container ichida
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Message copy funksiyasi
  const copyMessage = async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  // Chat tozalash
  const clearChat = () => {
    const initialMessage = { 
      role: 'assistant', 
      content: 'Salom! Men Luma 1.0 Pro model asosida ishlaydigan AI yordamchiman. Sizga qanday yordam bera olaman? 🤖',
      timestamp: Date.now()
    }
    setMessages([initialMessage])
    localStorage.setItem('lumaai-chat-history', JSON.stringify([initialMessage]))
  }
  const callGeminiAPI = async (message) => {
    try {
      console.log('🔑 API Key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Mavjud' : 'Yo\'q')
      console.log('🌐 Request URL:', GEMINI_API.url)
      console.log('📝 Request body:', {
        contents: [{ parts: [{ text: message }] }]
      })

      // Gemini API format
      const response = await fetch(GEMINI_API.url, {
        method: 'POST',
        headers: GEMINI_API.headers,
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      })

      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Response data:', data)
        
        // Gemini javob formatini parse qilish
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Luma 1.0 Pro javob bermadi'
        
        return `🤖 **Luma 1.0 Pro:** ${result}`
      } else {
        const errorText = await response.text()
        console.error('❌ Error response:', errorText)
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error('🚨 Gemini API ishlamadi:', error)
      throw error
    }
  }

  // API holatini tekshirish
  const testAPI = async () => {
    try {
      setApiStatus('testing')
      await callGeminiAPI('test')
      setApiStatus('working')
    } catch (error) {
      setApiStatus('error')
    }
  }

  // Aqlli offline javob (faqat API ishlamasa)
  const getSmartResponse = (input) => {
    const lowerInput = input.toLowerCase()
    for (const [key, response] of Object.entries(SMART_RESPONSES)) {
      if (lowerInput.includes(key)) {
        return `🧠 **Offline AI:** ${response}`
      }
    }
    return `🧠 **Offline AI:** ${SMART_RESPONSES.default}`
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input, timestamp: Date.now() }
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    try {
      // Faqat Gemini API ishlatamiz
      const response = await callGeminiAPI(currentInput)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        timestamp: Date.now()
      }])
      setApiStatus('working')
    } catch (geminiError) {
      console.error('Gemini API Error:', geminiError)
      setApiStatus('error')
      
      // Offline javob
      const smartResponse = getSmartResponse(currentInput)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `${smartResponse}

⚠️ **API Holati:**
• Luma 1.0 Pro: ${geminiError.message}

💡 **Tavsiya:** API kalitni tekshiring yoki "Test API" tugmasini bosing.`,
        timestamp: Date.now()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div ref={ref} className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Clean Apple Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" />
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.02) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(0,0,0,0.03) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(0,0,0,0.02) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.02) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 px-6 py-2 text-gray-600 dark:text-gray-200 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="h-2 w-2 rounded-full bg-gray-400"
              />
              Luma 1.0 Pro bilan quvvatlanadi
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100"
          >
            Luma AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-12 max-w-3xl mx-auto font-light"
          >
            Tabiiy til tushunishi, aqlli fikrlash va ko'p tilli qo'llab-quvvatlash bilan 
            Luma 1.0 Pro modeli tomonidan quvvatlanadigan ilg'or sun'iy intellekt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.querySelector('#ai-chat').scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-black dark:bg-white px-8 py-4 text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Luma 1.0 Pro sinab ko'ring
            </button>
            <button 
              onClick={() => document.querySelector('#features').scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-gray-300 dark:border-gray-600 px-8 py-4 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Ko'proq o'rganing
            </button>
          </motion.div>
        </div>

        {/* Minimal Floating Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-16 h-16 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">Luma 1.0 Pro Imkoniyatlari</h2>
            <p className="text-gray-600 dark:text-gray-200 text-lg font-light">Gemini API texnologiyasi bilan quvvatlanadigan ilg'or xususiyatlar</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Tabiiy Til',
                desc: 'Luma 1.0 Pro arxitekturasi bilan ilg\'or ko\'p tilli tushunish',
                icon: (
                  <svg className="w-8 h-8 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.691 1.309 3.061 2.927 3.061 1.618 0 2.927-1.37 2.927-3.061 0-1.69-1.309-3.061-2.927-3.061S2.25 11.69 2.25 13.189zm15.75 0c0 1.691-1.309 3.061-2.927 3.061-1.618 0-2.927-1.37-2.927-3.061 0-1.69 1.309-3.061 2.927-3.061s2.927 1.37 2.927 3.061zM7.5 14.25a3 3 0 00-3 3v.75a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-.75a3 3 0 00-3-3zm9 0a3 3 0 00-3 3v.75a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-.75a3 3 0 00-3-3z" />
                  </svg>
                )
              },
              {
                title: 'Aqlli Fikrlash',
                desc: 'Murakkab muammolarni hal qilish va mantiqiy fikrlash qobiliyatlari',
                icon: (
                  <svg className="w-8 h-8 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75-7.478a12.121 12.121 0 00-3.75-2.25m0 9.75a12.06 12.06 0 01-4.5 0m7.5-10.5a6.75 6.75 0 00-1.5-.25m0 0a6.75 6.75 0 00-1.5.25m0 0a6.75 6.75 0 019 6.75 6.75 6.75 0 01-9 6.75M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              {
                title: 'Kod Yaratish',
                desc: 'Ko\'p tillarda dasturlash yordami va kod to\'ldirish',
                icon: (
                  <svg className="w-8 h-8 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-200 font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat */}
      <section id="ai-chat" className="py-28 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">Luma 1.0 Pro sinab ko'ring</h2>
            <p className="text-gray-600 dark:text-gray-200 text-lg font-light">Gemini API suhbatining kuchini his qiling</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden shadow-sm"
          >
            {/* Chat Messages */}
            <div ref={chatContainerRef} className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message, i) => (
                <motion.div
                  key={`${message.timestamp}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative ${
                    message.role === 'user' 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Copy button */}
                    <button
                      onClick={() => copyMessage(message.content, `${message.timestamp}-${i}`)}
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${
                        copiedMessageId === `${message.timestamp}-${i}` ? 'bg-green-100 dark:bg-green-900' : ''
                      }`}
                    >
                      {copiedMessageId === `${message.timestamp}-${i}` ? (
                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 shadow-sm px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-gray-500">Luma 1.0 Pro fikrlayapti...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Chat end ref for auto scroll */}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 dark:border-gray-600 p-6 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    🔗 Gemini API
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    apiStatus === 'working' ? 'bg-green-100 text-green-700' :
                    apiStatus === 'error' ? 'bg-red-100 text-red-700' :
                    apiStatus === 'testing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {apiStatus === 'working' ? '✅ API Ishlayapti' :
                     apiStatus === 'error' ? '❌ API Xatosi' :
                     apiStatus === 'testing' ? '🔄 Tekshirilmoqda...' :
                     '❓ Noma\'lum'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={testAPI}
                    disabled={apiStatus === 'testing'}
                    className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors disabled:opacity-50"
                  >
                    API Sinash
                  </button>
                  <button
                    onClick={clearChat}
                    className="text-xs text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Tozalash
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Luma 1.0 Pro bilan suhbatlashing..."
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 pr-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent resize-none"
                    rows={1}
                    disabled={isLoading}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                    }}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                    {input.length}/1000
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading || input.length > 1000}
                  className="rounded-xl bg-black dark:bg-white px-6 py-3 text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      <span className="hidden sm:inline">Yuborilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="hidden sm:inline">Yuborish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-28 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-16 text-gray-900 dark:text-gray-100"
          >
            Luma 1.0 Pro bilan qurilgan
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['Luma 1.0 Pro', 'Gemini API', 'Tabiiy Til', 'Kod Yaratish', 'Ko\'p Tilli', 'Fikrlash'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-3 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:shadow-md transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          >
            Luma 1.0 Pro ni sinashga tayyormisiz?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-200 mb-12 font-light"
          >
            AI texnologiyasining kelajagiga qo'shiling va Luma 1.0 Pro bilan yangi imkoniyatlarni oching.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="rounded-full bg-black dark:bg-white px-8 py-4 text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Boshlash
            </button>
            <button className="rounded-full border border-gray-300 dark:border-gray-600 px-8 py-4 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Hujjatlar
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}