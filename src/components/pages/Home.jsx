import { Suspense, lazy } from 'react'
import { useOutletContext } from 'react-router-dom'

import Hero from '../Hero'
const About = lazy(() => import('../About'))
const Projects = lazy(() => import('../Projects'))
const Skills = lazy(() => import('../Skills'))
const Contact = lazy(() => import('../Contact'))
const CircularGallery = lazy(() => import('../CircularGallery'))
const ShapeBlur = lazy(() => import('../ShapeBlur'))

export default function Home() {
  const { theme } = useOutletContext() || { theme: 'dark' }

  const galleryItems = [
    { image: '/20260109_0959_Image_Generation_simple_compose_01keghzgydetgsm0310q77yjgh-removebg-preview.png', text: 'Creation' },
    { image: '/20260109_1000_Image_Generation_simple_compose_01kegj0vjze64twqeawz9jy9cz-removebg-preview.png', text: 'Vision' },
    { image: '/20260109_1003_Image_Generation_remix_01kegj6kgre3maerrqzaxewngs__2_-removebg-preview.png', text: 'Logic' },
    { image: '/20260109_1004_Image_Generation_simple_compose_01kegj7hn6fw7ax8891cydy3a4-removebg-preview.png', text: 'Art' },
    { image: '/ruslan-hero.png', text: 'Ruslan' },
  ]

  const isLight = theme === 'light' || (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <main className="relative bg-white dark:bg-[#000] transition-colors duration-500">
      <Hero />

      <div className="h-40 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">
        <div className="absolute inset-0 opacity-20">
          <Suspense fallback={null}>
            <ShapeBlur variation={0} circleSize={0.1} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <div className="h-[600px] w-full relative overflow-hidden bg-slate-50 dark:bg-black py-20 transition-colors duration-500">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter text-slate-300 dark:text-white/20 uppercase italic transition-colors">Interactive Gallery</h2>
        </div>
        <Suspense fallback={null}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor={isLight ? '#000000' : '#ffffff'}
            borderRadius={0.05}
          />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <Skills />
      </Suspense>

      <Suspense fallback={null}>
        <Projects />
      </Suspense>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  )
}
