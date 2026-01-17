import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import Navbar from './components/Navbar'
import LoadingOverlay from './components/LoadingOverlay'

export default function App() {
  const { t } = useTranslation()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Show loader on route change
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(id)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-200 dark:bg-gray-900 dark:text-white dark:selection:bg-gray-700">
      {/* Apple-style minimal background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900" />

      <Navbar />

      <LoadingOverlay loading={loading} />

      <div className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="relative border-t border-gray-200 bg-gray-50/80 py-12 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 font-light dark:text-gray-400"
        >
          © {new Date().getFullYear()} {t('footer.created_with')}
        </motion.p>
      </footer>
    </div>
  )
}
