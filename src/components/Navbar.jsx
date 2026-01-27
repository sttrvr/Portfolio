import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Monitor, ChevronDown, Globe, Menu, X } from 'lucide-react'

export default function Navbar({ theme, setTheme }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLangs, setShowLangs] = useState(false)
  const [showThemes, setShowThemes] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { to: '/about', label: t('navbar.about') },
    { to: '/projects', label: t('navbar.projects') },
    { to: '/skills', label: t('navbar.skills') },
    { to: '/lumaai', label: t('navbar.ai_chat') },
    { to: '/contact', label: t('navbar.contact') },
  ]

  const langs = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'uz', label: 'O\'zbekcha' },
  ]

  const themes = [
    { id: 'light', icon: <Sun size={16} />, label: t('themes.light') },
    { id: 'dark', icon: <Moon size={16} />, label: t('themes.dark') },
    { id: 'system', icon: <Monitor size={16} />, label: t('themes.system') },
  ]

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-indigo-500/10' : 'bg-transparent'}`}>

          {/* Logo */}
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <img
                src="/Black and White Modern Personal Brand Logo.png"
                alt="Logo"
                className="w-full h-full object-cover dark:invert-0 invert"
              />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic hidden xl:block">Sattorov</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${location.pathname === item.to ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all duration-500 group-hover:w-full ${location.pathname === item.to ? 'w-full' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => { setShowThemes(!showThemes); setShowLangs(false); }}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-900 dark:text-white"
              >
                {themes.find(t => t.id === theme)?.icon}
              </button>
              <AnimatePresence>
                {showThemes && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 p-2 w-48 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl"
                  >
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); setShowThemes(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${theme === t.id ? 'bg-indigo-500 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                      >
                        {t.icon}
                        {t.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setShowLangs(!showLangs); setShowThemes(false); }}
                className="px-4 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-900 dark:text-white"
              >
                <Globe size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{i18n.language}</span>
                <ChevronDown size={14} className={`transition-transform duration-500 ${showLangs ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showLangs && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 p-2 w-48 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl"
                  >
                    {langs.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); setShowLangs(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${i18n.language === l.code ? 'bg-indigo-500 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                      >
                        {l.label}
                        {i18n.language === l.code && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" /></svg>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setOpen(!open)} className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-900 dark:text-white">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden absolute top-full left-0 right-0 mx-6 mt-4 p-8 bg-white/95 dark:bg-black/95 backdrop-blur-3xl rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col gap-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`text-4xl font-black tracking-tighter transition-all ${location.pathname === item.to ? 'text-indigo-500 px-4' : 'text-slate-900 dark:text-white hover:translate-x-4'}`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
