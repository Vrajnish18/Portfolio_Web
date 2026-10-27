import { useEffect, useRef } from 'react'

/**
 * Cartoon avatar whose face looks at the cursor anywhere on the page.
 * The pupils, the whole head, the hair and the brows each move by a
 * different amount, which gives a soft 3D "turning" feel.
 * Drawn as inline SVG (an original character, easy to restyle: change the
 * fill colours below to match your hair, skin and shirt).
 */
const SKIN = '#f1c7a1'
const SKIN_SHADE = '#dfaa80'
const HAIR = '#3a2a22'

export default function Avatar({ className = '' }) {
  const wrapRef = useRef(null)
  const headRef = useRef(null)
  const hairRef = useRef(null)
  const eyesRef = useRef(null)
  const browsRef = useRef(null)
  const mouthRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const state = { tx: 0, ty: 0, x: 0, y: 0 }
    let pointerSeen = false
    let raf = 0
    let t = 0

    const onMove = (e) => {
      pointerSeen = true
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      // the further the cursor, the more the face turns (capped)
      const reach = Math.min(1, dist / 260)
      state.tx = (dx / dist) * reach
      state.ty = (dy / dist) * reach
    }

    const tick = () => {
      t += 0.016
      if (!pointerSeen && !reduce) {
        // idle drift until the first pointer movement (also used on touch)
        state.tx = Math.sin(t * 0.7) * 0.45
        state.ty = Math.cos(t * 0.5) * 0.25
      }
      state.x += (state.tx - state.x) * 0.12
      state.y += (state.ty - state.y) * 0.12
      const { x, y } = state

      headRef.current?.setAttribute(
        'transform',
        `translate(${(x * 7).toFixed(2)} ${(y * 5).toFixed(2)}) rotate(${(x * 6).toFixed(2)} 120 170)`,
      )
      hairRef.current?.setAttribute(
        'transform',
        `translate(${(x * 3).toFixed(2)} ${(y * 2.5 - Math.max(0, -y) * 1.5).toFixed(2)})`,
      )
      eyesRef.current?.setAttribute(
        'transform',
        `translate(${(x * 3.2).toFixed(2)} ${(y * 2.6).toFixed(2)})`,
      )
      browsRef.current?.setAttribute(
        'transform',
        `translate(${(x * 2).toFixed(2)} ${(y * 2.2 - Math.max(0, -y) * 1.5).toFixed(2)})`,
      )
      mouthRef.current?.setAttribute(
        'transform',
        `translate(${(x * 4.5).toFixed(2)} ${(y * 3).toFixed(2)})`,
      )
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className={className}>
      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-label="Cartoon avatar of Vrajnish that follows the cursor"
        className="h-full w-full"
      >
        <defs>
          <clipPath id="eye-l">
            <ellipse cx="98" cy="118" rx="11" ry="12.5" />
          </clipPath>
          <clipPath id="eye-r">
            <ellipse cx="142" cy="118" rx="11" ry="12.5" />
          </clipPath>
        </defs>

        {/* backdrop */}
        <circle cx="120" cy="120" r="114" fill="var(--accent-soft)" />
        <circle cx="120" cy="120" r="114" fill="none" stroke="var(--line)" strokeWidth="1.5" />

        {/* shoulders */}
        <path d="M24 226C28 188 66 174 120 174s92 14 96 52a114 114 0 0 1-192 0z" fill="var(--accent)" />
        <path d="M96 168h48v26c-10 10-38 10-48 0z" fill={SKIN_SHADE} />

        {/* head group (moves + tilts toward the cursor) */}
        <g ref={headRef}>
          {/* ears */}
          <ellipse cx="62" cy="124" rx="9" ry="14" fill={SKIN} />
          <ellipse cx="178" cy="124" rx="9" ry="14" fill={SKIN} />
          {/* face */}
          <ellipse cx="120" cy="120" rx="58" ry="66" fill={SKIN} />
          {/* cheeks */}
          <circle cx="86" cy="142" r="10" fill="#ef9a86" opacity="0.4" />
          <circle cx="154" cy="142" r="10" fill="#ef9a86" opacity="0.4" />

          {/* eyes: whites stay, irises look at the cursor */}
          <g className="blink">
            <ellipse cx="98" cy="118" rx="11" ry="12.5" fill="#fff" />
            <ellipse cx="142" cy="118" rx="11" ry="12.5" fill="#fff" />
            <g ref={eyesRef}>
              <g clipPath="url(#eye-l)">
                <circle cx="98" cy="118" r="7.2" fill="#4a3024" />
                <circle cx="98" cy="118" r="3.4" fill="#16100c" />
                <circle cx="95.6" cy="115.2" r="1.9" fill="#fff" />
              </g>
              <g clipPath="url(#eye-r)">
                <circle cx="142" cy="118" r="7.2" fill="#4a3024" />
                <circle cx="142" cy="118" r="3.4" fill="#16100c" />
                <circle cx="139.6" cy="115.2" r="1.9" fill="#fff" />
              </g>
            </g>
          </g>

          {/* brows */}
          <g ref={browsRef} fill="none" stroke={HAIR} strokeWidth="4" strokeLinecap="round">
            <path d="M83 98q15-9 30-1" />
            <path d="M127 97q15-8 30 1" />
          </g>

          {/* nose */}
          <path
            d="M120 128q-5 11 0 14 5-1 7-4"
            fill="none"
            stroke={SKIN_SHADE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* smile */}
          <g ref={mouthRef}>
            <path
              d="M102 160q20 16 40-2"
              fill="none"
              stroke="#a4503e"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          </g>

          {/* hair (moves slightly more than the face for depth) */}
          <g ref={hairRef}>
            <path
              d="M60 120C50 64 84 36 124 38c42 2 70 30 60 82-4-18-10-32-26-40-18 10-52 8-70-8-14 12-24 30-28 48z"
              fill={HAIR}
            />
            <path
              d="M70 64c18-22 66-30 96-8"
              fill="none"
              stroke="#5a4236"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
