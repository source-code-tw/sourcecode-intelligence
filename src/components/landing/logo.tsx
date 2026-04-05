interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Organic flowing DNA — hand-placed dots, NOT on a grid
// Two intertwining strands (left→right) with scattered ambient particles
// x, y in viewBox coords, radius multiplier, opacity, type
type Dot = { x: number; y: number; rm: number; op: number; t: string };

const VW = 52;
const VH = 36;

const dotGrid: Dot[] = (() => {
  const dots: Dot[] = [];
  const cy = VH / 2;

  // --- DNA double helix strands (left→right flow) ---
  const strandSteps = 14;
  for (let i = 0; i < strandSteps; i++) {
    const t = i / (strandSteps - 1);
    const x = 4 + t * (VW - 8);
    const phase = t * Math.PI * 2.5; // ~1.25 full twists
    const amp = 10 + t * 2; // amplitude grows slightly left→right

    const yA = cy + Math.sin(phase) * amp;
    const yB = cy + Math.sin(phase + Math.PI) * amp;

    // Strand dots — vary size for depth illusion
    const depthA = 0.5 + 0.5 * Math.abs(Math.cos(phase)); // front/back
    const depthB = 0.5 + 0.5 * Math.abs(Math.cos(phase + Math.PI));

    dots.push({ x, y: yA, rm: 0.7 + depthA * 0.5, op: 0.7 + depthA * 0.3, t: "helix" });
    dots.push({ x, y: yB, rm: 0.7 + depthB * 0.5, op: 0.7 + depthB * 0.3, t: "helix" });

    // Rungs connecting strands (every 2-3 steps)
    if (i % 2 === 1 && Math.abs(yA - yB) > 6) {
      const midY = (yA + yB) / 2;
      const q1 = yA + (yB - yA) * 0.33;
      const q3 = yA + (yB - yA) * 0.67;
      dots.push({ x: x + 0.5, y: q1, rm: 0.5, op: 0.45, t: "helix" });
      dots.push({ x: x - 0.3, y: midY, rm: 0.45, op: 0.35, t: "helix" });
      dots.push({ x: x + 0.3, y: q3, rm: 0.5, op: 0.45, t: "helix" });
    }
  }

  // --- Dense ambient particles — multiple layers for depth + shadow ---
  const seed = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const tooClose = (px: number, py: number, minDist: number) =>
    dots.some(d => {
      const dx = d.x - px, dy = d.y - py;
      return dx * dx + dy * dy < minDist;
    });

  // Color layers: white highlights, light blue, mid blue, gray shadows
  const colorLayers: { count: number; color: string; opRange: [number, number]; sizeRange: [number, number]; seedOffset: number }[] = [
    // Layer 1: White/near-white highlights — tiny sparkle dots
    { count: 18, color: "highlight", opRange: [0.3, 0.7], sizeRange: [0.15, 0.35], seedOffset: 0 },
    // Layer 2: Very light blue — atmosphere
    { count: 22, color: "lightblue", opRange: [0.2, 0.5], sizeRange: [0.25, 0.55], seedOffset: 200 },
    // Layer 3: Mid blue — body particles
    { count: 20, color: "midblue", opRange: [0.2, 0.45], sizeRange: [0.3, 0.6], seedOffset: 400 },
    // Layer 4: Gray/slate shadows — depth underneath
    { count: 15, color: "shadow", opRange: [0.1, 0.3], sizeRange: [0.35, 0.7], seedOffset: 600 },
    // Layer 5: Dark blue tiny dots — near helix, like debris
    { count: 16, color: "deepblue", opRange: [0.25, 0.55], sizeRange: [0.2, 0.4], seedOffset: 800 },
  ];

  for (const layer of colorLayers) {
    for (let i = 0; i < layer.count; i++) {
      const si = i + layer.seedOffset;
      const px = 0.5 + seed(si) * (VW - 1);
      const py = 0.5 + seed(si + 50) * (VH - 1);

      if (tooClose(px, py, 6)) continue;

      const distFromCenter = Math.abs(py - cy) / (VH / 2);
      const baseFade = 1 - distFromCenter * 0.5;
      const opacity = layer.opRange[0] + seed(si + 100) * (layer.opRange[1] - layer.opRange[0]);
      const size = layer.sizeRange[0] + seed(si + 150) * (layer.sizeRange[1] - layer.sizeRange[0]);

      dots.push({ x: px, y: py, rm: size, op: opacity * baseFade, t: layer.color });
    }
  }

  return dots;
})();

export function Logo({ size = "md", className = "" }: LogoProps) {
  const scales = {
    sm: { w: 32, h: 22, text1: "text-sm", text2: "text-[10px]", gap: "gap-2" },
    md: { w: 42, h: 29, text1: "text-base", text2: "text-xs", gap: "gap-2.5" },
    lg: { w: 52, h: 36, text1: "text-xl", text2: "text-sm", gap: "gap-3" },
  };

  const s = scales[size];
  const baseR = 2.2;

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <svg
        width={s.w}
        height={s.h}
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* DNA helix — dark bold left→right */}
          <linearGradient id="logo-helix" x1="0" y1="0" x2={VW} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0077ee" />
            <stop offset="50%" stopColor="#0055cc" />
            <stop offset="100%" stopColor="#003d99" />
          </linearGradient>
        </defs>
        {dotGrid.map((dot, i) => {
          const colorMap: Record<string, string> = {
            helix: "url(#logo-helix)",
            highlight: "#e3f2fd",      // white-ish blue highlight
            lightblue: "#90caf9",       // light sky blue
            midblue: "#64b5f6",         // mid blue
            deepblue: "#1565c0",        // deep navy dots
            shadow: "#90a4ae",          // blue-gray shadow
          };
          return (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={baseR * dot.rm}
              fill={colorMap[dot.t] || "#bbdefb"}
              opacity={dot.op}
            />
          );
        })}
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`${s.text1} font-semibold tracking-wide`}>
          Source Code
        </span>
        <span className={`${s.text2} text-muted-foreground tracking-[0.15em] mt-0.5`}>
          原始碼智慧
        </span>
      </span>
    </span>
  );
}
