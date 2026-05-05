# QuizHuis

A Kahoot-style interactive quiz platform that runs entirely client-side. A single human player competes against optional simulated opponents, playing through a fixed sequence of questions with time-based scoring.

## Language

### Core domain

**Quiz**:
A fixed sequence of questions designed to be played start-to-finish in one session.
_Avoid_: Game, template, question bank

**Question**:
A single challenge within a quiz. Has a type, prompt, time limit, and base points.
_Avoid_: Challenge, round

**Phase**:
The current position in the game lifecycle. Phases advance in a fixed order.
_Avoid_: State (overloaded with technical meaning), stage, step

**Player**:
A participant in the quiz session — either the human or a simulated opponent.
_Avoid_: User, participant

**Simulated Player**:
A bot opponent with configurable accuracy and reaction speed.
_Avoid_: Bot (acceptable in UI), AI player, NPC

**Player Preset**:
A named configuration that determines how many simulated players join and their behavior.
_Avoid_: Difficulty, mode

### Question types

**Matching Question**:
A question where the player connects Items to Targets. Scored partially — each correct pair earns points independently.
_Avoid_: Pairing question, connect question

**Item**:
An element in the left column of a matching question — the thing being matched FROM.
_Avoid_: Prompt, term, left

**Target**:
An element in the right column of a matching question — the thing being matched TO.
_Avoid_: Answer, definition, right

**Multiple Choice Question**:
A question with several options where exactly one is correct.

**Boolean Question**:
A true/false question.
_Avoid_: True/false question (acceptable in UI labels)

### Game flow

**Host Mode**:
The view with full controls — start quiz, skip phases, reset. Default mode. Useful for projecting on a big screen while controlling the flow.
_Avoid_: Admin, controller

**Player Mode**:
The view without host controls. Shows only the quiz content and answer UI. Accessed via `?mode=player`.
_Avoid_: Spectator, presentation

**Lobby**:
The initial phase where the quiz is loaded, player preset is selected, and the session starts.

**Result Reveal**:
The phase after a question ends where the correct answer and per-question scores are shown.
_Avoid_: Answer reveal, feedback

**Leaderboard**:
Shown after every question (Kahoot-style). Displays cumulative scores ranked. Acts as the final screen on the last question.
_Avoid_: Scoreboard, rankings

## Relationships

- A **Quiz** contains one or more **Questions** in a fixed order
- A **Question** has exactly one type: **Matching**, **Multiple Choice**, or **Boolean**
- A **Matching Question** contains one or more **Items** and one or more **Targets**
- Each **Item** has exactly one correct **Target** (the correct pair)
- A **Player** submits at most one answer per **Question**
- A **Player Preset** produces a set of **Simulated Players** with randomized behavior

## Example dialogue

> **Dev:** "When a **Player** submits an answer during a **Matching Question**, does the score depend on how many pairs are correct?"
> **Domain expert:** "Yes — each correct **Item**→**Target** pair earns its fraction of the base points, multiplied by the time bonus."

> **Dev:** "Can the **Host** skip the **Result Reveal** and go straight to the **Leaderboard**?"
> **Domain expert:** "Yes — the host can manually advance any **Phase**."

## Flagged ambiguities

- "state" was ambiguous between **Phase** (domain concept: where are we in the game?) and React/Zustand state (technical concept). Resolved: use **Phase** for the domain concept.
- "host" could imply a separate person managing the session. Resolved: **Host Mode** is a view mode on the same device, not a separate role. There is only one human player.

## Conventions

- **Code language**: English (types, interfaces, variable names, documentation)
- **UI language**: Dutch (labels, prompts, feedback messages)
- **Scoring floor**: Always 0 — no negative points
- **Data source**: Static JSON in `public/quizzes/`. Loaded via `fetch()` — pattern is deliberately API-ready but no backend is planned.
