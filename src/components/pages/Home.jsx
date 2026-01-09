import { Suspense, lazy, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

import Hero from '../Hero'

const About = lazy(() => import('../About'))
const Projects = lazy(() => import('../Projects'))
const Skills = lazy(() => import('../Skills'))
const Contact = lazy(() => import('../Contact'))

export default function Home() {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const lenis = new Lenis({ 
      duration: 1.2, 
      smoothWheel: true, 
      smoothTouch: false, 
      easing: (t) => 1 - Math.pow(1 - t, 4) 
    })
    function raf(time) { 
      lenis.raf(time)
      requestAnimationFrame(raf) 
    }
    const id = requestAnimationFrame(raf)
    return () => cancelAnimationFrame(id)
  }, [prefersReduced])

  return (
    <main className="relative">
      <Hero />
      
      {/* Apple-style section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <Suspense fallback={<SectionSkeleton title="About" />}> 
        <About /> 
      </Suspense>
      
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <Suspense fallback={<SectionSkeleton title="Projects" />}> 
        <Projects /> 
      </Suspense>
      
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <Suspense fallback={<SectionSkeleton title="Skills" />}> 
        <Skills /> 
      </Suspense>
      
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <Suspense fallback={<SectionSkeleton title="Contact" />}> 
        <Contact /> 
      </Suspense>
    </main>
  )
}

function SectionSkeleton({ title }) {
  return (
    <section className="relative w-full bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
        <div className="mt-6 h-32 w-full rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    </section>
  )
}
