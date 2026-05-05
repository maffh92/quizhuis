# Frontend Architectuur voor een Standalone Quiz-Platform (Kahoot-stijl)

## Context

Ik heb een werkende `Matching Question` component in React/TS. Ik wil dit uitbouwen naar een volledige quiz-flow die volledig aan de client-side draait. De app moet kunnen schakelen tussen een `Host` modus (groot scherm) en een `Simulated Player` modus.

## Gevraagde Uitbreidingen (Frontend Only)

- Game Flow Engine: ontwerp een `useQuizLogic` hook die de status van de quiz beheert via een state machine (bijv. `LOBBY`, `QUESTION_INTRO`, `QUESTION_ACTIVE`, `RESULT_REVEAL`, `LEADERBOARD`).
- Mock Multi-Player: lokale state gebruiken om meerdere 'fictieve' spelers te simuleren die antwoorden insturen, zodat UI-interacties (voortgangsbalken, score-updates) getest kunnen worden.
- Dynamic Question Renderer: maak een wrapper-component die op basis van een JSON-configuratie wisselt tussen `MatchingQuestion`, `MultipleChoice` en `TrueFalse` (boolean) components.
- Timer & Scoring Logica: implementeer een frontend timer (met Framer Motion) die punten berekent:

  $score = basePoints \times \frac{remainingTime}{totalTime}$

- Global Theme System: mogelijkheid om per quiz Tailwind-kleuren en achtergronden dynamisch aan te passen.

## Technische Specificaties

- Gebruik React Context of Zustand voor het beheer van de globale quiz-status (single source of truth).
- Zorg dat animaties tussen schermen vloeiend verlopen met `AnimatePresence` van Framer Motion.
- Data-structuur klaar om later aan een API gekoppeld te worden (gebruik TypeScript interfaces voor `Quiz`, `Question`, en `Player`).
- Viewport: gebruik Tailwind `h-screen` en `overflow-hidden` om fullscreen ervaring te simuleren.

## Architectuur van `useQuizLogic` (state machine)

Staten:

- `LOBBY`
  - Host kan start triggeren of spelers simulatie inschakelen.
- `QUESTION_INTRO`
  - Intro animatie; kort venster waarin vraag verschijnt (AnimatePresence in)
  - Transitie naar `QUESTION_ACTIVE` na animatie/delay
- `QUESTION_ACTIVE`
  - Timer loopt (single source of truth in Zustand/Context)
  - Spelers (fictief of echt) mogen antwoorden insturen
  - Op timer eind of alle antwoorden binnen => naar `RESULT_REVEAL`
- `RESULT_REVEAL`
  - Punten en juiste antwoorden tonen, scores bijwerken
  - Animaties + korte pauze => naar `QUESTION_INTRO` (volgende vraag) of `LEADERBOARD`
- `LEADERBOARD`
  - Eindstand tonen, opties voor opnieuw spelen of terug naar `LOBBY`

Belangrijke events / triggers:

- `START_QUIZ` (LOBBY -> QUESTION_INTRO)
- `INTRO_FINISHED` (QUESTION_INTRO -> QUESTION_ACTIVE)
- `TIME_UPDATED` (ticken van timer; single source of truth)
- `ANSWER_SUBMITTED` (registreer antwoord speler)
- `ALL_ANSWERS_IN` (optioneel: vroegtijdige transitie)
- `TIME_EXPIRED` (QUESTION_ACTIVE -> RESULT_REVEAL)
- `REVEAL_FINISHED` (RESULT_REVEAL -> QUESTION_INTRO of LEADERBOARD)

Data in de state machine (single source of truth):

- `currentQuestionIndex: number`
- `questions: Question[]`
- `players: Player[]` (inclusief simulatie-metadata)
- `timer: { total: number; remaining: number; running: boolean }`
- `phase: 'LOBBY' | 'QUESTION_INTRO' | 'QUESTION_ACTIVE' | 'RESULT_REVEAL' | 'LEADERBOARD'`
- `answers: Record<playerId, { questionId: string; answer: any; time: number; score: number }[]>`

Implementation notes:

- Houd timer centraal in Zustand/Context en exposeer deterministische actions: `startTimer`, `tick`, `stopTimer`, `resetTimer`.
- Gebruik `requestAnimationFrame` of een precise interval met compensation om drift te minimaliseren. Omdat het frontend-only is, is dit verantwoordelijk voor "when time is up".
- Framer Motion `AnimatePresence` voor transitions tussen fases; gebruik `key={phase}` en exit/enter animaties.

