import { useEffect, useRef } from 'react'

const MAX_POINTS = 100
const STRANDS = 9

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/**
 * Full-screen canvas that draws a swirling, fading ribbon of colour behind
 * the cursor. The colour is read from the --accent CSS variable, so it
 * follows the dark/light theme automatically.
 */
export default function CursorWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ctx = canvas.getContext('2d')
    let dpr = 1
    let w = 0
    let h = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const target = { x: 0, y: 0 }
    const head = { x: 0, y: 0 }
    let seen = false
    const points = []
    let rgb = [255, 122, 69]
    let frameCount = 0
    let t = 0
    let raf = 0

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent')
      if (v && v.trim().startsWith('#')) rgb = hexToRgb(v)
    }
    readColor()

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!seen) {
        head.x = target.x
        head.y = target.y
        seen = true
      }
    }

    const draw = () => {
      frameCount++
      t += 0.016
      if (frameCount % 20 === 0) readColor()

      ctx.clearRect(0, 0, w, h)

      if (seen) {
        head.x += (target.x - head.x) * 0.3
        head.y += (target.y - head.y) * 0.3
        const last = points[points.length - 1]
        const moved = !last || Math.hypot(head.x - last.x, head.y - last.y) > 0.3
        if (moved) {
          points.push({ x: head.x, y: head.y })
          if (points.length > MAX_POINTS) points.shift()
        } else if (points.length) {
          // cursor is still: let the ribbon unwind and fade away
          points.shift()
          if (points.length) points.shift()
        }
      }

      const n = points.length
      if (n > 4) {
        const [r, g, b] = rgb

        // soft glow around the cursor
        const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 70)
        grad.addColorStop(0, `rgba(${r},${g},${b},0.14)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(head.x - 70, head.y - 70, 140, 140)

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        const grow = Math.min(1, n / 24)

        for (let s = 0; s < STRANDS; s++) {
          const phase = s * 0.95
          const amp = (12 + s * 8) * grow
          const speed = 2 + s * 0.18
          const pts = new Array(n)

          for (let i = 0; i < n; i++) {
            const p = points[i]
            const a = points[Math.max(0, i - 1)]
            const c = points[Math.min(n - 1, i + 1)]
            let dx = c.x - a.x
            let dy = c.y - a.y
            const len = Math.hypot(dx, dy) || 1
            dx /= len
            dy /= len
            const f = i / (n - 1) // 0 = tail, 1 = head
            const wave = Math.sin(f * Math.PI * 3.2 + t * speed + phase)
            const spread = (1 - f) * (1 - f * 0.4)
            pts[i] = {
              x: p.x - dy * wave * amp * spread,
              y: p.y + dx * wave * amp * spread,
            }
          }

          const baseAlpha = 0.55 - s * 0.05
          ctx.lineWidth = s % 3 === 0 ? 1.6 : 1

          for (let i = 1; i < n - 1; i++) {
            const f = i / (n - 1)
            const alpha = Math.pow(f, 1.6) * baseAlpha
            if (alpha < 0.01) continue
            const m0x = (pts[i - 1].x + pts[i].x) / 2
            const m0y = (pts[i - 1].y + pts[i].y) / 2
            const m1x = (pts[i].x + pts[i + 1].x) / 2
            const m1y = (pts[i].y + pts[i + 1].y) / 2
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.beginPath()
            ctx.moveTo(m0x, m0y)
            ctx.quadraticCurveTo(pts[i].x, pts[i].y, m1x, m1y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  )
}
