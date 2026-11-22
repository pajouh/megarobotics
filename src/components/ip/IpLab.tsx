'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Link2, Pause, Play } from 'lucide-react'

// Interactive IP code decoder for /ip-ratings: two digit wheels, a canvas
// simulation of what the code keeps out, the readout for both digits, quick
// picks and the 7 × 10 matrix. All copy arrives localized from
// src/data/ip-ratings.ts. A link to #decode-67 (or #decode-x7) anywhere opens
// the lab on that code.

export interface DigitInfo {
  name: string
  summary: string
  detail: string
  test: string
  sim?: string
}

export interface LabLabels {
  solidLabel: string
  liquidLabel: string
  up: string
  down: string
  meansLabel: string
  testLabel: string
  quickLabel: string
  matrixTitle: string
  matrixLead: string
  matrixRow: string
  matrixCol: string
  legendBlocked: string
  legendIn: string
  legendWater: string
  pause: string
  play: string
  copy: string
  copied: string
  simAlt: string
  details: string
  solidClasses: string[]
  untested: string
}

interface Props {
  solids: Record<string, DigitInfo>
  liquids: Record<string, DigitInfo>
  solidKeys: readonly string[]
  liquidKeys: readonly string[]
  common: readonly string[]
  labels: LabLabels
}

const TEAL = '#2fe0d0'
const ORANGE = '#f97316'
const RED = '#f87171'
const WATER = '#6cc9ff'

type Particle = {
  kind: 'solid' | 'drop' | 'spark' | 'steam' | 'bubble'
  x: number
  y: number
  vx: number
  vy: number
  r: number
  cls: number
  life: number
  state: 'fly' | 'in' | 'out'
  hot?: boolean
}

// Solid classes shown in the simulation, largest first: hand, finger, tool, wire, dust.
const CLASS_R = [15, 9, 5, 3, 1.3]
const CLASS_WEIGHT = [0.06, 0.1, 0.14, 0.2, 0.5]

