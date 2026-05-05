# Frontend Architectuur Quiz-Platform — Gevalideerd Plan

> Resultaat van grill-me sessie (2026-05-05). Alle ontwerpbeslissingen zijn doorgelopen en bevestigd.

## Beslissingen Overzicht

| Onderwerp | Keuze |
|-----------|-------|
| State management | Zustand |
| State machine | Handmatige transitions in Zustand actions |
| Timer | Hybrid: 1s ticks in store + Framer Motion visuele animatie |
| Matching scoring | Partieel per correct paar |
| Host/Player switch | Query parameter `?mode=host\|player` |
| Player view | Volledige view + host controls |
| Quiz data laden | Fetch van `/public` folder (API-ready) |
| Interface naamgeving | Behoud `items`/`targets` (bestaande component) |
| Bot configuratie | Preset: Solo / Klein (3) / Groot (10) |
| Theming | Minimaal: alleen `primary` kleur |
| Animaties | Basis fade/slide per phase (`AnimatePresence`) |
| Na answer submit | Locked state met gekozen antwoord highlighted |
| Leaderboard | Na elke vraag (Kahoot-stijl) |
| Folder structuur | Feature-based |

---

## Architectuur

### Folder Structuur

```
src/
  features/
    quiz/
      quizStore.ts          # Zustand store (state machine + timer)
      QuestionRenderer.tsx  # Dispatch op question.type
      types.ts              # Quiz, Question, MatchingContent, etc.
    player/
      playerSimulation.ts   # simulatePlayers functie + presets
      scoring.ts            # Score berekening (partieel)
      types.ts              # Player, PlayerPreset
  components/
    questions/
      MatchingQuestion/     # Bestaande component (items/targets)
      MultipleChoice.tsx
      TrueFalse.tsx
    game/
      Lobby.tsx
      QuestionIntro.tsx
      QuestionActive.tsx
      ResultReveal.tsx
      Leaderboard.tsx
      TimerBar.tsx          # Framer Motion progress bar
  types/
    shared.ts               # Gedeelde utility types
```

### State Machine (Zustand)

**Phases:**

```
LOBBY → QUESTION_INTRO → QUESTION_ACTIVE → RESULT_REVEAL → LEADERBOARD → QUESTION_INTRO (volgende) of einde
```

Na elke vraag wordt het leaderboard getoond (Kahoot-stijl).

**Events / Actions:**

| Event | Transitie |
|-------|-----------|
| `startQuiz()` | LOBBY → QUESTION_INTRO |
| `introFinished()` | QUESTION_INTRO → QUESTION_ACTIVE |
| `tick()` | Timer -1s (blijft in QUESTION_ACTIVE) |
| `submitAnswer(playerId, answer)` | Registreer antwoord, check of alle spelers klaar zijn |
| `timeExpired()` | QUESTION_ACTIVE → RESULT_REVEAL |
| `revealFinished()` | RESULT_REVEAL → LEADERBOARD |
| `leaderboardFinished()` | LEADERBOARD → QUESTION_INTRO (volgende) of einde |

**Store shape:**

```typescript
interface QuizState {
  phase: 'LOBBY' | 'QUESTION_INTRO' | 'QUESTION_ACTIVE' | 'RESULT_REVEAL' | 'LEADERBOARD';
  quiz: Quiz | null;
  currentQuestionIndex: number;
  players: Player[];
  timer: { total: number; remaining: number; running: boolean };
  answers: Record<string, PlayerAnswer[]>; // playerId -> answers[]
  
  // Actions
  loadQuiz: (quiz: Quiz) => void;
  startQuiz: () => void;
  introFinished: () => void;
  tick: () => void;
  submitAnswer: (playerId: string, answer: unknown) => void;
  timeExpired: () => void;
  revealFinished: () => void;
  leaderboardFinished: () => void;
  reset: () => void;
}
```

### Timer (Hybrid)