## Mock Multi-Player (lokale simulatie)

- Maak een `simulatePlayers` functie die op basis van configuratie (aantal, snelheid, accuracy) faux events dispatcht naar global state:
  - elke gesimuleerde speler heeft een `reactionTime` (ms) en een `accuracy` (kans op correcte antwoord)
  - tijdens `QUESTION_ACTIVE` scheduleer `setTimeout` calls die `ANSWER_SUBMITTED` dispatchen met gegenereerde keuze en timestamp
- Bij scoring: bereken per antwoord de score met bovengenoemde formule en update `players[].score`.
- Voor testen: exposeer deterministische seed-opties zodat simulatie voorspelbaar is.

## Dynamic Question Renderer

- `QuestionRenderer` ontvangt `question: Question` en switcht op `question.type`:
  - `matching` -> render `MatchingQuestion`
  - `multiple-choice` -> render `MultipleChoice`
  - `boolean` -> render `TrueFalse`
- Propscontract: alle question components verwachten standardized callbacks: `onAnswer(answer)` en `timeRemaining` (optioneel UI).

## Timer & Scoring (frontend)

- Timer lives in global state. UI components subscribe en tonen voortgang (Framer Motion progress bar animaties).
- Score berekening (TypeScript/KaTeX inline):
  $score = basePoints \times \frac{remainingTime}{totalTime}$

- Rekenvoorbeeld: `basePoints = question.points`; `remainingTime` wordt bepaald op moment van answer submit.

## Global Theme System

- Quiz metadata bevat een `theme` object: kleuren (primary, secondary, background), gradients, en overlay-images.
- Gebruik Tailwind CSS runtime theming via CSS variables (`--tw-prop-primary`) die in `:root` of `.quiz-theme-{id}` worden gezet.
- Per quiz wrapper component voegt een wrapper class en inline style object met CSS-variabelen volgens gekozen theme.

## TypeScript interfaces & JSON-voorbeeld

```typescript
type QuestionType = 'matching' | 'multiple-choice' | 'boolean';

interface MatchingContent {
  left: { id: string; label: string }[];
  right: { id: string; label: string }[];
  correctPairs: { leftId: string; rightId: string }[];
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
}

interface Quiz {
  id: string;
  title: string;
  theme?: {
    primary: string;
    secondary?: string;
    background?: string;
  };
  questions: Question[];
}
```

Voorbeeld JSON (meerdere vraagtypes):

```json
{
  "id": "quiz-1",
  "title": "Intro Quiz",
  "theme": { "primary": "#0ea5e9", "background": "linear-gradient(#05204a, #0ea5e9)" },
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "Wat is de hoofdstad van Nederland?",
      "timer": 15,
      "points": 1000,
      "content": {
        "options": [
          { "id": "o1", "label": "Amsterdam" },
          { "id": "o2", "label": "Rotterdam" },
          { "id": "o3", "label": "Den Haag" }
        ],
        "correctOptionId": "o1"
      }
    },
    {
      "id": "q2",
      "type": "matching",
      "prompt": "Match de landen aan hun hoofdsteden",
      "timer": 30,
      "points": 1500,
      "content": {
        "left": [
          { "id": "l1", "label": "België" },
          { "id": "l2", "label": "Duitsland" }
        ],
        "right": [
          { "id": "r1", "label": "Berlijn" },
          { "id": "r2", "label": "Brussel" }
        ],
        "correctPairs": [
          { "leftId": "l1", "rightId": "r2" },
          { "leftId": "l2", "rightId": "r1" }
        ]
      }
    },
    {
      "id": "q3",
      "type": "boolean",
      "prompt": "De aarde is plat.",
      "timer": 10,
      "points": 500,
      "content": { "correct": false }
    }
  ]
}
```

## Waar op te letten bij Frontend-only

- Timer is kritieke single source of truth. De global state bepaalt of tijd om is; UI luistert alleen naar die state.
- Use `performance.now()` voor nauwkeurigere tijdmetingen en compenseer interval-drift.
- Framer Motion `AnimatePresence` is cruciaal voor "Kahoot-vibe" — sleutel op `phase` of `currentQuestionIndex` gebruiken.
- Viewport: `h-screen` + `overflow-hidden` en positionering via flex/grid zodat overgangsanimaties niet scrollen.

---

Als vervolg kan ik:

- `useQuizLogic` hook schetsen als codevoorbeeld (Zustand of Context implementatie).
- `QuestionRenderer` en `simulatePlayers` voorbeeldcomponenten toevoegen.

Laat weten welke van deze ik direct moet implementeren.
