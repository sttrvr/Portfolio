import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', telegram: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
    if (!botToken || !chatId) { setStatus('error'); return; }

    const text = `🆕 New Message!\nName: ${formData.name}\nEmail: ${formData.email}\nTG: ${formData.telegram}\nMessage: ${formData.message}`

    try {
      const resp = await fetch(`https://api.telegram.org/bot${botToken.trim()}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId.trim(), text: text.trim() })
      })
      if (resp.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', telegram: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="relative w-full bg-white dark:bg-[#000] py-32 overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.4em]">Connect</span>
            <div className="h-px w-12 bg-indigo-500" />
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 italic uppercase transition-colors duration-500">CONTACT</h2>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-tight opacity-80 italic italic transition-colors duration-500">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="p-10 md:p-14 rounded-[40px] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-3xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text" required placeholder={t('contact.form.name')}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white font-medium focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                  <input
                    type="email" required placeholder={t('contact.form.email')}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white font-medium focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
                <input
                  type="text" required placeholder={t('contact.form.telegram')}
                  value={formData.telegram} onChange={e => setFormData({ ...formData, telegram: e.target.value })}
                  className="w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white font-medium focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
                <textarea
                  rows={6} required placeholder={t('contact.form.details')}
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white font-medium focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
                <button
                  type="submit" disabled={status === 'loading'}
                  className="w-full py-6 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-sm uppercase tracking-[0.3em] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-2xl shadow-indigo-500/20"
                >
                  {status === 'loading' ? 'Processing...' : t('contact.form.submit')}
                </button>
                <AnimatePresence>
                  {status === 'success' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 dark:text-emerald-400 font-bold text-center uppercase tracking-widest text-[10px]">✓ Message Sent Successfully!</motion.p>}
                </AnimatePresence>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {[
              { label: 'EMAIL', value: 'inspiretd001@gmail.com', href: 'mailto:inspiretd001@gmail.com' },
              { label: 'TELEGRAM', value: '@r_sttrv', href: 'https://t.me/r_sttrv' },
              { label: 'GITHUB', value: 'sttrvr', href: 'https://github.com/sttrvr' }
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" className="block p-10 rounded-[32px] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-indigo-500/20 transition-all group shadow-xl shadow-indigo-500/[0.02]">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.3em] mb-3 uppercase">{c.label}</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors tracking-tighter italic uppercase">{c.value}</div>
              </a>
            ))}

            <div className="p-8 rounded-[32px] border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.01] flex items-center justify-between opacity-50">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">Current Status</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
