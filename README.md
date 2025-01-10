# Application de Transcription Audio

Cette application web permet de transcrire des fichiers audio en texte. Elle offre une interface utilisateur intuitive pour télécharger des fichiers audio et suivre l'état des transcriptions.

## Fonctionnalités

- Upload de fichiers audio par glisser-déposer ou sélection classique
- Suivi en temps réel de l'état des transcriptions
- Visualisation du texte transcrit et des segments temporels
- Historique des transcriptions
- Conservation des tâches pendant 2 jours
- Interface entièrement en français

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (inclus avec Node.js)

## Installation

1. Clonez le dépôt ou téléchargez les fichiers source

2. Installez les dépendances :
```bash
npm install
```

## Configuration

L'application se connecte à l'API de transcription à l'adresse `https://transcript.test`. 

Pour modifier l'URL de l'API, modifiez la constante `API_BASE_URL` dans le fichier `src/api.js`.

## Démarrage de l'application

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse indiquée dans la console (généralement `http://localhost:5173`).

## Structure du projet

```
├── src/
│   ├── components/         # Composants React
│   │   ├── FileUpload.jsx        # Composant d'upload de fichiers
│   │   ├── TasksTable.jsx        # Liste des tâches
│   │   ├── TranscriptionModal.jsx # Modal du texte complet
│   │   ├── SegmentsModal.jsx     # Modal des segments
│   │   └── TaskInfoModal.jsx     # Modal des informations
│   ├── api.js             # Configuration et appels API
│   ├── translations.js    # Traductions françaises
│   ├── storage.js         # Gestion du stockage local
│   └── App.jsx            # Composant principal
├── index.html
└── package.json
```

## API Backend

L'application interagit avec une API REST qui expose les endpoints suivants :

### POST /transcribe/
- URL : `https://transcript.test/transcribe/`
- Accepte un fichier audio via multipart/form-data
- Retourne un ID de tâche

### GET /status/{task_id}
- URL : `https://transcript.test/status/{task_id}`
- Retourne l'état d'avancement d'une transcription
- États possibles : PENDING, PROCESSING, COMPLETED, FAILED
- Pour les tâches complétées, retourne le texte et les segments de transcription

## Technologies utilisées

- React
- Vite
- Tailwind CSS
- Local Storage pour la persistance
