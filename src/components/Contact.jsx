import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-white dark:bg-gray-900 py-32">
      {/* Apple-style background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
      
      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Birga ishlaylik</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
            G'oyalaringizni hayotga tatbiq etishga tayyormisiz? Men yangi loyihalar va hamkorlik uchun mavjudman.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-8 shadow-lg backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ism</label>
                  <input 
                    type="text"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all" 
                    placeholder="Ismingiz" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    type="email"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all" 
                    placeholder="your@email.com" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loyiha tafsilotlari</label>
                <textarea 
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all resize-none" 
                  placeholder="Loyihangiz, vaqt jadvali va byudjet haqida gapirib bering..."
                />
              </div>
              
              <div className="flex items-center justify-center gap-6 pt-4">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  type="submit"
                  className="rounded-full bg-black dark:bg-white px-8 py-4 text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Xabar yuborish
                </motion.button>
                <motion.a 
                  whileHover={{ y: -2 }} 
                  whileTap={{ y: 0 }} 
                  href="#home" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                >
                  Boshiga qaytish
                </motion.a>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Contact alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 font-light mb-8">
            Bog'lanishning boshqa usulini afzal ko'rasizmi?
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
              { label: 'Telefon', value: '+998 90 123 45 67', href: 'tel:+998901234567' },
              { label: 'LinkedIn', value: 'Men bilan bog\'laning', href: '#' },
              { label: 'GitHub', value: 'Kodlarimni ko\'ring', href: '#' }
            ].map((contact, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -2 }}
                href={contact.href}
                className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-6 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{contact.label}</div>
                <div className="text-gray-900 dark:text-white font-medium">{contact.value}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}