- **Logisch:** `setInterval` 1s met `performance.now()` drift-compensatie in Zustand store.
- **Visueel:** Framer Motion `motion.div` progress bar met `animate={{ width }}` en `transition={{ duration: 1, ease: "linear" }}` — reageert op `remaining` uit de store maar animeert smooth.

### Scoring

```typescript
// Multiple Choice / Boolean
score = basePoints × (remainingTime / totalTime)

// Matching (partieel)
scorePerPaar = (basePoints / aantalParen) × (remainingTime / totalTime)
totalScore = correcteParen × scorePerPaar
```

Score wordt berekend op het moment van `submitAnswer` — `remainingTime` is de waarde op dat moment.

### Quiz Data

Bestanden in `public/quizzes/*.json`. Laden via:

```typescript
const response = await fetch('/quizzes/quiz-1.json');
const quiz: Quiz = await response.json();
```

Later vervangbaar door `fetch('/api/quizzes/1')` zonder component-wijzigingen.

### Host/Player Modus

- URL: `?mode=host` (default) of `?mode=player`
- **Host:** Ziet alles + controls (start quiz, skip vraag, volgende)
- **Player:** Ziet vraag + antwoord UI, maar geen host controls. Na submit: locked state met gekozen antwoord highlighted.

### Mock Players (Presets)

| Preset | Aantal | Accuracy | Snelheid |
|--------|--------|----------|----------|
| Solo | 0 | — | — |
| Klein | 3 | 50-80% | 3-8s |
| Groot | 10 | 30-90% | 2-12s |

Gesimuleerde spelers dispatchen `submitAnswer` via `setTimeout` met random delay binnen hun snelheidsbereik.

### Theming (Minimaal)

Quiz JSON bevat optioneel:
```json
{ "theme": { "primary": "#0ea5e9" } }
```

Toegepast via CSS variable `--quiz-primary` op een wrapper element. Gebruikt voor timer bar, actieve knoppen, en accenten.

### Animaties (Basis)

- `AnimatePresence` met `key={phase}` op de game container
- Enter: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- Exit: `opacity: 0, y: -20`
- Duration: 300ms ease-out

---

## TypeScript Interfaces

```typescript
type QuestionType = 'matching' | 'multiple-choice' | 'boolean';

interface MatchingContent {
  items: { id: string; label: string }[];
  targets: { id: string; label: string }[];
  correctPairs: { itemId: string; targetId: string }[];
}

interface MultipleChoiceContent {
  options: { id: string; label: string }[];
  correctOptionId: string;
}

interface BooleanContent {
  correct: boolean;
}

interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  timer: number; // seconden
  points: number; // basePoints
  content: MatchingContent | MultipleChoiceContent | BooleanContent;
}

interface Player {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  isSimulated: boolean;
}

interface PlayerAnswer {
  questionId: string;
  answer: unknown;
  timeRemaining: number;
  score: number;
}

interface Quiz {
  id: string;
  title: string;
  theme?: { primary: string };
  questions: Question[];
}

type PlayerPreset = 'solo' | 'klein' | 'groot';
```

---

## Implementatie Volgorde

1. **Types & Quiz store** — Interfaces + Zustand store met state machine (zonder timer)
2. **QuestionRenderer + MultipleChoice + TrueFalse** — Nieuwe question components
3. **Timer logica** — Zustand timer actions + Framer Motion progress bar
4. **Game flow UI** — Lobby, QUESTION_INTRO, RESULT_REVEAL, LEADERBOARD screens
5. **Scoring** — Formule implementatie + partiële scoring matching
6. **Player simulatie** — Mock players met presets
7. **Theming** — Minimale primary kleur toepassing
8. **Polish** — Animaties verfijnen, edge cases, responsive

---

## Dependencies toe te voegen

```bash
npm install zustand
```

Alle andere dependencies (React, Framer Motion, Tailwind, dnd-kit) zijn al aanwezig.
