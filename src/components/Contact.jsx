import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!botToken || !chatId || chatId === 'YOUR_CHAT_ID_HERE') {
      console.error('Telegram bot settings missing')
      setStatus('error')
      return
    }

    const escapeHtml = (unsafe) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    const text = `
<b>🆕 Yangi xabar!</b>

<b>👤 Ism:</b> ${escapeHtml(formData.name)}
<b>📧 Email:</b> ${escapeHtml(formData.email)}
<b>tg:</b> ${escapeHtml(formData.telegram)}

<b>📝 Xabar:</b>
${escapeHtml(formData.message)}
    `

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken.trim()}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId.trim(),
          text: text.trim(),
          parse_mode: 'HTML'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', telegram: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        console.error('Telegram API xatosi:', data)
        setStatus('error')
      }
    } catch (error) {
      console.error('Xatolik yuz berdi:', error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative w-full bg-white dark:bg-gray-900 py-32">
      {/* Apple-style background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-8 shadow-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all"
                    placeholder={t('contact.form.name_placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all"
                    placeholder={t('contact.form.email_placeholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.telegram')}</label>
                <input
                  type="text"
                  required
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all"
                  placeholder={t('contact.form.telegram_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form.details')}</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                  placeholder={t('contact.form.details_placeholder')}
                />
              </div>

              <div className="flex flex-col items-center gap-6 pt-4">
                <div className="flex items-center gap-6">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className={`rounded-full px-8 py-4 font-medium transition-all shadow-lg flex items-center gap-2 ${status === 'loading'
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                      }`}
                  >
                    {status === 'loading' ? (
                      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {t('contact.form.submit')}
                  </motion.button>
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    href="#home"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                  >
                    {t('contact.form.back_to_top')}
                  </motion.a>
                </div>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-500 font-medium"
                    >
                      {t('contact.form.success')}
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 font-medium"
                    >
                      {t('contact.form.error')}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Contact alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 font-light mb-8">
            {t('contact.alt.title')}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: t('contact.alt.email'), value: 'inspiretd001@gmail.com', href: 'mailto:inspiretd001@gmail.com' },
              { label: t('contact.alt.telegram'), value: '@r_sttrv', href: 'https://t.me/r_sttrv' },
              { label: 'LinkedIn', value: t('contact.alt.linkedin_val'), href: '#' },
              { label: 'GitHub', value: 'sttrvr', href: 'https://github.com/sttrvr' }
            ].map((contact, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -2 }}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-6 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors min-w-[160px]"
              >
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{contact.label}</div>
                <div className="text-gray-900 dark:text-white font-medium">{contact.value}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
