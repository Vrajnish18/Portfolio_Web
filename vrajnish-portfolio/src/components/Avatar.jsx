import React, { useEffect, useRef } from 'react'

/**
 * Dotted 3D globe with animated arcs.
 * Pure canvas + React. No external libraries.
 *
 * The land shape comes from a small land-mask image loaded at runtime
 * (not an npm package). If it fails to load, the globe falls back to
 * dots over the whole sphere.
 */

const LAND_MAP =
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'

const DEG = Math.PI / 180

// [lat, lng]
const CITIES = [
  [28.6, 77.2], // Delhi
  [19.1, 72.9], // Mumbai
  [12.97, 77.6], // Bengaluru
  [51.5, -0.1], // London
  [48.9, 2.35], // Paris
  [52.5, 13.4], // Berlin
  [55.8, 37.6], // Moscow
  [25.2, 55.3], // Dubai
  [1.35, 103.8], // Singapore
  [35.7, 139.7], // Tokyo
  [37.6, 127.0], // Seoul
  [39.9, 116.4], // Beijing
  [-33.9, 151.2], // Sydney
  [40.7, -74.0], // New York
  [43.7, -79.4], // Toronto
  [37.8, -122.4], // San Francisco
  [-23.5, -46.6], // Sao Paulo
  [-34.6, -58.4], // Buenos Aires
  [-1.3, 36.8], // Nairobi
  [30.0, 31.2], // Cairo
]

const toVec = (lat, lng) => {
  const phi = lat * DEG
  const lam = lng * DEG
  return [Math.cos(phi) * Math.sin(lam), Math.sin(phi), Math.cos(phi) * Math.cos(lam)]
}

// Evenly spaced dot grid over the sphere, optionally filtered by a land mask.
const buildPoints = (rows, isLand) => {
  const out = []
  for (let i = 0; i < rows; i++) {
    const lat = -90 + ((i + 0.5) * 180) / rows
    const n = Math.max(1, Math.round(Math.cos(lat * DEG) * rows * 2))
    for (let j = 0; j < n; j++) {
      const lng = -180 + ((j + 0.5) * 360) / n
      if (!isLand || isLand(lat, lng)) {
        const [x, y, z] = toVec(lat, lng)
        out.push(x, y, z)
      }
    }
  }
  return new Float32Array(out)
}

const randInt = (n) => Math.floor(Math.random() * n)

const makeArc = (t0) => {
  let i, j, omega, a, b
  do {
    i = randInt(CITIES.length)
    j = randInt(CITIES.length)
    a = toVec(...CITIES[i])
    b = toVec(...CITIES[j])
    const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
    omega = Math.acos(dot)
  } while (i === j || omega < 0.4 || omega > 3.0)
  return {
    a,
    b,
    omega,
    sinO: Math.sin(omega),
    lift: 0.1 + (0.3 * omega) / Math.PI,
    t0,
  }
}

