# لغتي (Lughaty) — Project Context

> Read this fully before doing anything. It captures decisions already made with the
> founder so you can continue the build without re-explaining. Ask before changing
> any decision marked **[locked]**.

## What we're building
A web platform that teaches Arabic to Egyptian children (KG → grade 6) through
AI-personalized videos plus interactive games. Business model: free trial +
monthly subscription bundles.

## Core differentiator — the child becomes the cartoon hero
Parents can optionally upload a photo of their child; we derive a **cartoon
character that resembles the child** (NOT a photorealistic deepfake) and make the
child the hero of the lesson videos. There is also a **ready-made cartoon hero**
path (no upload) that must be a first-class, fully-featured option — it will likely
be the default for most users.

## Non-negotiables — child safety & privacy **[locked]**
- The **original photo never leaves the parent's device**. Cartoon stylization
  happens on-device; only the derived cartoon (never the raw photo) is used.
- Auto-delete any transient image data after processing. **No retention, no model
  training on children's images.** If a third-party render service is used, it must
  be a no-retention provider.
- **Explicit, documented parental consent** before any processing.
- Comply with Egypt's Data Protection Law 151/2018 (and GDPR-K / COPPA if expanding
  abroad). Founder will get legal review of consent copy — we are not lawyers.
- No ads. No public sharing. Content is private per account. Parents can view and
  delete their child's data at any time.

## Audience & voice **[locked]**
- Parents pay and need trust; kids need fun.
- **All user-facing text in Egyptian colloquial Arabic (عامية مصرية), RTL.** Not MSA
  — young Egyptian kids find MSA cold.
- Metric units. Keep language simple (≈B2). Sentence case, plain verbs.

## Content scope (current)
- Two worlds: **KG letters** and **Grade-1 reading**. Expand later.
- Each letter needs **many** example words so quiz options vary (avoid repeated
  distractors — this was a real bug in the prototype's small word pool).

## Game mechanics (already prototyped — keep all of these)
Trace-the-letter (finger/canvas), balloon-pop, drag-and-drop (picture↔letter),
memory match, chase (race a friendly monster by answering), **escape room**
(explore objects, solve puzzles, collect 3 keys, door opens), word-build (drag
syllables), interactive story/adventure with choices + comprehension.
Juice to preserve: mascot reactions, flying-star rewards, live background,
haptics (navigator.vibrate), sound effects (Web Audio).

## Mascot **[locked]**
"نوري" (Nouri) — a small purple lantern creature. Recurring brand character; also
the homepage logo.

## Audio — important
The prototype embeds espeak Arabic clips as data-URIs. **This is a placeholder
(robotic).** Replace with real recordings from **Lahajati** (Arabic dialect TTS,
has Egyptian) or a human voice actor. The code exposes a `VOICE` map keyed by
letter/word — swap each value for a real mp3 URL and it works on every device.

## Homepage (draft exists: prototypes/homepage.html)
- Hero headline: «ابنك يتعلّم العربي وهو بطل الحكاية». Signature = a screen that
  flips a photo into a cartoon hero + interactive mascot + a privacy shield.
- Sections: how-it-works (3 steps), hero options (personalized vs ready-made),
  features, pricing, trust/privacy band, placeholder login/signup modal.
- Palette: plum #3A2B54, mascot purple #7C6BB0, mango #F2B441, coral #FF6B54,
  teal #2FB4A6, background #FBF4FF. Display font "Baloo Bhaijaan 2", body "Tajawal".

## Bundles — tentative, EGP (founder will finalize)
- Free trial: ready-made cartoon heroes + basic games.
- Basic 99 EGP/mo: all cartoon videos + all games + progress reports, no ads.
- Premium 199 EGP/mo: everything in Basic + personalized child-hero videos +
  monthly custom-video credits.

## Current assets (these are throwaway single-file mockups)
- `prototypes/game.html` — working games prototype (all mechanics + embedded audio).
- `prototypes/homepage.html` — homepage draft.
Use them as reference and source of content/logic. The real app is a fresh,
multi-file project — do not just wrap these single files.

## Recommended tech direction
Founder is technical (M365 / Azure / Power BI background; builds PWAs).
- Frontend: **React + Vite** (kids app as a PWA). Consider Next.js only if the
  marketing site needs SSR/SEO.
- Backend/auth/DB: use a BaaS (Supabase or Firebase) to move fast.
- Payments (Egypt): Paymob or Fawry.
- AI video: **queued jobs (minutes, not real-time)**. On-device cartoon
  stylization + cloud render via a no-retention provider. Build this LAST.
- Secrets in env vars; the founder supplies all keys.

## Suggested build order
1. Scaffold React + Vite, RTL, router, the palette/fonts above.
2. Port `homepage.html` into clean components.
3. Real auth (email + provider) via the chosen BaaS.
4. Child dashboard (level map) + port games from `game.html` into modular components.
5. Per-child progress tracking (stars, completion).
6. Bundles + payments.
7. Personalized-hero pipeline (on-device stylization + consent flow) — premium only.

## Working conventions
- Ask before big architectural commitments or changing anything **[locked]**.
- Commit after each completed subtask.
- Do not reproduce copyrighted material (lyrics, characters, etc.).
- Never weaken the child-safety/privacy rules above to save effort.
