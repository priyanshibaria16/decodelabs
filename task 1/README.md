# TechNova AI Landing Page

A modern, responsive SaaS landing page for TechNova AI - an AI-powered business solutions platform. Built with HTML5, CSS3, and vanilla JavaScript with a focus on performance, accessibility, and user experience.

## Features

### Core Functionality
- **Dark/Light Theme Toggle** - Persistent theme preference with localStorage
- **Responsive Design** - Mobile-first approach, optimized for all screen sizes
- **Smooth Animations** - Scroll-reveal animations and transitions
- **Interactive Elements** - Animated counter stats, expandable FAQ accordion
- **Contact Form** - Client-side validation with success notifications
- **Modern UI/UX** - Glassmorphism effects, gradient accents, smooth interactions

### Sections Included
1. **Header/Navigation** - Sticky header with smooth scroll active link tracking
2. **Hero Section** - Eye-catching headline with CTA buttons and dashboard mockup
3. **Statistics** - Animated counter displaying key metrics
4. **Features** - Six feature cards with hover effects showcasing product capabilities
5. **Pricing** - Three-tier pricing plans with feature comparisons
6. **Testimonials** - Client testimonials with avatars and star ratings
7. **FAQ** - Accordion-style frequently asked questions
8. **Contact** - Contact form with inline validation and contact methods
9. **Footer** - Branding, links, and social media

## Project Structure

```
task 1/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Complete stylesheet with dark/light themes
├── js/
│   └── script.js       # Interactive functionality
├── images/
│   ├── avatar-sarah.png
│   ├── avatar-alex.png
│   └── avatar-marcus.png
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, grid/flexbox, animations, media queries
- **JavaScript (Vanilla)** - No frameworks or dependencies
- **Fonts** - Google Fonts (Poppins, Inter)
- **Icons** - Inline SVG

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Basic HTTP server (for production)

### Local Development
1. Open `index.html` directly in your browser, or
2. Use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` (or your server's port)

## Customization

### Color Scheme
Edit CSS variables in `style.css` (lines 7-49):
```css
:root {
  --color-primary: #4F46E5;      /* Indigo */
  --color-secondary: #06B6D4;    /* Cyan */
  /* ... other variables ... */
}
```

### Content
- **Text Content** - Edit directly in `index.html`
- **Images** - Replace files in `images/` folder, update references
- **Company Info** - Update branding, contact info in HTML

### Forms
The contact form currently simulates submission (1.5s delay). To integrate with a backend:
1. Update `<form>` action attribute
2. Modify JavaScript in `js/script.js` (lines 295-328)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Minimal CSS without preprocessor overhead
- Vanilla JavaScript (no framework bloat)
- Intersection Observer API for efficient animations
- CSS transforms for smooth 60fps animations
- Optimized for CWV (Core Web Vitals)

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast compliance

## File Details

### index.html
- 802 lines of semantic markup
- Meta tags for SEO and social sharing (Open Graph, Twitter cards)
- Favicon with SVG
- Google Fonts integration
- Responsive viewport configuration

### css/style.css
- 1556 lines of organized CSS
- CSS custom properties for theming
- Dark theme as default with light theme toggle
- Mobile-first responsive design
- Comprehensive component system (buttons, cards, forms)

### js/script.js
- 331 lines of modular JavaScript
- 8 core features implemented as distinct modules
- Intersection Observer for performance
- localStorage for theme persistence
- Form validation with real-time feedback

## JavaScript Modules

1. **Theme Toggle** - Dark/light mode with system preference detection
2. **Mobile Menu** - Hamburger menu with keyboard support (ESC to close)
3. **Sticky Header** - Dynamic styling on scroll
4. **Scroll Spy** - Active navigation link tracking
5. **Scroll Reveal** - Element animations on viewport entry
6. **Counter Animation** - Animated statistics counters
7. **FAQ Accordion** - Expandable question panels (single-open)
8. **Form Validation** - Email and required field validation with error messages

## Responsive Breakpoints

- **Mobile**: 0-767px
- **Tablet**: 768px-1023px
- **Desktop**: 1024px+

## Future Enhancements

- Backend integration for contact form
- CMS integration for dynamic content
- Blog/resource section
- Customer portal/dashboard link
- Advanced analytics
- Internationalization (i18n)

## License

Open source - feel free to use and modify

## Support

For questions or issues, refer to the inline code documentation in each file.
