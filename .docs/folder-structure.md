# Codebase Folder Structure Report

### src/

```text
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx
│   ├── home/
│   │   ├── contactminipage/
│   │   │   └── contactMiniSection.tsx
│   │   ├── featured-work/
│   │   │   └── FeaturedWork.tsx
│   │   ├── hero/
│   │   │   └── HeroSection.tsx
│   │   └── HomeScrollPinController.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── about/
│   │   └── HorizontalSection.tsx
│   ├── layout/
│   │   └── Footer.tsx
│   ├── menu/
│   │   ├── HomeLink.tsx
│   │   ├── Menu.tsx
│   │   ├── MenuButton.tsx
│   │   ├── MenuContent.tsx
│   │   └── useMenuAnimation.ts
│   ├── projects/
│   │   ├── ProjectsLogoRail.tsx
│   │   ├── ProjectsOverlay.tsx
│   │   └── ProjectsStage.tsx
│   └── ui/
│       ├── forms/
│       │   ├── input.tsx
│       │   ├── label.tsx
│       │   └── textarea.tsx
│       ├── skills/
│       │   ├── SkillBar.tsx
│       │   └── SkillPill.tsx
│       ├── visuals/
│       │   ├── MarqueeStrip.tsx
│       │   └── StripesBackground.tsx
│       ├── BlobCursor.tsx
│       ├── button.tsx
│       ├── contact-card.tsx
│       ├── dialog.tsx
│       ├── ProjectRow.tsx
│       └── SocialIcons.tsx
├── context/
│   └── ContactModalContext.tsx
├── data/
│   ├── experience.data.ts
│   ├── projects.data.ts
│   └── socialLinks.ts
├── hooks/
│   └── useWheelNavigation.ts
├── lib/
│   └── utils.ts
└── providers/
    ├── GSAPProvider.tsx
    └── LenisProvider.tsx
```

### public/

```text
public/
├── images/
│   └── about/
│       └── img1.png
├── file.svg
├── globe.svg
├── img.png
├── next.svg
├── vercel.svg
└── window.svg
```

### trash/

```text
trash/
├── expertise/
│   └── ExpertiseSection.tsx
├── work/
│   ├── page.tsx
│   └── ProjectsNavigation.tsx
├── Header.tsx
└── MobileMenu.tsx
```

### Root Files

```text
├── .docs/
├── .env
├── .git/
├── .gitignore
├── .guidelines/
├── .next/
├── .prompts/
├── .skills/
├── AGENTS.md
├── codebase-folder-structure.md
├── eslint.config.mjs
├── future _font_.md
├── next-env.d.ts
├── next.config.ts
├── node_modules/
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public/
├── README.md
├── src/
├── trash/
├── tsconfig.json
└── tsconfig.tsbuildinfo
```
