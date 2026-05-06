# QuizHuis

A Kahoot-style interactive quiz platform that runs entirely in the browser. One human player competes against configurable simulated opponents through a timed sequence of questions.

## Features

- **Multiple question types** — multiple choice, true/false, and matching (drag items to targets)
- **Simulated opponents** — play against bots with configurable accuracy and reaction speed
- **Time-based scoring** — faster correct answers earn more points; minimum score is always 0
- **Leaderboard after every question** — Kahoot-style podium showing

## Modes

| Mode | URL | Description |
|------|-----|-------------|
| Host Mode | `/` | Full controls — start, skip phases, reset. Ideal for projecting on a big screen. |
| Player Mode | `/?mode=player` | Answer-only view without host controls. |

## Quizzes

Quizzes are defined as static JSON files in `public/quizzes/`. Drop a new JSON file there to add your own quiz — no backend required.

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Zustand — runs entirely client-side.

## Getting started

```bash
npm install
npm run dev
```
