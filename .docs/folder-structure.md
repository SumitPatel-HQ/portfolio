# Codebase Folder Structure Report

### src/

```text
src/
├── app
│   ├── about
│   │   ├── AboutScrollPinController.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── services.tsx
│   ├── api
│   │   └── contact
│   │       └── route.ts
│   ├── contact
│   │   └── page.tsx
│   ├── experience
│   │   └── page.tsx
│   ├── home
│   │   ├── contactminipage
│   │   │   └── contactMiniSection.tsx
│   │   ├── featured-work
│   │   │   └── FeaturedWork.tsx
│   │   ├── hero
│   │   │   ├── HeroSection.tsx
│   │   │   └── introAnime.ts
│   │   └── HomeScrollPinController.tsx
│   ├── mobile-home
│   │   └── MobileHomeLayout.tsx
│   ├── projects
│   │   ├── [name]
│   │   │   └── page.tsx
│   │   ├── ProjectsPageClient.tsx
│   │   └── page.tsx
│   ├── services
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components
│   ├── Contacts
│   │   ├── emails
│   │   │   └── PortfolioContactEmail.tsx
│   │   ├── ContactForm.tsx
│   │   ├── button.tsx
│   │   ├── contact-card.tsx
│   │   ├── contact-item.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   └── toast.tsx
│   ├── layout
│   │   └── Footer.tsx
│   ├── menu
│   │   ├── AnimatedArrow.tsx
│   │   ├── HomeLink.tsx
│   │   ├── Menu.tsx
│   │   ├── MenuButton.tsx
│   │   ├── MenuContent.tsx
│   │   └── useMenuAnimation.ts
│   ├── mobile
│   │   ├── contact
│   │   │   ├── MobileContactCard.tsx
│   │   │   └── MobileContactPage.tsx
│   │   ├── home
│   │   │   ├── MobileHero.tsx
│   │   │   ├── MobileIntro.tsx
│   │   │   ├── MobileOverview.tsx
│   │   │   └── MobileShowcase.tsx
│   │   ├── projects
│   │   │   ├── MobileProjectDetailLayout.tsx
│   │   │   └── MobileProjectsPage.tsx
│   │   ├── services
│   │   │   └── MobileServicePage.tsx
│   │   ├── MobileBackground.tsx
│   │   ├── MobileBottomNav.tsx
│   │   └── MobileRouteHeader.tsx
│   ├── projects
│   │   ├── ImageGallery.tsx
│   │   ├── ProjectsLogoRail.tsx
│   │   └── ProjectsOverlay.tsx
│   ├── transition
│   │   ├── BrandLayer.tsx
│   │   ├── TransitionProvider.tsx
│   │   └── transition.css
│   └── ui
│       ├── visuals
│       │   ├── BlobCursor.tsx
│       │   ├── ContactOrb.tsx
│       │   ├── StripesBackground.tsx
│       │   └── TextureOverlay.tsx
│       ├── 404-not-found.tsx
│       ├── LogoRail.tsx
│       ├── ResumeModal.tsx
│       ├── ServiceGraphic.tsx
│       ├── SlideDotIndicators.tsx
│       ├── SocialIcons.tsx
│       ├── carousel.tsx
│       └── scroll-reveal.tsx
├── context
│   ├── ContactModalContext.tsx
│   └── IntroContext.tsx
├── data
│   ├── aboutmyself.data.ts
│   ├── experience.data.ts
│   ├── projects.data.ts
│   ├── socialLinks.ts
│   └── what-I-build.ts
├── hooks
│   ├── useIsClient.ts
│   └── useWheelNavigation.ts
├── lib
│   ├── env.ts
│   ├── gmail.ts
│   ├── imagekit-server.ts
│   ├── imagekit.ts
│   └── utils.ts
├── providers
│   ├── GSAPProvider.tsx
│   ├── LenisProvider.tsx
│   └── PageShowHandler.tsx
└── proxy.ts
```

### public/

```text
public/
└── Sumit_Resume.pdf
```

### trash/

```text
trash/
├── expertise
│   └── ExpertiseSection.tsx
├── skills
│   ├── SkillBar.tsx
│   └── SkillPill.tsx
├── work
│   ├── ProjectsNavigation.tsx
│   └── page.tsx
├── Header.tsx
└── MobileMenu.tsx
```

### Root Files

```text
├── .docs/
├── .env.local
├── .git/
├── .gitignore
├── .next/
├── AGENTS.md
├── dumb.txt
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── node_modules/
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public/
├── src/
├── trash/
├── tsconfig.json
└── tsconfig.tsbuildinfo
```
