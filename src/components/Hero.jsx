import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Squares from './Squares'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden bg-white dark:bg-black pt-20 transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="opacity-10 dark:opacity-100 transition-opacity duration-500">
          <Squares
            direction="down"
            speed={0.5}
            squareSize={40}
            borderColor="rgba(100, 100, 100, 0.1)"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black via-transparent to-white dark:to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col items-start text-left"
          >
            {/* Status Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-2xl text-[10px] font-bold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-40"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                </span>
                {t('hero.available')}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none text-slate-900 dark:text-white mb-8 flex flex-col items-start transition-colors duration-500"
            >
              <span className="flex items-center gap-2 md:gap-4">
                Ruslan
                <motion.img
                  src="/galochka.png"
                  alt="Verified"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 inline-block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                />
              </span>
              <span>Sattorov</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="max-w-xl mb-12">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 italic transition-colors duration-500">
                "{t('hero.title_part1')} {t('hero.title_part2')}. {t('hero.description')}"
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
              <a
                href="#projects"
                className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
              >
                {t('hero.view_projects')}
              </a>

              <a
                href="#contact"
                className="px-10 py-5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              >
                {t('hero.contact')}
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-[600px] ml-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-indigo-500/10 dark:border-indigo-500/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-4 rounded-full border border-slate-200 dark:border-white/5 animate-[spin_30s_linear_infinite_reverse]" />

              <img
                src="/ruslan-hero.png"
                alt="Ruslan Sattorov"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(79,70,229,0.2)]"
              />

              {/* Glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full z-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
