import { AnimatePresence, motion } from 'framer-motion'

export default function LoadingOverlay({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <>
          {/* Minimal backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
          />

          {/* Apple-style loading indicator */}
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Spinning circle */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full dark:border-gray-700 dark:border-t-white"
                />
                {/* Inner glow */}
                <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-gray-400 rounded-full blur-sm opacity-50 dark:border-t-gray-500" />
              </div>
              
              {/* Loading text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Yuklanmoqda...
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}