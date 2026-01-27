import DarkVeil from './DarkVeil'
import { motion } from 'framer-motion'

export default function VeilSection() {
    return (
        <section className="relative w-full h-[500px] sm:h-[700px] overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 z-0">
                <DarkVeil
                    hueShift={0}
                    noiseIntensity={0.03}
                    scanlineIntensity={0.1}
                    speed={0.3}
                    scanlineFrequency={4}
                    warpAmount={0.2}
                    resolutionScale={0.6}
                />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <div className="text-[10vw] font-black tracking-[0.2em] text-white/5 uppercase select-none">
                        Innovation
                    </div>
                </motion.div>
            </div>

            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030303] to-transparent z-20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030303] to-transparent z-20" />
        </section>
    )
}
