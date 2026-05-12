# STOFFA s.r.o. — Website

Professional website for STOFFA s.r.o., a textile sample book manufacturer.

## Structure

```
stoffa-web-pro/
├── index.html          # Main page
├── kniha.html           # Product: Vzorník Kniha
├── vodopad.html         # Product: Vzorník Vodopád
├── karty.html           # Product: Vzorník Karty
├── handmuster.html      # Product: Handmuster
├── README.md
└── img/
    ├── logo.png              # Nav logo (transparent bg)
    ├── logo-light.png        # Footer logo (white text)
    ├── logo-original.png     # Original logo file
    ├── hero.jpg              # Hero section image
    ├── about.jpg             # About section background
    ├── product-kniha.jpg     # Product card images
    ├── product-vodopad.jpg
    ├── product-karty.jpg
    ├── product-handmuster.jpg
    ├── carousel-*.jpg        # Hero carousel images
    ├── gallery-*.jpg         # Gallery section images
    ├── original-*.jpg        # Original HEIC photos (converted)
    └── photo-*.jpg           # All uploaded photos (full quality)
```

## Features

- Multi-language (CZ / EN / PL)
- Custom cursor, scroll animations
- Auto-rotating product carousel
- Fully responsive
- Zero dependencies, zero build step

## Deploy

**GitHub Pages:** Settings → Pages → Source: main / root

**Netlify/Vercel:** Drop the folder, done.