const Avatar = ({
  primaryColor = '#ff7a45', // arcs
  neutralColor = '#9ca3af', // dots + atmosphere
  autoRotateSpeed = 0.85, // 0 = no rotation
  arcCount = 8,
  arcInterval = 6000, // ms between an arc's restarts
  arcDuration = 2500, // ms for one arc to draw + fade
  pointSize = 1, // dot size multiplier
  landRows = 90, // dot density (higher = more dots)
  showAtmosphere = true,
  interactive = true, // drag horizontally to spin
  className,
}) => {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const pointsRef = useRef(null)

  // 1) Build the dot grid (once).
  useEffect(() => {
    let cancelled = false
    pointsRef.current = buildPoints(landRows, null) // fallback: full sphere until the mask loads

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (cancelled) return
      try {
        const w = img.naturalWidth
        const h = img.naturalHeight
        const c = document.createElement('canvas')
        c.width = w
        c.height = h
        const cctx = c.getContext('2d', { willReadFrequently: true })
        cctx.drawImage(img, 0, 0)
        const data = cctx.getImageData(0, 0, w, h).data
        const isLand = (lat, lng) => {
          const px = Math.min(w - 1, Math.floor(((lng + 180) / 360) * w))
          const py = Math.min(h - 1, Math.floor(((90 - lat) / 180) * h))
          return data[(py * w + px) * 4] > 40
        }
        const pts = buildPoints(landRows, isLand)
        const total = buildPoints(landRows, null).length
        const ratio = pts.length / total
        // Sanity check: if the mask looks wrong (all or nothing), keep the full sphere.
        if (ratio > 0.05 && ratio < 0.8) pointsRef.current = pts
      } catch {
        /* keep fallback */
      }
    }
    img.src = LAND_MAP

    return () => {
      cancelled = true
    }
  }, [landRows])

  // 2) Render loop.
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')

    let size = 0
    let dpr = 1
    let raf = 0
    let last = performance.now()
    let yaw = -78 * DEG // start facing roughly India
    const tilt = 0.35
    let dragging = false
    let lastX = 0

    const now0 = performance.now()
    let arcs = Array.from({ length: arcCount }, () =>
      makeArc(now0 + Math.random() * arcInterval)
    )

    const resize = () => {
      size = wrap.clientWidth
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(size * dpr)
      canvas.height = Math.round(size * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const sx = Math.sin(tilt)
    const cxT = Math.cos(tilt)
    const out = { x: 0, y: 0, z: 0 }
    const rot = (x, y, z, cyaw, syaw) => {
      const x1 = x * cyaw + z * syaw
      const z1 = -x * syaw + z * cyaw
      out.x = x1
      out.y = y * cxT - z1 * sx
      out.z = y * sx + z1 * cxT
    }

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!dragging) yaw += autoRotateSpeed * 0.15 * dt

      const cyaw = Math.cos(yaw)
      const syaw = Math.sin(yaw)
      const R = size * 0.42
      const cx = size / 2
      const cy = size / 2

      ctx.clearRect(0, 0, size, size)

      // Soft sphere body
      ctx.globalAlpha = 0.05
      ctx.fillStyle = neutralColor
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      // Atmosphere glow
      if (showAtmosphere) {
        ctx.save()
        ctx.globalAlpha = 0.35
        ctx.shadowColor = neutralColor
        ctx.shadowBlur = R * 0.18
        ctx.strokeStyle = neutralColor
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(cx, cy, R, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Dots
      const pts = pointsRef.current
      if (pts) {
        const s = Math.max(0.8, size * 0.0042 * pointSize)
        ctx.fillStyle = neutralColor
        for (let i = 0; i < pts.length; i += 3) {
          rot(pts[i], pts[i + 1], pts[i + 2], cyaw, syaw)
          const px = cx + out.x * R
          const py = cy - out.y * R
          if (out.z > 0) {
            ctx.globalAlpha = 0.25 + 0.75 * out.z
            ctx.beginPath()
            ctx.arc(px, py, s * 0.5, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.globalAlpha = 0.07
            ctx.fillRect(px - s * 0.35, py - s * 0.35, s * 0.7, s * 0.7)
          }
        }
      }

      // Arcs
      ctx.strokeStyle = primaryColor
      ctx.fillStyle = primaryColor
      ctx.lineCap = 'round'
      const SEG = 48

      for (let k = 0; k < arcs.length; k++) {
        let arc = arcs[k]
        let local = now - arc.t0
        if (local > arcInterval) {
          arc = arcs[k] = makeArc(now + Math.random() * 400)
          local = now - arc.t0
        }
        if (local < 0) continue
        const p = local / arcDuration
        if (p >= 1) continue

        const head = Math.min(1, p * 2)
        const tail = Math.max(0, p * 2 - 1)
        if (head <= tail) continue

        const pointAt = (t) => {
          const s1 = Math.sin((1 - t) * arc.omega) / arc.sinO
          const s2 = Math.sin(t * arc.omega) / arc.sinO
          const r = 1 + arc.lift * Math.sin(Math.PI * t)
          rot(
            (arc.a[0] * s1 + arc.b[0] * s2) * r,
            (arc.a[1] * s1 + arc.b[1] * s2) * r,
            (arc.a[2] * s1 + arc.b[2] * s2) * r,
            cyaw,
            syaw
          )
        }
        const visible = () => out.z > 0 || out.x * out.x + out.y * out.y > 1

        let prev = null
        for (let i = 0; i <= SEG; i++) {
          const t = tail + ((head - tail) * i) / SEG
          pointAt(t)
          const cur = { x: cx + out.x * R, y: cy - out.y * R, v: visible() }
          if (prev && prev.v && cur.v) {
            const f = i / SEG // brighter toward the head
            ctx.globalAlpha = 0.12 + 0.2 * f
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(cur.x, cur.y)
            ctx.stroke()
            ctx.globalAlpha = 0.25 + 0.75 * f
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(cur.x, cur.y)
            ctx.stroke()
          }
          prev = cur
        }

        // Endpoint markers
        const drawMarker = (v, pulse) => {
          rot(v[0], v[1], v[2], cyaw, syaw)
          if (out.z <= 0) return
          const px = cx + out.x * R
          const py = cy - out.y * R
          ctx.globalAlpha = 0.9
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fill()
          if (pulse > 0) {
            ctx.globalAlpha = (1 - pulse) * 0.6
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.arc(px, py, 3 + pulse * 10, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
        drawMarker(arc.a, 0)
        if (head >= 1) drawMarker(arc.b, Math.min(1, (p * 2 - 1) * 1.2))
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    // Drag to spin
    const down = (e) => {
      if (!interactive) return
      dragging = true
      lastX = e.clientX
      canvas.setPointerCapture?.(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!dragging) return
      yaw += (e.clientX - lastX) * 0.006
      lastX = e.clientX
    }
    const up = () => {
      dragging = false
      canvas.style.cursor = interactive ? 'grab' : 'default'
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [
    primaryColor,
    neutralColor,
    autoRotateSpeed,
    arcCount,
    arcInterval,
    arcDuration,
    pointSize,
    showAtmosphere,
    interactive,
  ])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: '100%', maxWidth: 480, aspectRatio: '1 / 1', margin: '0 auto' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: interactive ? 'grab' : 'default',
          touchAction: 'pan-y',
        }}
      />
    </div>
  )
}

export default Avatar