import type { CSSProperties } from "react";

/**
 * Hand-authored, illustrative price series used to teach structure, levels and
 * trade planning. It is not market data and shows no outcome.
 */
const closes = [72, 68, 70, 64, 60, 62, 57, 52, 55, 50, 46, 48, 44, 47, 45, 49, 52, 50, 55, 58, 54, 57, 61, 59, 62];
const wick = [1.6, 2.4, 1.1, 2.9, 1.8, 2.2, 1.3];

const W = 640;
const H = 380;
const PAD_L = 18;
const PLOT_R = 470; // candles stop here; the plan projects into empty space to the right
const TOP = 30;
const BOTTOM = 340;
const MIN = 38;
const MAX = 80;

const y = (v: number) => TOP + (1 - (v - MIN) / (MAX - MIN)) * (BOTTOM - TOP);
const step = (PLOT_R - PAD_L) / closes.length;

const candles = closes.map((c, i) => {
  const o = i === 0 ? 75 : closes[i - 1];
  return {
    o,
    c,
    hi: Math.max(o, c) + wick[i % 7],
    lo: Math.min(o, c) - wick[(i + 3) % 7],
    x: PAD_L + i * step + step / 2,
  };
});

const sma = closes
  .map((_, i) => (i < 4 ? null : closes.slice(i - 4, i + 1).reduce((a, b) => a + b, 0) / 5))
  .map((v, i) => (v === null ? null : `${candles[i].x.toFixed(1)},${y(v).toFixed(1)}`))
  .filter(Boolean)
  .join(" L");

const plan = { entry: 62, stop: 56, target: 74, x0: PLOT_R + 10, x1: W - 22 };
const label = "font-mono text-[12px] tracking-[0.1em] uppercase";

export function HeroChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Illustrative chart showing a downtrend, a support zone, higher lows, and a written trade plan with entry, stop and target levels. Not live market data."
    >
      <defs>
        <linearGradient id="reward" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#20C997" stopOpacity="0.22" />
          <stop offset="1" stopColor="#20C997" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="risk" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#D6B36A" stopOpacity="0.08" />
          <stop offset="1" stopColor="#D6B36A" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* horizontal guides */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={0}
          x2={W}
          y1={TOP + (i * (BOTTOM - TOP)) / 4}
          y2={TOP + (i * (BOTTOM - TOP)) / 4}
          stroke="rgb(167 177 194 / .07)"
        />
      ))}

      {/* resistance & support zones */}
      <g className="fade-late" style={{ "--d": "1.2s" } as CSSProperties}>
        <rect x={0} y={y(74)} width={W} height={y(70) - y(74)} fill="rgb(59 130 246 / .08)" />
        <line x1={0} x2={W} y1={y(72)} y2={y(72)} stroke="#3B82F6" strokeOpacity=".45" strokeDasharray="3 5" />
        <text x={PAD_L} y={y(74) - 8} className={label} fill="#7FA8F5">
          Resistance zone
        </text>
        <rect x={0} y={y(46)} width={W} height={y(42.5) - y(46)} fill="rgb(59 130 246 / .08)" />
        <line x1={0} x2={W} y1={y(44.2)} y2={y(44.2)} stroke="#3B82F6" strokeOpacity=".45" strokeDasharray="3 5" />
        <text x={PAD_L} y={y(42.5) + 16} className={label} fill="#7FA8F5">
          Support zone
        </text>
      </g>

      {/* candles */}
      {candles.map((k, i) => {
        const up = k.c >= k.o;
        const top = y(Math.max(k.o, k.c));
        const h = Math.max(2, y(Math.min(k.o, k.c)) - top);
        return (
          <g key={i} className="candle" style={{ "--i": i } as CSSProperties}>
            <line x1={k.x} x2={k.x} y1={y(k.hi)} y2={y(k.lo)} stroke={up ? "#20C997" : "#5B6886"} strokeWidth="1.4" />
            <rect
              x={k.x - step * 0.3}
              y={top}
              width={step * 0.6}
              height={h}
              rx="1.5"
              fill={up ? "#20C997" : "#2B3550"}
              stroke={up ? "none" : "#5B6886"}
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* moving average */}
      <path
        d={`M${sma}`}
        pathLength={1}
        className="chart-draw"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* higher-low markers */}
      {[17, 20].map((i, n) => (
        <g key={i} className="fade-late" style={{ "--d": `${1.9 + n * 0.15}s` } as CSSProperties}>
          <circle cx={candles[i].x} cy={y(candles[i].lo) + 12} r="9" fill="#0B1020" stroke="#D6B36A" strokeOpacity=".8" />
          <text x={candles[i].x} y={y(candles[i].lo) + 15.5} textAnchor="middle" className="font-mono text-[10px]" fill="#D6B36A">
            HL
          </text>
        </g>
      ))}

      {/* written trade plan, projected forward */}
      <g className="fade-late" style={{ "--d": "2.4s" } as CSSProperties}>
        <rect x={plan.x0} y={y(plan.target)} width={plan.x1 - plan.x0} height={y(plan.entry) - y(plan.target)} rx="4" fill="url(#reward)" />
        <rect x={plan.x0} y={y(plan.entry)} width={plan.x1 - plan.x0} height={y(plan.stop) - y(plan.entry)} rx="4" fill="url(#risk)" />
        <line x1={candles.at(-1)!.x} x2={plan.x1} y1={y(plan.entry)} y2={y(plan.entry)} stroke="#F8FAFC" strokeOpacity=".7" strokeDasharray="2 4" />
        <line x1={plan.x0} x2={plan.x1} y1={y(plan.target)} y2={y(plan.target)} stroke="#20C997" strokeOpacity=".8" />
        <line x1={plan.x0} x2={plan.x1} y1={y(plan.stop)} y2={y(plan.stop)} stroke="#D6B36A" strokeOpacity=".8" />
        <text x={plan.x0 + 10} y={y(plan.target) + 16} className={label} fill="#5EEAD4">
          Target · 2R
        </text>
        <text x={plan.x0 + 10} y={y(plan.entry) - 8} className={label} fill="#F8FAFC">
          Planned entry
        </text>
        <text x={plan.x0 + 10} y={y(plan.stop) + 16} className={label} fill="#D6B36A">
          Stop · 1R
        </text>
      </g>
    </svg>
  );
}
