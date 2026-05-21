# Pragmatic architecture fit for requested outcomes

QuizHuis is frontend-first by default, but architecture decisions must fit the requested feature outcomes. A feature can remain frontend-only, use a hybrid split, or add backend responsibilities when required to satisfy explicit behavior.

**Why:** A hard frontend-only rule is too restrictive for valid requests like cross-device multiplayer, persistence, authentication, or server-authoritative timing. Outcome-driven decisions preserve simplicity for the current single-device flow while allowing targeted expansion when needed.

**Trade-off:** This increases decision overhead and can introduce operational complexity for some features. To keep scope controlled, any backend addition must be minimal and directly traceable to explicit feature requirements.
