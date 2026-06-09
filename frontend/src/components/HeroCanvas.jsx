import { useRef, useEffect } from 'react';

// ============================================================
// HeroCanvas — cursor-reactive "constellation" background
// Ported from the design handoff (constellation mode).
//   intensity: 0..100   accent: hex (defaults to the --brand-highlight token)
// ============================================================

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function resolveAccent(accent) {
    if (accent) return accent;
    if (typeof window !== 'undefined') {
        const v = getComputedStyle(document.documentElement)
            .getPropertyValue('--brand-highlight')
            .trim();
        if (v) return v;
    }
    return '#5be2e6';
}

export default function HeroCanvas({ intensity = 70, accent, className }) {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -9999, y: -9999, active: false });
    const stateRef = useRef({});

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf, W, H, dpr;
        const [ar, ag, ab] = hexToRgb(resolveAccent(accent));
        const k = Math.max(0, Math.min(100, intensity)) / 100; // 0..1

        function init() {
            const density = 0.00012;
            const count = Math.round(W * H * density * (0.5 + k));
            stateRef.current.parts = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * (0.12 + k * 0.5),
                vy: (Math.random() - 0.5) * (0.12 + k * 0.5),
                r: Math.random() * 2 + 0.8,
                tw: Math.random() * Math.PI * 2,
            }));
        }

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = canvas.clientWidth;
            H = canvas.clientHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            init();
        }

        function drawConstellation(t) {
            ctx.clearRect(0, 0, W, H);
            const ps = stateRef.current.parts;
            const linkDist = 130;
            const mx = mouse.current.x, my = mouse.current.y;
            // links
            for (let i = 0; i < ps.length; i++) {
                const p = ps[i];
                for (let j = i + 1; j < ps.length; j++) {
                    const q = ps[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < linkDist * linkDist) {
                        const a = (1 - Math.sqrt(d2) / linkDist) * 0.22;
                        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${a})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
                    }
                }
            }
            for (const p of ps) {
                // cursor repel
                if (mouse.current.active) {
                    const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
                    if (d < 150 && d > 0.1) {
                        const f = (150 - d) / 150 * 1.4;
                        p.x += (dx / d) * f; p.y += (dy / d) * f;
                        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${(150 - d) / 150 * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke();
                    }
                }
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x += W; if (p.x > W) p.x -= W;
                if (p.y < 0) p.y += H; if (p.y > H) p.y -= H;
                const tw = 0.55 + Math.sin(t * 0.002 + p.tw) * 0.45;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${ar},${ag},${ab},${tw})`;
                ctx.shadowBlur = 8; ctx.shadowColor = `rgba(${ar},${ag},${ab},0.8)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            // cursor glow
            if (mouse.current.active) {
                const g = ctx.createRadialGradient(mx, my, 0, mx, my, 170);
                g.addColorStop(0, `rgba(${ar},${ag},${ab},0.10)`);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(mx - 170, my - 170, 340, 340);
            }
        }

        function frame(t) {
            drawConstellation(t);
            if (!reduce) raf = requestAnimationFrame(frame);
        }

        resize();
        frame(0);
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, [intensity, accent]);

    // pointer tracking mapped to canvas coords
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        function move(e) {
            const r = canvas.getBoundingClientRect();
            const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
            const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
            mouse.current = { x: cx, y: cy, active: cx >= 0 && cy >= 0 && cx <= r.width && cy <= r.height };
        }
        function leave() { mouse.current.active = false; }
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerleave', leave);
        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerleave', leave);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
}
