```text
+-----------------------------------------------------------+
|                        End User                           |
|                 Desktop / Tablet / Mobile                 |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                    Next.js App Router                     |
| Routes: / /about /projects /experience /contact /services |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                     Root Layout                           |
|     Global shell handles responsive layout structures     |
|     Desktop: Menu + Footer                                |
|     Mobile: MobileRouteHeader + MobileBottomNav           |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                      Providers                            |
| TransitionProvider -> Lenis -> GSAP -> ContactModalContext|
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                       Runtime                             |
|        Lenis + GSAP ScrollTrigger + UI State Locks        |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                         Pages                             |
| Desktop: Home | About | Projects | Experience | Services  |
|          Home: Hero -> FeaturedWork -> ContactMiniSection |
| Mobile:  MobileHomeLayout -> MobileHero -> MobileShowcase |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                    Components Layer                       |
| Desktop: layout/* menu/* projects/* about/* ui/*          |
| Mobile:  mobile/* (home, projects, contact, services)     |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                      Data Layer                           |
|     src/data/* + public/images/* + remote media URLs      |
+-----------------------------------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|                    Analytics Layer                        |
|           Vercel Analytics + Speed Insights               |
+-----------------------------------------------------------+
```
