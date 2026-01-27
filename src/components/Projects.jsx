import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SpotlightCard from './SpotlightCard'
import Waves from './Waves'
import ShapeBlur from './ShapeBlur'

const getProjects = (t) => [
  {
    title: t('projects.items.ecomm.title'),
    desc: t('projects.items.ecomm.desc'),
    tech: ['Next.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: t('projects.items.luma.title'),
    desc: t('projects.items.luma.desc'),
    tech: ['React', 'AI API'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: t('projects.items.portfolio.title'),
    desc: t('projects.items.portfolio.desc'),
    tech: ['React', 'Framer'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: t('projects.items.tasks.title'),
    desc: t('projects.items.tasks.desc'),
    tech: ['Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=800&auto=format&fit=crop'
  },
]

export default function Projects() {
  const { t } = useTranslation()
  const projects = getProjects(t)

  return (
    <section id="projects" className="py-40 bg-white dark:bg-[#000] relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none">
        <Waves
          lineColor="rgba(99, 102, 241, 0.4)"
          waveSpeedX={0.01}
          waveSpeedY={0.005}
          waveAmpX={3}
          waveAmpY={1}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-indigo-500" />
            <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.5em]">Selected Works</span>
            <div className="h-px w-12 bg-indigo-500" />
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 uppercase italic transition-colors duration-500">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-32 md:mb-56">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <SpotlightCard
                spotlightColor="rgba(99, 102, 241, 0.15)"
                className="group relative h-[600px] rounded-[48px] overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01]"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-60 dark:opacity-30 group-hover:opacity-80 dark:group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent p-12 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-3 mb-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    {p.tech.map((tag, idx) => (
                      <span key={idx} className="px-5 py-2 rounded-full bg-indigo-500/10 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest text-indigo-500 border border-indigo-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 uppercase italic leading-none">{p.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-xl leading-relaxed opacity-80 max-w-md italic mb-8">
                    "{p.desc}"
                  </p>
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-white group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                    <svg className="w-6 h-6 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Edge Blur Effects */}
          <div className="absolute -top-20 -left-20 w-80 h-80 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
            <ShapeBlur variation={0} circleSize={0.05} />
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
            <ShapeBlur variation={0} circleSize={0.05} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl p-20 md:p-32 text-center shadow-2xl shadow-indigo-500/10"
          >
            {/* Inner Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 uppercase italic leading-[0.9]">
                {t('projects.cta.title')}
              </h3>
              <p className="text-slate-600 dark:text-indigo-100 text-2xl font-medium mb-16 opacity-90 leading-relaxed italic">
                "{t('projects.cta.desc')}"
              </p>
              <a
                href="#contact"
                className="inline-block bg-indigo-500 text-white px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] hover:scale-105 hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-500/40"
              >
                {t('projects.cta.button')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
