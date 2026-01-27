import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SpotlightCard from './SpotlightCard'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const getSkillCategories = (t) => [
  {
    title: t('skills.categories.frontend'),
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: t('skills.categories.motion'),
    skills: ['Framer Motion', 'GSAP', 'Three.js', 'GLSL'],
  },
  {
    title: t('skills.categories.design'),
    skills: ['Figma', 'UX Strategy', 'Design Systems'],
  },
  {
    title: t('skills.categories.backend'),
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
  }
]

export default function Skills() {
  const { t } = useTranslation()
  const skillCategories = getSkillCategories(t)

  return (
    <section id="skills" className="relative w-full bg-white dark:bg-[#000] py-40 overflow-hidden transition-colors duration-500">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-center text-center mb-32"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-indigo-500" />
            <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.5em]">Capabilities</span>
            <div className="h-[2px] w-12 bg-indigo-500" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 transition-colors duration-500"
          >
            EXPERTISE
          </motion.h2>

          <motion.p variants={fadeUp} className="text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl opacity-90 leading-normal italic">
            {t('skills.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div key={i} variants={fadeUp}>
              <SpotlightCard
                spotlightColor="rgba(99, 102, 241, 0.1)"
                className="h-full p-12 flex flex-col items-center text-center border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[48px]"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight leading-none uppercase italic">
                  {category.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-5 py-2 text-[10px] font-black text-slate-600 dark:text-slate-400 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-full uppercase tracking-widest"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Experience - Refined */}
        <div className="mt-56 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center mb-24"
          >
            <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">The Roadmap</h3>
            <div className="h-px w-24 bg-slate-200 dark:bg-white/10 mt-6" />
          </motion.div>

          <div className="space-y-24 relative">
            <div className="absolute left-[38px] md:left-[108px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-indigo-500/50 via-slate-200 dark:via-white/5 to-transparent" />

            {t('skills.experience.items', { returnObjects: true }).map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row gap-12 relative z-10"
              >
                <div className="flex-shrink-0 w-20 md:w-32 pt-2">
                  <span className="text-3xl font-black text-indigo-500/10 dark:text-indigo-500/20 group-hover:text-indigo-500 transition-colors duration-500 font-mono tracking-tighter italic">{exp.year}</span>
                </div>

                <div className="flex-1 bg-slate-50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 p-12 rounded-[40px] group-hover:border-indigo-500/20 transition-all duration-500 relative overflow-hidden">
                  {/* Point on line */}
                  <div className="absolute top-1/2 -left-12 w-6 h-6 rounded-full border-4 border-white dark:border-[#000] bg-indigo-500 hidden md:block" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h4 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-none italic">{exp.title}</h4>
                    <span className="px-6 py-2 rounded-full border border-indigo-500/10 dark:border-indigo-500/30 text-indigo-500 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em]">{exp.company}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-xl leading-relaxed opacity-80 italic">"{exp.desc}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
