import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const getProjects = (t) => [
  {
    title: t('projects.items.ecomm.title'),
    tag: t('projects.items.ecomm.tag'),
    desc: t('projects.items.ecomm.desc'),
    link: '#',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    image: '/20260109_0959_Image_Generation_simple_compose_01keghzgydetgsm0310q77yjgh-removebg-preview.png'
  },
  {
    title: t('projects.items.luma.title'),
    tag: t('projects.items.luma.tag'),
    desc: t('projects.items.luma.desc'),
    link: '/lumaai',
    tech: ['React', 'AI API', 'Framer Motion', 'Tailwind'],
    image: '/20260109_1000_Image_Generation_simple_compose_01kegj0vjze64twqeawz9jy9cz-removebg-preview.png'
  },
  {
    title: t('projects.items.portfolio.title'),
    tag: t('projects.items.portfolio.tag'),
    desc: t('projects.items.portfolio.desc'),
    link: '#',
    tech: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    image: '/20260109_1003_Image_Generation_remix_01kegj6kgre3maerrqzaxewngs__2_-removebg-preview.png'
  },
  {
    title: t('projects.items.tasks.title'),
    tag: t('projects.items.tasks.tag'),
    desc: t('projects.items.tasks.desc'),
    link: '#',
    tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
    image: '/20260109_1004_Image_Generation_simple_compose_01kegj7hn6fw7ax8891cydy3a4-removebg-preview.png'
  },
]

// Liquid Glass Button Component
function LiquidGlassButton() {
  const { t } = useTranslation()
  return (
    <motion.div className="relative">
      <motion.a
        href="#contact"
        className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ width: 60, height: 60 }}
        whileInView={{ width: 200, height: 60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full" />

        {/* Icon */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ x: 0 }}
          whileInView={{ x: -60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.div>

        {/* Text */}
        <motion.span
          className="absolute text-sm font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 10 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
        >
          {t('projects.cta.button')}
        </motion.span>
      </motion.a>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg p-6 h-full transition-all duration-200 hover:shadow-md overflow-hidden group">

        {/* Liquid Glass Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[2px] group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg" />
        </div>

        {/* Glass effect overlay */}
        <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-[2px] opacity-5 dark:opacity-10 rounded-lg overflow-hidden">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Image */}
        <div className="relative h-48 w-full rounded-lg bg-gray-100 dark:bg-gray-800 mb-6 overflow-hidden z-20">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-contain transition-transform duration-200 group-hover:scale-105 ${index >= 2 ? 'filter brightness-110' : ''
              }`}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />

          {/* Fallback icon */}
          <div className="w-16 h-16 text-gray-400 dark:text-gray-500 hidden items-center justify-center">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 relative z-20">
          {/* Tag */}
          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-full">
            {project.tag}
          </span>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.desc}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          {project.link && (
            <div className="pt-2">
              {project.link.startsWith('/') ? (
                <Link
                  to={project.link}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  {t('projects.view_project')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  {t('projects.view_project')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const projects = getProjects(t)
  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('projects.cta.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            {t('projects.cta.desc')}
          </p>

          <div className="flex justify-center">
            <LiquidGlassButton />
          </div>
        </motion.div>
      </div>
    </section>
  )
}