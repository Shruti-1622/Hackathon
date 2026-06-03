# HackHub Theme System Documentation

## Overview

The HackHub project now uses a **centralized custom theme system** built with **Electric Blue & Purple** color palette. This makes future design changes quick and easy.

---

## Color Palette

### Primary Colors
- **Electric Blue**: `#00D9FF` (vibrant, energetic)
- **Electric Blue Dark**: `#0099CC` (darker shade for depth)
- **Electric Blue Light**: `#33E9FF` (lighter shade for accents)

### Secondary Colors
- **Purple**: `#7C3AED` (rich, professional)
- **Purple Dark**: `#5B21B6` (darker shade)
- **Purple Light**: `#A78BFA` (lighter shade)

### Accent Colors
- **Cyan**: `#06B6D4`
- **Indigo**: `var(--accent-hover)`
- **Violet**: `#8B5CF6`

### Neutral Colors
- **Dark Background**: `#0F0F1E`
- **Darker Background**: `#0A0A14`
- **Text White**: `#FFFFFF`
- **Text Light**: `#F8FAFC`
- **Text Gray**: `#CBD5E1`
- **Text Gray Dark**: `#94A3B8`

---

## CSS Variables (Root)

All colors are defined as CSS variables in `:root` for easy customization:

```css
:root {
    --primary-electric-blue: #00D9FF;
    --primary-electric-blue-dark: #0099CC;
    --primary-electric-blue-light: #33E9FF;
    
    --secondary-purple: #7C3AED;
    --secondary-purple-dark: #5B21B6;
    --secondary-purple-light: #A78BFA;
    
    --accent-cyan: #06B6D4;
    --accent-indigo: var(--accent-hover);
    --accent-violet: #8B5CF6;
    
    --bg-dark: #0F0F1E;
    --bg-darker: #0A0A14;
    --bg-card: rgba(10, 10, 20, 0.6);
    
    --text-white: #FFFFFF;
    --text-light: #F8FAFC;
    --text-gray: #CBD5E1;
    --text-gray-dark: #94A3B8;
    
    --border-light: rgba(255, 255, 255, 0.08);
    --border-medium: rgba(255, 255, 255, 0.12);
    --glow-blue: 0 0 30px rgba(0, 217, 255, 0.3);
    --glow-purple: 0 0 30px rgba(124, 58, 237, 0.3);
    --transition: all 0.3s ease;
}
```

---

## File Structure

### Main Theme File
- **`css/theme.css`** - Central theme file with all styling rules

### Theme Integration
- All HTML files now include both:
  - `css/style.css` (base styles)
  - `css/theme.css` (custom theme - **NEW**)
  - `css/[page]-page.css` (page-specific styles)

### HTML Files Using Theme
- `index.html` - Homepage
- `hackathon.html` - Hackathons listing
- `teamfinder.html` - Team finder page
- `leaderboard.html` - Leaderboard page
- `gallery.html` - Gallery page

---

## How to Make Changes

### Easy Global Color Changes
To change any color globally, edit the CSS variables in `css/theme.css`:

```css
:root {
    --primary-electric-blue: #YOUR_NEW_COLOR;
    /* All elements using this variable automatically update */
}
```

### Component Styling
All major components are styled in `theme.css`:

| Component | Class | Variable Used |
|-----------|-------|---------------|
| Navbar | `.navbar` | `--primary-electric-blue`, `--secondary-purple` |
| Buttons | `.primary-btn`, `.nav-signup-btn` | `--primary-electric-blue`, `--secondary-purple` |
| Cards | `.stat-card`, `.event-card` | `--glow-blue`, `--bg-card` |
| Text | `.hero h1`, `.stat-card h2` | `--primary-electric-blue`, `--secondary-purple` |
| Borders | All cards | `--border-light` |
| Hover Effects | All interactive elements | `--glow-blue`, `--glow-purple` |

---

## Common Customization Examples

### Change Primary Color
```css
:root {
    --primary-electric-blue: #00FF88;  /* New green */
    --glow-blue: 0 0 30px rgba(0, 255, 136, 0.3);
}
```

### Change Purple Accent
```css
:root {
    --secondary-purple: #FF00FF;  /* New magenta */
    --glow-purple: 0 0 30px rgba(255, 0, 255, 0.3);
}
```

### Add New Color Variable
```css
:root {
    /* ... existing variables ... */
    --accent-green: #00FF88;
    --glow-green: 0 0 30px rgba(0, 255, 136, 0.3);
}
```

---

## Design Features

### 1. **Gradient Effects**
```css
background: linear-gradient(90deg, var(--primary-electric-blue), var(--secondary-purple));
```

### 2. **Glow Effects**
```css
box-shadow: var(--glow-blue);
```

### 3. **Smooth Transitions**
```css
transition: var(--transition);  /* 0.3s ease */
```

### 4. **Backdrop Blur**
```css
backdrop-filter: blur(10px);
```

### 5. **Responsive Design**
- Mobile: 480px and below
- Tablet: 768px and below
- Desktop: 1024px and above

---

## Component Reference

### Hero Section
- **Gradient Background**: Electric Blue → Purple
- **Text**: White with Electric Blue highlights
- **Buttons**: Gradient from Blue to Purple with glow effect

### Cards (Stat, Event, Feature)
- **Background**: Semi-transparent dark with 60% opacity
- **Border**: Light white border with hover transition
- **Hover State**: Border color changes to Electric Blue, glow effect activates

### Buttons
- **Primary**: Gradient Blue → Purple with shadow
- **Secondary**: Transparent with Electric Blue border
- **Hover**: Lift effect with enhanced glow

### Particles & Animations
- **Float Animation**: 8-second loop for particles
- **Glow Animation**: Pulsing effect on hover
- **Transition**: Smooth 0.3s ease on all interactive elements

---

## Best Practices

1. **Use CSS Variables**: Always use `var(--color-name)` instead of hardcoding hex values
2. **Consistent Spacing**: Follow the existing spacing patterns
3. **Responsive First**: Test on mobile, tablet, and desktop
4. **Accessibility**: Maintain sufficient contrast ratios
5. **Performance**: Use backdrop-filter sparingly for performance

---

## Future Enhancements

To extend the theme system:

1. Add new color palettes as additional `:root` variations
2. Create `css/theme-variants.css` for alternate themes
3. Use CSS preprocessors (SCSS/LESS) for more advanced theming
4. Implement theme switcher JavaScript for runtime color changes

---

## Questions?

For more information about the color choices or theme structure, refer to the inline comments in `css/theme.css`.