export default function IpLab({ solids, liquids, solidKeys, liquidKeys, common, labels }: Props) {
  const [s, setS] = useState('6')
  const [w, setW] = useState('7')
  const [running, setRunning] = useState(true)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const code = useRef({ s: '6', w: '7' })
  const runRef = useRef(true)

  useEffect(() => {
    code.current = { s, w }
  }, [s, w])
  useEffect(() => {
    runRef.current = running
  }, [running])

  // #decode-67 deep links
  useEffect(() => {
    const fromHash = () => {
      const m = /^#decode-([0-6x])([0-9x])$/i.exec(window.location.hash)
      if (!m) return
      setS(m[1].toUpperCase())
      setW(m[2].toUpperCase())
      document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  const stepKey = useCallback((keys: readonly string[], cur: string, d: number) => {
    const i = keys.indexOf(cur)
    return keys[(i + d + keys.length) % keys.length]
  }, [])

  // ---- simulation
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let raf = 0
    let visible = true
    let last = performance.now()
    let t = 0
    let flash = 0
    let level = 0 // water surface y for the immersion modes
    let lastW = ''
    let parts: Particle[] = []

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = wrap.clientWidth
      H = wrap.clientHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      level = H + 10
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(wrap)

    const box = () => {
      const bw = Math.min(W * 0.3, 200)
      const bh = bw * 0.7
      const cx = W * 0.56
      const cy = H * 0.57
      return { l: cx - bw / 2, r: cx + bw / 2, t: cy - bh / 2, b: cy + bh / 2, cx, cy, bw, bh }
    }

    const add = (p: Particle) => {
      if (parts.length < 460) parts.push(p)
    }
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)

    const spawnSolid = (b: ReturnType<typeof box>) => {
      let x = Math.random()
      let cls = 0
      for (let i = 0; i < CLASS_WEIGHT.length; i++) {
        if (x < CLASS_WEIGHT[i]) {
          cls = i
          break
        }
        x -= CLASS_WEIGHT[i]
        cls = i
      }
      add({ kind: 'solid', x: -20, y: rnd(b.t + 6, b.b - 6), vx: rnd(70, 130), vy: rnd(-8, 8), r: CLASS_R[cls], cls, life: 1, state: 'fly' })
    }

    const drop = (x: number, y: number, vx: number, vy: number, r = 1.6, hot = false) =>
      add({ kind: 'drop', x, y, vx, vy, r, cls: 0, life: 1, state: 'fly', hot })

    const spawnWater = (mode: string, b: ReturnType<typeof box>, dt: number) => {
      const n = (rate: number) => {
        const f = rate * dt
        return Math.floor(f) + (Math.random() < f % 1 ? 1 : 0)
      }
      if (mode === '0' || mode === '1') for (let i = n(34); i--; ) drop(rnd(b.l - 70, b.r + 70), -6, 0, rnd(230, 280))
      else if (mode === '2') for (let i = n(60); i--; ) drop(rnd(b.l - 150, b.r + 30), -6, 70, rnd(240, 280))
      else if (mode === '3')
        for (let i = n(80); i--; ) {
          const a = rnd(-1.05, 1.05)
          drop(b.cx, 14, Math.sin(a) * 300, Math.cos(a) * 300)
        }
      else if (mode === '4')
        for (let i = n(110); i--; ) {
          const a = rnd(0, Math.PI * 2)
          const R = Math.max(b.bw, b.bh) * 1.25
          const x = b.cx + Math.cos(a) * R
          const y = b.cy + Math.sin(a) * R * 0.8
          const j = rnd(-0.25, 0.25)
          drop(x, y, -Math.cos(a + j) * 290, -Math.sin(a + j) * 290)
        }
      else if (mode === '5') for (let i = n(260); i--; ) drop(W + 4, b.cy - 6 + rnd(-3, 3), rnd(-560, -500), rnd(-22, 22), 1.5)
      else if (mode === '6') for (let i = n(520); i--; ) drop(W + 4, b.cy - 6 + rnd(-7, 7), rnd(-820, -720), rnd(-40, 40), 2.2)
      else if (mode === '9') {
        const k = Math.floor(t / 1.4) % 4
        const a = (k * 30 * Math.PI) / 180 // 0°, 30°, 60°, 90° above the horizontal
        const d = Math.max(b.bw, b.bh) * 0.5 + 58
        const nx = b.cx + Math.cos(a) * d
        const ny = b.cy - Math.sin(a) * d * 0.9
        for (let i = n(420); i--; ) {
          const j = rnd(-0.16, 0.16)
          drop(nx, ny, -Math.cos(a + j) * 900, Math.sin(a + j) * 900, 1.4, true)
        }
        nozzle = { x: nx, y: ny, a }
      }
    }
    let nozzle: { x: number; y: number; a: number } | null = null

    const step = (dt: number) => {
      t += dt
      const { s: cs, w: cw } = code.current
      const b = box()
      const m = 9 // shield margin
      if (cw !== lastW) {
        lastW = cw
        level = H + 10
        nozzle = null
        parts = parts.filter((p) => p.kind === 'solid')
      }
      if (cs !== 'X' && Math.random() < dt * 9) spawnSolid(b)
      if (cw !== 'X') spawnWater(cw, b, dt)
      if (cw === '7' || cw === '8') {
        const target = cw === '7' ? b.t - 46 : -12
        level += (target - level) * Math.min(1, dt * 1.6)
        if (Math.random() < dt * 10) add({ kind: 'bubble', x: rnd(b.l, b.r), y: b.t - 2, vx: rnd(-6, 6), vy: rnd(-70, -40), r: rnd(1.2, 3), cls: 0, life: 1, state: 'fly' })
      }
      flash = Math.max(0, flash - dt * 2.4)
      const solidLevel = cs === 'X' ? -1 : Number(cs)

      for (const p of parts) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.kind === 'spark' || p.kind === 'steam') {
          p.life -= dt * (p.kind === 'steam' ? 0.9 : 2.6)
          if (p.kind === 'spark') p.vy += 500 * dt
          continue
        }
        if (p.kind === 'bubble') {
          if (p.y < level + 3) p.life = 0
          continue
        }
        if (p.state === 'in') {
          p.vx *= 1 - dt * 3
          p.vy *= 1 - dt * 3
          p.life -= dt * 0.55
          continue
        }
        if (p.state === 'out') {
          p.life -= dt * 1.1
          if (p.kind === 'solid') p.vy += 260 * dt
          continue
        }
        const hit = p.x + p.r > b.l - m && p.x - p.r < b.r + m && p.y + p.r > b.t - m && p.y - p.r < b.b + m
        if (!hit) continue
        if (p.kind === 'solid') {
          // class k (0 = hand … 4 = dust) is kept out from level k + 1 upward; level 5 lets a little dust through
          const blocked = solidLevel >= p.cls + 1 && !(p.cls === 4 && solidLevel === 5 && Math.random() < 0.1)
          if (blocked) {
            p.state = 'out'
            p.vx = -Math.abs(p.vx) * rnd(0.5, 0.9)
            p.vy = rnd(-90, 30)
            flash = Math.min(1, flash + 0.25 + p.r / 30)
            for (let i = 0; i < Math.min(5, 1 + p.r / 3); i++) add({ kind: 'spark', x: b.l - m, y: p.y, vx: rnd(-140, -30), vy: rnd(-120, 60), r: 1.2, cls: 0, life: 1, state: 'fly' })
          } else if (p.x > b.l + p.r) p.state = 'in'
        } else {
          if (cw === '0') {
            if (p.y > b.t + 2) p.state = 'in'
          } else {
            p.life = 0
            flash = Math.min(1, flash + 0.02)
            if (Math.random() < 0.5) add({ kind: 'spark', x: p.x, y: p.y, vx: -p.vx * rnd(0.08, 0.2) + rnd(-50, 50), vy: -Math.abs(p.vy) * rnd(0.1, 0.25) - 30, r: 1, cls: 1, life: 0.8, state: 'fly' })
            if (p.hot && Math.random() < 0.12) add({ kind: 'steam', x: p.x, y: p.y, vx: rnd(-20, 20), vy: rnd(-60, -25), r: rnd(5, 11), cls: 0, life: 1, state: 'fly' })
          }
        }
      }
      parts = parts.filter((p) => p.life > 0 && p.x > -60 && p.x < W + 60 && p.y < H + 40 && p.y > -80)
    }

    const rr = (x: number, y: number, w2: number, h2: number, r: number) => {
      ctx.beginPath()
      ctx.roundRect(x, y, w2, h2, r)
    }

    const draw = () => {
      const { s: cs, w: cw } = code.current
      const b = box()
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, '#0a161a')
      g.addColorStop(1, '#0d1f25')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
      // grid
      ctx.strokeStyle = 'rgba(47,224,208,0.07)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = (t * 12) % 36; x < W; x += 36) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
      }
      for (let y = 0; y < H; y += 36) {
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
      }
      ctx.stroke()

      // immersion
      if (cw === '7' || cw === '8') {
        const wg = ctx.createLinearGradient(0, level, 0, H)
        wg.addColorStop(0, 'rgba(108,201,255,0.30)')
        wg.addColorStop(1, cw === '8' ? 'rgba(20,70,130,0.55)' : 'rgba(40,120,190,0.40)')
        ctx.fillStyle = wg
        ctx.beginPath()
        ctx.moveTo(0, H)
        for (let x = 0; x <= W; x += 12) ctx.lineTo(x, level + Math.sin(x / 38 + t * 2.2) * 3)
        ctx.lineTo(W, H)
        ctx.closePath()
        ctx.fill()
        if (cw === '7' && level < b.t) {
          // depth mark: surface to the lowest point of the enclosure
          const x = b.r + 34
          ctx.strokeStyle = 'rgba(255,255,255,0.7)'
          ctx.beginPath()
          ctx.moveTo(x, level)
          ctx.lineTo(x, b.b)
          ctx.moveTo(x - 5, level)
          ctx.lineTo(x + 5, level)
          ctx.moveTo(x - 5, b.b)
          ctx.lineTo(x + 5, b.b)
          ctx.stroke()
          ctx.fillStyle = '#fff'
          ctx.font = '600 12px ui-monospace, SFMono-Regular, Menlo, monospace'
          ctx.fillText('1 m', x + 9, (level + b.b) / 2 + 4)
        }
        if (cw === '8') {
          ctx.strokeStyle = 'rgba(108,201,255,0.35)'
          for (let i = 0; i < 3; i++) {
            const k = ((t * 0.5 + i / 3) % 1) * 46
            rr(b.l - 12 - k, b.t - 12 - k, b.bw + 24 + 2 * k, b.bh + 24 + 2 * k, 18 + k)
            ctx.globalAlpha = 1 - k / 46
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
      }

      // nozzles
      ctx.fillStyle = '#c9d6da'
      if (cw === '3') {
        rr(b.cx - 9, 2, 18, 14, 3)
        ctx.fill()
      }
      if (cw === '5' || cw === '6') {
        const h2 = cw === '6' ? 22 : 14
        rr(W - 16, b.cy - 6 - h2 / 2, 16, h2, 3)
        ctx.fill()
      }
      if (cw === '9' && nozzle) {
        ctx.save()
        ctx.translate(nozzle.x, nozzle.y)
        ctx.rotate(-nozzle.a)
        rr(0, -6, 22, 12, 3)
        ctx.fillStyle = ORANGE
        ctx.fill()
        ctx.restore()
      }

      // enclosure + shield
      ctx.save()
      ctx.shadowColor = TEAL
      ctx.shadowBlur = 14 + flash * 30
      ctx.strokeStyle = `rgba(47,224,208,${0.35 + flash * 0.65})`
      ctx.lineWidth = 1.5 + flash * 1.5
      rr(b.l - 9, b.t - 9, b.bw + 18, b.bh + 18, 16)
      ctx.stroke()
      ctx.restore()
      rr(b.l, b.t, b.bw, b.bh, 10)
      ctx.fillStyle = '#122a31'
      ctx.fill()
      ctx.strokeStyle = 'rgba(232,241,242,0.35)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = 'rgba(232,241,242,0.92)'
      ctx.font = `700 ${Math.round(b.bh * 0.3)}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`IP${cs}${cw}`, b.cx, b.cy)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'

      // particles
      for (const p of parts) {
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life))
        if (p.kind === 'solid') {
          ctx.fillStyle = p.state === 'in' ? RED : p.state === 'out' ? TEAL : '#d7c9a8'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, 6.283)
          ctx.fill()
        } else if (p.kind === 'drop') {
          ctx.strokeStyle = p.state === 'in' ? RED : p.hot ? '#ffd9b0' : WATER
          ctx.lineWidth = p.r
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.vx * 0.022, p.y - p.vy * 0.022)
          ctx.stroke()
        } else if (p.kind === 'spark') {
          ctx.fillStyle = p.cls ? WATER : ORANGE
          ctx.fillRect(p.x, p.y, 2, 2)
        } else if (p.kind === 'steam') {
          ctx.fillStyle = 'rgba(255,255,255,0.10)'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * (2 - p.life), 0, 6.283)
          ctx.fill()
        } else {
          ctx.strokeStyle = 'rgba(255,255,255,0.7)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, 6.283)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    const frame = (now: number) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      if (visible && runRef.current) step(dt)
      if (visible) draw()
      raf = requestAnimationFrame(frame)
    }
    if (reduce) {
      for (let i = 0; i < 90; i++) step(0.033)
      draw()
      const redraw = () => {
        for (let i = 0; i < 90; i++) step(0.033)
        draw()
      }
      canvas.addEventListener('ip-redraw', redraw)
      return () => {
        canvas.removeEventListener('ip-redraw', redraw)
        ro.disconnect()
        io.disconnect()
      }
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  // with reduced motion the canvas only repaints when the code changes
  useEffect(() => {
    canvasRef.current?.dispatchEvent(new Event('ip-redraw'))
  }, [s, w])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#decode-${s}${w}`.toLowerCase())
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard not available */
    }
  }

  const wheel = (value: string, keys: readonly string[], set: (v: string) => void, label: string, tone: string) => (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => set(stepKey(keys, value, 1))}
        aria-label={`${label}: ${labels.up}`}
        className="grid h-11 w-14 place-items-center rounded-t-xl border border-b-0 sm:w-20 border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      <div
        role="spinbutton"
        tabIndex={0}
        aria-label={label}
        aria-valuetext={value}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            set(stepKey(keys, value, 1))
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            set(stepKey(keys, value, -1))
          }
        }}
        className="grid h-24 w-14 place-items-center overflow-hidden border border-white/15 bg-black/40 [perspective:400px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--mr-accent-glow)] sm:h-28 sm:w-20"
      >
        <span key={value} className={`ipx-flip font-[family-name:var(--font-display)] text-6xl font-semibold leading-none sm:text-7xl ${tone}`}>
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={() => set(stepKey(keys, value, -1))}
        aria-label={`${label}: ${labels.down}`}
        className="grid h-11 w-14 place-items-center rounded-b-xl border border-t-0 border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:w-20"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  )

  const sInfo = solids[s]
  const wInfo = liquids[w]

  return (
    <div>
      <div className="overflow-hidden rounded-[var(--mr-radius)] border border-white/10 bg-[#0b171b] text-white shadow-[0_40px_80px_-40px_rgba(4,80,76,0.55)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_1fr]">
          {/* controls */}
          <div className="flex flex-col items-center gap-6 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-[family-name:var(--font-display)] text-5xl font-semibold text-white/55 sm:text-6xl">IP</span>
              {wheel(s, solidKeys, setS, labels.solidLabel, 'text-[#fdba74]')}
              {wheel(w, liquidKeys, setW, labels.liquidLabel, 'text-[color:var(--mr-accent-glow)]')}
            </div>
            <p aria-live="polite" className="text-center text-sm leading-relaxed text-white/85">
              <span className="font-semibold text-white">IP{s}{w}:</span> {sInfo.summary}; {wInfo.summary}.
            </p>
            <div className="w-full">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">{labels.quickLabel}</div>
              <div className="flex flex-wrap gap-2">
                {common.map((c) => {
                  const on = c[0] === s && c[1] === w
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setS(c[0])
                        setW(c[1])
                      }}
                      className={`min-h-[36px] rounded-full border px-3 font-mono text-xs transition-colors ${
                        on ? 'border-[#f97316] bg-[#f97316] text-[#1a0d02]' : 'border-white/20 text-white/85 hover:border-white/50'
                      }`}
                    >
                      IP{c}
                    </button>
                  )
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-full border border-white/20 px-4 text-xs font-medium text-white/85 transition-colors hover:border-white/50"
            >
              <Link2 className="h-4 w-4" aria-hidden="true" />
              <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
            </button>
          </div>

          {/* simulation */}
          <div className="relative">
            <div ref={wrapRef} className="relative h-[300px] w-full sm:h-[380px] lg:h-full lg:min-h-[440px]">
              <canvas ref={canvasRef} role="img" aria-label={`${labels.simAlt}: IP${s}${w}`} className="absolute inset-0 h-full w-full" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-3 sm:p-4">
              <div className="rounded-md bg-black/55 px-2.5 py-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-white/90 backdrop-blur-sm sm:text-[11px]">
                <div className="text-[#fdba74]">IP{s}X · {s === 'X' ? labels.untested : sInfo.name}</div>
                <div className="text-[color:var(--mr-accent-glow)]">IPX{w} · {wInfo.sim ?? wInfo.name}</div>
              </div>
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                aria-label={running ? labels.pause : labels.play}
                className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/75"
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-x-4 gap-y-1 p-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/80 sm:p-4">
              <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#2fe0d0]" />{labels.legendBlocked}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#f87171]" />{labels.legendIn}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#6cc9ff]" />{labels.legendWater}</span>
              <span className="ml-auto hidden text-white/50 sm:inline">{labels.solidClasses.join(' · ')}</span>
            </div>
          </div>
        </div>

        {/* readout */}
        <div className="grid grid-cols-1 gap-px border-t border-white/10 bg-white/10 md:grid-cols-2">
          {[
            { key: `s${s}`, tone: 'text-[#fdba74]', head: `${labels.solidLabel} · ${s}`, info: sInfo, href: '#solids' },
            { key: `w${w}`, tone: 'text-[color:var(--mr-accent-glow)]', head: `${labels.liquidLabel} · ${w}`, info: wInfo, href: '#water' },
          ].map((c) => (
            <div key={c.key} className="ipx-fade bg-[#0b171b] p-6 sm:p-8">
              <div className={`font-mono text-[11px] uppercase tracking-[0.14em] ${c.tone}`}>{c.head}</div>
              <h3 className="mt-2 text-xl font-semibold text-white">{c.info.name}</h3>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">{labels.meansLabel}</dt>
                  <dd className="mt-1 text-white/90">{c.info.detail}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">{labels.testLabel}</dt>
                  <dd className="mt-1 text-white/90">{c.info.test}</dd>
                </div>
              </dl>
              <a href={c.href} className="mt-4 inline-block text-xs font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline">
                {labels.details} →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* matrix */}
      <div className="mt-14">
        <h3 className="text-xl md:text-2xl font-semibold text-[color:var(--mr-ink)]">{labels.matrixTitle}</h3>
        <p className="mt-2 max-w-3xl text-sm text-[color:var(--mr-ink-2)]">{labels.matrixLead}</p>
        <div className="mt-6 overflow-x-auto pb-2">
          <table className="min-w-[640px] w-full border-separate border-spacing-1 text-center font-mono text-xs">
            <thead>
              <tr>
                <th className="w-24 px-2 py-1 text-left text-[10px] font-medium uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">
                  {labels.matrixRow} ↓ · {labels.matrixCol} →
                </th>
                {liquidKeys.filter((k) => k !== 'X').map((k) => (
                  <th key={k} scope="col" className="px-1 py-1 font-semibold text-[color:var(--mr-accent-ink)]">
                    X{k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solidKeys.filter((k) => k !== 'X').map((sk) => (
                <tr key={sk}>
                  <th scope="row" className="px-2 py-1 text-left font-semibold text-[color:var(--mr-orange-ink)]">
                    {sk}X
                  </th>
                  {liquidKeys.filter((k) => k !== 'X').map((wk) => {
                    const c = `${sk}${wk}`
                    const on = sk === s && wk === w
                    const isCommon = common.includes(c)
                    return (
                      <td key={wk}>
                        <button
                          type="button"
                          aria-pressed={on}
                          title={`IP${c}: ${solids[sk].summary}; ${liquids[wk].summary}`}
                          onClick={() => {
                            setS(sk)
                            setW(wk)
                            document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                          className={`h-10 w-full rounded-md border text-[11px] transition-all hover:-translate-y-0.5 ${
                            on
                              ? 'border-[color:var(--mr-orange-ink)] bg-[color:var(--mr-orange-ink)] font-semibold text-white'
                              : isCommon
                                ? 'border-[color:var(--mr-accent-line)] bg-[color:var(--mr-accent-soft)] font-semibold text-[color:var(--mr-accent-ink)]'
                                : 'border-[color:var(--mr-line)] bg-[color:var(--mr-white)] text-[color:var(--mr-steel)] hover:border-[color:var(--mr-accent-line)]'
                          }`}
                        >
                          {c}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
