# Optimus Design System Reference

> Extracted from: https://v0-optimus-delta.vercel.app/

## Quick Reference

### 1. Color System (Hex Values)

```
Background:     #FFFFFF (light) / #0A0A0A (dark)
Foreground:     #0A0A0A (light) / #FFFFFF (dark)
Accent:         #10B981 (emerald green)

Gray Scale:
├── 50:  #FAFAFA
├── 100: #F5F5F5
├── 200: #E5E5E5
├── 300: #D4D4D4
├── 400: #A3A3A3
├── 500: #737373
├── 600: #525252
├── 700: #404040
├── 800: #262626
├── 900: #171717
└── 950: #0A0A0A
```

### 2. Typography

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| Hero Title | Inter | clamp(3rem, 8vw, 5rem) | 600 | 1.05 | -0.03em |
| Section Title | Inter | clamp(2.25rem, 5vw, 3.5rem) | 600 | 1.1 | -0.02em |
| Card Title | Inter | 1.25rem (20px) | 600 | 1.3 | normal |
| Body | Inter | 1.125rem (18px) | 400 | 1.6 | normal |
| Caption/Label | Inter | 0.875rem (14px) | 500 | 1.5 | 0.05em |
| Code | JetBrains Mono | 0.875rem | 400 | 1.6 | normal |

### 3. Spacing System

```
Section Padding:    clamp(4rem, 10vw, 8rem)
Container Max:      1280px
Container Padding:  1.5rem (24px)

Gap Scale:
├── xs:  0.5rem  (8px)
├── sm:  1rem    (16px)
├── md:  1.5rem  (24px)
├── lg:  2rem    (32px)
├── xl:  3rem    (48px)
└── 2xl: 4rem    (64px)
```

### 4. Navbar

```css
Height:          64px
Padding:         0.875rem 1rem
Background:      rgba(255, 255, 255, 0.8)
Backdrop Blur:   12px
Border:          1px solid rgba(0, 0, 0, 0.06)
Z-Index:         50

Scrolled State:
├── Background:  rgba(255, 255, 255, 0.95)
└── Shadow:      0 1px 2px rgba(0, 0, 0, 0.04)
```

### 5. Section Label CSS

```css
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #737373;
  letter-spacing: 0.05em;
}

.section-label::before {
  content: '';
  display: block;
  width: 1rem;
  height: 1px;
  background-color: #D4D4D4;
}
```

Tailwind: `className="section-label"` (with utility class)

### 6. Hero Section Structure

```tsx
<section className="relative pt-[calc(64px+clamp(4rem,10vw,8rem))] pb-section-padding overflow-hidden">
  <div className="container-optimus text-center">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full">
      <span>The platform for modern teams</span>
    </div>

    {/* Title */}
    <h1 className="text-hero text-balance mb-6">
      <span>The platform</span>
      <span>to create</span>
    </h1>

    {/* Description */}
    <p className="text-body-muted max-w-[600px] mx-auto mb-10">
      Your toolkit to stop configuring...
    </p>

    {/* CTA Buttons */}
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <button className="btn-optimus-primary">Start free trial</button>
      <button className="btn-optimus-secondary">Watch demo</button>
    </div>
  </div>
</section>
```

### 7. Feature Cards Layout

```tsx
<div className="feature-grid">
  {features.map((feature, i) => (
    <div key={i} className="feature-card">
      <span className="text-sm font-semibold text-gray-400 mb-6 block">
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg mb-5">
        {feature.icon}
      </div>
      <h3 className="text-card-title mb-3">{feature.title}</h3>
      <p className="text-base text-gray-500 leading-relaxed">{feature.description}</p>
    </div>
  ))}
</div>
```

Grid CSS:
```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid #E5E5E5;
  border-radius: 1.5rem;
  overflow: hidden;
}
```

### 8. Dark Section Background

```css
.bg-section-dark {
  position: relative;
  background-color: #0A0A0A;
  color: #FFFFFF;
  overflow: hidden;
}

/* Subtle top glow */
.bg-section-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 60%
  );
  pointer-events: none;
}
```

### 9. Metrics Typography

```css
.metric-value {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #737373;
  margin-top: 0.5rem;
}
```

### 10. Noise Texture Overlay

```css
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### 11. Button Styles

**Primary (Filled)**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #0A0A0A;
  color: #FFFFFF;
  border-radius: 9999px;
  transition: all 150ms ease;
}

.btn-primary:hover {
  background-color: #262626;
}
```

**Secondary (Outline)**
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: transparent;
  color: #404040;
  border: 1px solid #D4D4D4;
  border-radius: 9999px;
  transition: all 150ms ease;
}

.btn-secondary:hover {
  background-color: #FAFAFA;
  border-color: #A3A3A3;
}
```

### 12. Border Radius System

```
none:  0
sm:    0.25rem   (4px)
md:    0.5rem    (8px)
lg:    0.75rem   (12px)
xl:    1rem      (16px)
2xl:   1.5rem    (24px)   ← Cards, Containers
3xl:   2rem      (32px)
full:  9999px              ← Buttons, Badges
```

### 13. Responsive Breakpoints

```
xs:   475px   (small mobile)
sm:   640px   (large mobile)
md:   768px   (tablet)
lg:   1024px  (desktop)
xl:   1280px  (large desktop)
2xl:  1536px  (wide screens)
```

---

## Files Included

| File | Purpose |
|------|---------|
| `optimus-design-system.css` | Complete CSS custom properties |
| `optimus-components.css` | Component-level styles |
| `tailwind.optimus.ts` | Tailwind theme extension |
| `globals.optimus.css` | Drop-in globals.css replacement |

## Usage

### Option 1: Import Tailwind Config

```ts
// tailwind.config.ts
import { optimusTheme, optimusScreens } from './design-system/tailwind.optimus'

export default {
  theme: {
    screens: optimusScreens,
    extend: optimusTheme,
  },
}
```

### Option 2: Use globals.optimus.css

Replace your `globals.css` with `globals.optimus.css` or import it:

```css
@import './design-system/globals.optimus.css';
```

### Option 3: Import CSS Variables Only

```css
@import './design-system/optimus-design-system.css';
@import './design-system/optimus-components.css';
```
