import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import LoadingOverlay from './components/LoadingOverlay'
import VisitorCounter from './components/VisitorCounter'

export default function App() {
  const { t } = useTranslation()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    // Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 4)
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const applyTheme = (targetTheme) => {
      root.classList.remove('light', 'dark')
      if (targetTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
      } else {
        root.classList.add(targetTheme)
      }
    }

    applyTheme(theme)
    localStorage.setItem('theme', theme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => applyTheme('system')
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(id)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white dark:bg-[#000] text-slate-900 dark:text-white selection:bg-indigo-500/30 overflow-x-hidden antialiased transition-colors duration-500">
      {/* Dynamic Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#4f46e515_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,#4f46e510_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#6366f108_0%,transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_80%,#6366f105_0%,transparent_40%)]" />
      </div>

      <div className="relative z-10">
        <Navbar theme={theme} setTheme={setTheme} />

        <LoadingOverlay loading={loading} />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Outlet context={{ theme, setTheme }} />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="relative mt-40 border-t border-slate-200 dark:border-white/5 py-12 bg-white dark:bg-[#000] transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center overflow-hidden">
                <img src="/Black and White Modern Personal Brand Logo.png" alt="Logo" className="w-full h-full object-cover dark:invert-0 invert" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white uppercase">Sattorov</span>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} {t('footer.created_with')}
              </p>
              <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-white/10" />
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <VisitorCounter />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
