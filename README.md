# Naboindkøb

Naboindkøb er en prototype på en mobilapp, der gør det nemmere for naboer at hjælpe hinanden med indkøb. En nabo kan tilføje en vare til en fælles indkøbsliste, og en hjælper kan vælge en persons liste og markere varerne som fundet under indkøbsturen.

Projektet er lavet som en del af faget Innovation og nye teknologier på Copenhagen Business School.

## Funktioner

- Tilføj en vare med navn, mærke, antal og modtager.
- Se den samlede indkøbsliste, grupperet efter modtager.
- Start et indkøb for en bestemt nabo.
- Markér varer som fundet, eller fjern markeringen igen.
- Se fremdrift for det valgte indkøb.

## Teknologi

- React Native
- Expo
- React Navigation

## Sådan kører du appen

### Forudsætninger

Du skal have [Node.js](https://nodejs.org/) installeret. Du kan desuden installere **Expo Go** på din telefon, hvis du vil teste appen på en fysisk enhed.

### Installation

```bash
git clone <REPOSITORY-URL>
cd <repository-mappe>
npm install
npx expo start
```

Scan derefter QR-koden med Expo Go, eller vælg at åbne appen i en iOS-/Android-simulator eller i browseren.

## Projektstruktur

```
.
├── App.js                    # Navigation og fælles app-state
├── screens/
│   ├── AddItemScreen.js      # Formular til at tilføje varer
│   ├── ShoppingListScreen.js # Fælles liste grupperet efter nabo
│   └── BasketScreen.js       # Liste for det aktive indkøb
└── styles/
    └── GlobalStyle.js        # Fælles styling
```

## Afgrænsning

Dette er en frontend-prototype. Varer gemmes kun, mens appen er åben; der er endnu ikke brugerlogin, database, notifikationer eller forbindelse til supermarkeder.

## Demovideo
Download eller se [demovideoen](https://github.com/CHR-ST/INNT-Assignments/blob/main/DemoNabo.mp4).
