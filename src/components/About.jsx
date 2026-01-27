import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SpotlightCard from './SpotlightCard'
import BlurText from './BlurText'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="relative w-full bg-white dark:bg-[#000] py-40 overflow-hidden transition-colors duration-500">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative"
        >
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-indigo-500" />
              <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.5em]">The Essence</span>
            </motion.div>

            <BlurText
              text="ABOUT ME"
              className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 leading-[0.85] uppercase italic"
              delay={150}
              animateBy="words"
              direction="top"
            />

            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-90 max-w-md italic">
              {t('about.subtitle')}
            </motion.p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {[
              { title: t('about.goal.title'), desc: t('about.goal.desc') },
              { title: t('about.approach.title'), desc: t('about.approach.desc') },
              { title: t('about.focus.title'), desc: t('about.focus.desc') }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <SpotlightCard
                  spotlightColor="rgba(99, 102, 241, 0.1)"
                  className="p-12 md:p-16 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[48px]"
                >
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-xl opacity-80">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}

            {/* Exp Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-10">
              {[
                { number: '50+', label: t('about.stats.projects') },
                { number: '3+', label: t('about.stats.experience') },
                { number: '100%', label: t('about.stats.satisfaction') },
                { number: '24/7', label: t('about.stats.support') }
              ].map((stat, i) => (
                <div key={i} className="p-10 rounded-[32px] bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-center group hover:bg-indigo-500/10 transition-colors">
                  <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform">{stat.number}</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
