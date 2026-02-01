

# Astute Computer - High-End Landing Page Plan

## 🎨 Design Vision
A **monochromatic "tech-noir"** landing page with maximum wow-factor animations. Think cutting-edge, premium, and cinematic—inspired by Linear.app and Vercel, but strictly black and white with immersive 3D effects.

---

## 📄 Page Structure & Sections

### 1. Navigation Bar
- **Floating glassmorphism navbar** with blur backdrop
- White-inverted Astute Computer logo (left)
- Minimal links: Services, Solutions, About, Case Studies
- High-contrast **"Get Started"** button (white with black text)
- Sticky on scroll with subtle opacity transition

---

### 2. Hero Section (The Showstopper)
**Content:**
- **Headline**: "Modernize Your Operations. Digitalize Your Legacy."
- **Sub-headline**: "From digital branding to AI-powered document archives. We build the software that powers your business."
- **Dual CTAs**: 
  - Primary: "Transform Your Business" (solid white, magnetic hover)
  - Secondary: "View Solutions" (ghost button, fills on hover)

**Animations & Effects:**
- 🌐 **3D Floating Grid Background** using Three.js/React Three Fiber with mouse parallax
- ✨ **Staggered text reveal** - headline animates line-by-line (slide up + fade in)
- 🧲 **Magnetic buttons** - buttons subtly follow cursor on hover
- 📜 **Scroll-based blur & fade** - cinematic exit as user scrolls
- 💫 **Particle dust** - subtle floating particles for depth

---

### 3. Services Showcase
Four premium service cards with **hover morphing effects**:

| Service | Description |
|---------|-------------|
| **Digital Branding** | Brand strategy, logo design, visual identity systems |
| **Operations Digitalization** | Business process digitization and automation |
| **AI Document Archives** | AI-powered scanning, OCR, and archival systems |
| **Custom Software Development** | Full-stack web and mobile applications |

**Animations:**
- Cards appear with staggered 3D flip-in on scroll
- Hover: Cards tilt in 3D with glowing border effect
- Icons animate (draw-in SVG or Lottie-style)

---

### 4. Case Studies / Portfolio
- **Horizontal scroll gallery** with drag interaction
- Project cards with image reveal on hover
- Filter pills for project categories
- "View Case Study" with smooth page transition

**Animations:**
- Parallax image movement within cards
- Number counters for stats (clients served, projects completed)
- Text reveal on scroll

---

### 5. About Us Section
- Split layout: Brand story text + team/company visual
- Mission statement with **typewriter text effect**
- Timeline of company milestones with scroll-triggered animations
- Values displayed with animated icons

---

### 6. Contact / CTA Section
**Contact Methods:**
- 📱 WhatsApp: 8667331224 (click-to-chat button)
- 📧 Email: astutecomputer.contact@gmail.com

**Simple Booking Form:**
- Name, Email, Phone, Service Interest, Message
- Form validation with sleek error states
- Success animation on submit
- Data stored in Supabase + notification

**Newsletter Signup:**
- Email capture with animated subscribe button
- Stored in database for marketing

**Animations:**
- Form fields animate in on focus
- Submit button morphs to checkmark on success
- Floating shapes in background respond to scroll

---

## ⚡ Global Animations & Effects

| Effect | Implementation |
|--------|----------------|
| **Mouse parallax** | Background grid/elements move with cursor |
| **Scroll reveal** | All sections fade/slide in on scroll entry |
| **Smooth page scroll** | Lenis or native smooth scroll |
| **Cursor effects** | Custom cursor with trail or glow on interactive elements |
| **Loading screen** | Premium animated logo reveal on initial load |
| **Page transitions** | Smooth cross-fades between sections |

---

## 🛠 Technical Approach

| Aspect | Technology |
|--------|------------|
| **Framework** | React + TypeScript + Vite |
| **Styling** | Tailwind CSS (monochrome palette) |
| **Animations** | Framer Motion |
| **3D Effects** | React Three Fiber + Three.js |
| **Backend** | Supabase (Lovable Cloud) |
| **Forms** | React Hook Form + Zod validation |

---

## 📱 Responsive Design
- **Desktop**: Full 3D effects, horizontal scrolls, expanded layouts
- **Tablet**: Adapted grid, touch-friendly interactions
- **Mobile**: Simplified animations (performance), stacked layouts, hamburger menu

---

## 🎯 Deliverables Summary
1. ✅ Glassmorphism navbar with logo
2. ✅ Immersive hero with 3D grid, parallax, magnetic buttons
3. ✅ Services showcase with 3D card effects
4. ✅ Portfolio/case studies with horizontal scroll
5. ✅ About section with animated timeline
6. ✅ Contact form with WhatsApp/email + newsletter signup
7. ✅ Backend for form submissions and newsletter storage
8. ✅ Loading animation and page transitions
9. ✅ Fully responsive design

