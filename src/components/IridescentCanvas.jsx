import { useEffect, useRef } from 'react'

// Iridescent ribbon + wireframe spheres, responsive and subtle
export default function IridescentCanvas({ intensity = 1 }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.8)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      sizeRef.current = { w, h, dpr }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()
    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.tx = e.clientX - rect.left
      mouseRef.current.ty = e.clientY - rect.top
    }
    window.addEventListener('mousemove', onMouseMove)

    const lerp = (a, b, t) => a + (b - a) * t

    const ribbonColor = (t) => {
      const c1 = [56, 189, 248]
      const c2 = [168, 85, 247]
      const c3 = [99, 102, 241]
      const u = t < 0.5 ? t * 2 : (t - 0.5) * 2
      const a = t < 0.5 ? c1 : c2
      const b = t < 0.5 ? c3 : c1
      const r = Math.floor(lerp(a[0], b[0], u))
      const g = Math.floor(lerp(a[1], b[1], u))
      const b2 = Math.floor(lerp(a[2], b[2], u))
      return `rgba(${r},${g},${b2},0.8)`
    }

    let t = 0
    const render = () => {
      const { w, h } = sizeRef.current
      const m = mouseRef.current
      const isSmall = w < 768

      // ease mouse
      m.x = lerp(m.x, m.tx || w * 0.5, 0.08)
      m.y = lerp(m.y, m.ty || h * 0.5, 0.08)

      ctx.clearRect(0, 0, w, h)

      // background subtle gradient - reduced complexity
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, 'rgba(2,6,23,0.6)')
      bg.addColorStop(1, 'rgba(2,6,23,0.8)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // wireframe spheres — fewer on mobile and reduced complexity
      const spheres = isSmall
        ? [ { x: 0.8, y: 0.2, r: 80, parallax: 12 } ]
        : [ { x: 0.15, y: 0.25, r: 100, parallax: 14 }, { x: 0.8, y: 0.2, r: 120, parallax: 18 } ]

      const drawWire = (cx, cy, r) => {
        // Simplified wireframe - fewer lines for better performance
        ctx.strokeStyle = 'rgba(148,163,184,0.08)'; 
        ctx.lineWidth = 1
        // Reduced number of circles
        for (let i = -2; i <= 2; i++) { 
          const rr = r * Math.cos(i * Math.PI / 8); 
          ctx.beginPath(); 
          ctx.ellipse(cx, cy, r, rr, 0, 0, Math.PI * 2); 
          ctx.stroke() 
        }
        // Reduced number of meridians
        for (let j = 0; j < 6; j++) { 
          const ang = (j / 6) * Math.PI; 
          ctx.beginPath(); 
          ctx.ellipse(cx, cy, r, r, ang, 0, Math.PI * 2); 
          ctx.stroke() 
        }
      }

      spheres.forEach((s) => {
        const px = ((m.x / w) - 0.5) * s.parallax * intensity
        const py = ((m.y / h) - 0.5) * s.parallax * intensity
        drawWire(s.x * w + px, s.y * h + py, s.r)
      })

      // iridescent ribbon — simplified
      const ampBase = isSmall ? 30 : 50
      const baseY = h * 0.5 + ((m.y / h) - 0.5) * 20 * intensity
      const amp = ampBase * intensity
      const len = isSmall ? 15 : 22
      ctx.lineCap = 'round'
      // Reduced number of ribbon layers
      for (let k = 0; k < (isSmall ? 1 : 2); k++) {
        ctx.lineWidth = (isSmall ? 6 : 8) - k * 2
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        for (let i = 0; i <= len; i++) {
          const u = i / len
          const x = u * w
          const y = baseY + Math.sin(u * 5 + t * 0.8 + k) * amp * 0.5 + Math.cos(u * 8 + t * 0.6) * amp * 0.3
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = ribbonColor((Math.sin(t * 0.5 + k) + 1) / 2)
        ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'

      t += 0.012 // Slightly slower animation
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [intensity])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}
