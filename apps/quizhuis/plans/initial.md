Ik wil een functionele React-frontend bouwen voor een interactieve quiz-applicatie (vergelijkbaar met Kahoot). De app moet schaalbaar zijn en gebruikmaken van Tailwind CSS voor de styling.

1. Kernfunctionaliteit: De Matching Vraag
Ontwikkel een specifiek component genaamd 'MatchingQuestion'. Dit component moet:

Twee kolommen tonen: een set 'Items' (links) en een set 'Targets' (rechts).

Gebruikers in staat stellen om een item van links te verbinden met een item van rechts via drag-and-drop of door opeenvolgend op beide te klikken.

Visuele feedback geven (bijv. lijnen trekken tussen gekoppelde woorden of kleurveranderingen).

Voorbeelddata: Links [Boot, Huis, Jaar], Rechts [House, Year, Boat].

2. Technische Vereisten
State Management: Gebruik React Hooks (useState, useEffect) om de huidige koppelingen bij te houden.

Libraries: Gebruik 'framer-motion' voor vloeiende animaties en 'dnd-kit' of 'react-beautiful-dnd' voor de drag-and-drop logica.

Responsiviteit: De interface moet werken op zowel desktop als mobiel (touch-support).

Architectuur: Hanteer een heldere scheiding tussen de UI-componenten en de logica voor het controleren van de antwoorden.

3. UI/UX Design
Modern, speels design met felle kleuren (Kahoot-stijl).

Duidelijke 'Submit' knop die pas actief wordt als alle paren zijn gekoppeld.

Succes- en foutmeldingen met animaties zodra het antwoord is gecontroleerd.