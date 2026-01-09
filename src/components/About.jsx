import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <section id="about" ref={ref} className="relative w-full bg-gray-50 py-32 dark:bg-gray-800">
      {/* Apple-style subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 dark:text-white">Men haqimda</h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto dark:text-gray-300">
            Aniqlik, detallarga e'tibor va innovatsiyaga bo'lgan ishtiyoq bilan raqamiy tajribalar yaratish.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div 
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-6 h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center dark:bg-gray-800">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">Maqsad</h3>
            <p className="text-gray-600 font-light leading-relaxed dark:text-gray-300">
              Men tabiiy, intuitiv va yoqimli his qiladigan raqamiy tajribalar yaratishga ishonaman. 
              Har bir o'zaro ta'sir maqsad va ma'noga ega bo'lishi kerak.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-6 h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center dark:bg-gray-800">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">Yondashuv</h3>
            <p className="text-gray-600 font-light leading-relaxed dark:text-gray-300">
              O'ylangan animatsiyalar, silliq o'tishlar va har bir loyihaning markazida 
              ishlash optimizatsiyasi bilan harakat-birinchi dizayn.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: y3 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-6 h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center dark:bg-gray-800">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">E'tibor</h3>
            <p className="text-gray-600 font-light leading-relaxed dark:text-gray-300">
              Kengaytiriladigan, saqlash mumkin bo'lgan ilovalar yaratish uchun React, Next.js, 
              Framer Motion va zamonaviy veb texnologiyalarga ixtisoslashish.
            </p>
          </motion.div>
        </div>

        {/* Apple-style stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '50+', label: 'Tugallangan loyihalar' },
            { number: '3+', label: 'Yillik tajriba' },
            { number: '100%', label: 'Mijozlar mamnunligi' },
            { number: '24/7', label: 'Qo\'llab-quvvatlash' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 dark:text-white">{stat.number}</div>
              <div className="text-gray-600 font-light dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
