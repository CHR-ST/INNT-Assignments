# Naboindkøb

Naboindkøb er en mobilapp-prototype, hvor naboer kan skrive varer på en fælles indkøbsliste, og hjælpere kan vælge varer til deres egen indkøbstur.

Projektet er lavet i faget Innovation og nye teknologier på Copenhagen Business School.

## Funktioner

- Opret konto og log ind med e-mail og adgangskode.
- Vælg rollen **nabo** eller **hjælper**.
- Tilføj varer manuelt med varenavn, mærke og antal.
- Søg frivilligt efter produktforslag via Prej API. Hvis der ikke findes et forslag, kan varen stadig tilføjes manuelt.
- Gem og synkronisér varer i Firebase Firestore.
- Vælg én vare direkte via varekortet eller alle ledige varer for én nabo.
- Se hjælperens indkøbstur opdelt efter, hvem varerne er til, og afkryds hele varekortet som fundet.
- Skift testrolle fra profilsiden, så begge flows kan afprøves på samme konto.

## Teknologi

- React Native og Expo
- React Navigation
- Firebase Authentication
- Firebase Firestore
- Prej API

## Sådan kører du appen

### 1. Installer projektet

Du skal have [Node.js](https://nodejs.org/) installeret. Installer gerne **Expo Go** på din mobiltelefon, hvis du vil teste på en fysisk enhed.

```bash
git clone <REPOSITORY-URL>
cd INNT_Exercises/min_app
npm install
```

### 2. Opret miljøvariabler

Opret en fil, der hedder `.env`, i mappen `min_app`. Firebase-værdierne findes under **Firebase Console → Project settings → Your apps → SDK setup and configuration**.

```env
EXPO_PUBLIC_FIREBASE_API=din_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=dit-projekt.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=dit-projekt-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=dit-projekt.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=dit_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=dit_app_id
EXPO_PUBLIC_PREJ_API_KEY=din_prej_api_noegle
```

`EXPO_PUBLIC_` bruges af Expo for at gøre værdierne tilgængelige i mobilappen. Prej-nøglen bruges kun, når brugeren aktivt trykker på **Søg produktforslag**. Den gratis Prej-plan har et begrænset antal kald pr. dag.

### 3. Opsæt Firebase

1. Opret et Firebase-projekt og tilføj en **web-app**.
2. Under **Authentication → Sign-in method**: aktivér **Email/Password**.
3. Under **Firestore Database**: opret databasen.
4. Indsæt disse Firestore-regler, så kun brugere der er logget ind kan læse og skrive:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{itemId} {
      allow read, write: if request.auth != null;
    }

    match /users/{userId} {
      allow read, create, update: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

### 4. Opsæt Prej API (valgfrit)

Opret en gratis API-nøgle på [prej.dk](https://prej.dk/) og indsæt den som `EXPO_PUBLIC_PREJ_API_KEY` i `.env`. Appen fungerer stadig uden en Prej-nøgle; produktforslag vil blot vise en fejlbesked, og varen kan tilføjes manuelt.

### 5. Start appen

```bash
npx expo start
```

Scan QR-koden med Expo Go, eller åbn appen i en Android-/iOS-simulator. Genstart Expo-serveren, hvis du ændrer `.env`.

## Projektstruktur

```text
min_app/
├── App.js                    # Fælles app-state, Firestore og navigation
├── components/               # Genbrugelige inputfelter, knapper og varekort
├── database/firebase.js      # Firebase-forbindelse og vedvarende login
├── screens/                  # Appens skærme og brugerflows
├── services/prej.js          # Kald til Prej API og simpel cache
└── styles/                   # Farver og styling opdelt efter formål
```

## Afgrænsning

Dette er en prototype. Alle loggede ind hjælpere kan i den nuværende version se fælles, åbne varer; der er ikke lavet invitationer eller adgangsstyring mellem specifikke naboer og hjælpere. Firebase- og Prej-værdier skal opsættes af den, der kører sin egen kopi af projektet.
