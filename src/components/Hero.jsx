import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  // Subtle parallax for Apple-style depth
  const scrollY = useMotionValue(0)
  const y1 = useTransform(scrollY, [0, 1000], [0, -100])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Apple-style minimal background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-20 h-96 w-96 rounded-full bg-gray-100/50 blur-3xl dark:bg-gray-700/30"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-gray-50/80 blur-2xl dark:bg-gray-800/50"
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900" />

      {/* Content - Two columns */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left side - Text content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300">
                <svg className="w-4 h-4 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Yangi loyihalar uchun mavjud
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] dark:text-white"
            >
              <div className="flex items-center gap-3 mb-2">
                Ruslan Sattorov
                <img 
                  src="/galochka.png" 
                  alt="Verified" 
                  className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 object-contain"
                />
              </div>
              Raqamiy
              <br />
              Tajribalar
              <br />
              <span className="text-gray-500 dark:text-gray-400">Yaratish</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-lg md:text-xl text-gray-600 font-light leading-relaxed dark:text-gray-300"
            >
              Men yuqori sifatli veb-interfeyslari yarataman, har bir detailga e'tibor beraman, 
              silliq o'tishlar va mukammal bajarishni ta'minlayman.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#projects"
                className="rounded-full bg-gray-900 px-7 py-3.5 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Loyihalarni ko'rish
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#contact"
                className="rounded-full border border-gray-300 px-7 py-3.5 text-gray-700 font-medium hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Bog'lanish
              </motion.a>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                <span 
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm text-gray-600 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Main image */}
            <motion.div
              style={{ y: prefersReduced ? 0 : y1 }}
              className="relative"
            >
              {/* Light mode image */}
              <img
                src="/ruslan-hero.png"
                alt="Ruslan"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain dark:hidden"
              />
              {/* Dark mode image */}
              <img
                src="/ruslan-hero-white.png"
                alt="Ruslan"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain hidden dark:block"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Simple bottom line */}
      <div className="relative z-10 h-px w-full bg-gray-200 dark:bg-gray-700" />
    </section>
  )
}
