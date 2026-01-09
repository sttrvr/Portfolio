import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const themeDropdownRef = useRef(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      // Agar hech narsa saqlanmagan bo'lsa, system rejimini default qilamiz
      if (!savedTheme) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      if (savedTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return savedTheme
    }
    return 'light'
  })
  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })
  const location = useLocation()

  const close = () => {
    setOpen(false)
    setThemeDropdownOpen(false)
  }

  // Click outside handler for theme dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // System theme o'zgarishini kuzatish
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        setSystemTheme(e.matches ? 'dark' : 'light')
        // Agar hozirgi theme system bo'lsa, yangi system theme ni qo'llash
        const currentTheme = localStorage.getItem('theme')
        if (!currentTheme || currentTheme === 'system') {
          const newTheme = e.matches ? 'dark' : 'light'
          setTheme(newTheme)
          const html = document.documentElement
          if (newTheme === 'dark') {
            html.classList.add('dark')
          } else {
            html.classList.remove('dark')
          }
        }
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Theme o'zgartirish funksiyasi
  const setThemeMode = (newTheme) => {
    setTheme(newTheme === 'system' ? systemTheme : newTheme)
    
    // HTML elementiga class qo'shish/olib tashlash
    const html = document.documentElement
    const actualTheme = newTheme === 'system' ? systemTheme : newTheme
    if (actualTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    // localStorage ga saqlash
    localStorage.setItem('theme', newTheme)
    setThemeDropdownOpen(false)
  }

  // Hozirgi theme rejimini olish
  const getCurrentThemeMode = () => {
    const savedTheme = localStorage.getItem('theme')
    // Agar hech narsa saqlanmagan bo'lsa, system rejimini qaytaramiz
    return savedTheme || 'system'
  }

  // Theme ikonkasini olish
  const getThemeIcon = (themeMode) => {
    switch (themeMode) {
      case 'light':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        )
      case 'dark':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        )
      case 'system':
        return (
          <div className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            <div className="absolute -top-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-0.5 border border-gray-200 dark:border-gray-700">
              {systemTheme === 'dark' ? (
                <svg className="w-2 h-2 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg className="w-2 h-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const themeOptions = [
    { value: 'light', label: 'Yorug\' rejim', icon: getThemeIcon('light') },
    { value: 'dark', label: 'Qorong\'u rejim', icon: getThemeIcon('dark') },
    { value: 'system', label: 'System rejimi', icon: getThemeIcon('system') }
  ]

  // Sahifa yuklanganda theme ni qo'llash
  useEffect(() => {
    const html = document.documentElement
    const savedTheme = localStorage.getItem('theme')
    
    // Agar hech narsa saqlanmagan bo'lsa, system rejimini default qilamiz
    if (!savedTheme) {
      localStorage.setItem('theme', 'system')
    }
    
    // Avval barcha theme classlarini tozalash
    html.classList.remove('dark', 'light')
    
    // Kerakli theme ni qo'llash
    if (theme === 'dark') {
      html.classList.add('dark')
    }
  }, [theme])

  const navItems = [
    { to: '/about', label: 'Men haqimda' },
    { to: '/projects', label: 'Loyihalar' },
    { to: '/skills', label: 'Mahoratlar' },
    { to: '/lumaai', label: 'AI Chat' },
    { to: '/contact', label: 'Aloqa' },
  ]

  const mobileNavItems = [
    { to: '/', label: 'Bosh sahifa' },
    ...navItems
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <motion.nav 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
          className="relative flex items-center justify-between rounded-2xl border border-gray-200/30 bg-white/80 px-5 py-3 backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-900/80"
        >
          {/* Logo - Absolute position */}
          <Link to="/" onClick={close} className="absolute -left-4 top-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <img
                src="/Ruslan-Title.png"
                alt="Ruslan Logo"
                className="w-20 h-20 object-contain dark:invert"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center hidden"
              >
                <span className="text-white font-bold text-3xl">R</span>
              </div>
            </motion.div>
          </Link>

          {/* Spacer for logo */}
          <div className="w-16"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              >
                <Link 
                  to={item.to} 
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.to 
                      ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.to && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gray-100 rounded-xl -z-10 dark:bg-gray-800"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Theme Switcher - Dropdown */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="relative flex items-center justify-center gap-1 px-3 h-10 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all group dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              >
                {getCurrentThemeMode() === 'system' ? (
                  <div className="flex items-center gap-1">
                    {/* Desktop ikonkasi va ustiga oy/quyosh */}
                    <div className="relative">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>
                      {/* System theme ga qarab oy yoki quyosh - ustiga chiqib turadi */}
                      <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-gray-900 rounded-full p-0.5 border border-gray-200 dark:border-gray-700">
                        {systemTheme === 'dark' ? (
                          <svg className="w-2.5 h-2.5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                          </svg>
                        ) : (
                          <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  getThemeIcon(getCurrentThemeMode())
                )}
                {/* Dropdown strelkasi */}
                <svg 
                  className={`w-3 h-3 transition-transform ${themeDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-48 rounded-xl border border-gray-200/30 bg-white/95 backdrop-blur-sm shadow-lg dark:border-gray-700/30 dark:bg-gray-900/95"
                  >
                    <div className="p-2">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setThemeMode(option.value)}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            getCurrentThemeMode() === option.value
                              ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                          }`}
                        >
                          {option.icon}
                          {option.label}
                          {getCurrentThemeMode() === option.value && (
                            <svg className="w-4 h-4 ml-auto text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setOpen(!open)} 
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors dark:hover:bg-gray-800"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span 
                animate={{ 
                  rotate: open ? 45 : 0, 
                  y: open ? 6 : 0,
                  width: open ? 20 : 18
                }}
                className="block h-0.5 bg-gray-700 rounded-full origin-center dark:bg-gray-300"
                style={{ width: 18 }}
              />
              <motion.span 
                animate={{ opacity: open ? 0 : 1, x: open ? -10 : 0 }}
                className="block w-4 h-0.5 bg-gray-700 rounded-full dark:bg-gray-300"
              />
              <motion.span 
                animate={{ 
                  rotate: open ? -45 : 0, 
                  y: open ? -6 : 0,
                  width: open ? 20 : 14
                }}
                className="block h-0.5 bg-gray-700 rounded-full origin-center dark:bg-gray-300"
                style={{ width: 14 }}
              />
            </div>
          </motion.button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -20, scale: 0.95 }} 
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} 
            className="mx-4 sm:mx-6 mt-2 rounded-2xl border border-gray-200/30 bg-white/95 p-4 backdrop-blur-sm md:hidden max-w-7xl sm:mx-auto dark:border-gray-700/30 dark:bg-gray-900/95"
          >
            <div className="flex flex-col gap-1">
              {mobileNavItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    onClick={close}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                      location.pathname === item.to 
                        ? 'bg-gray-900 text-white dark:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Theme Switcher - Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mobileNavItems.length * 0.05 }}
                className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tema
                </div>
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setThemeMode(option.value)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all w-full ${
                      getCurrentThemeMode() === option.value
                        ? 'bg-gray-900 text-white dark:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                    {getCurrentThemeMode() === option.value && (
                      <svg className="w-4 h-4 ml-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
