# University platform front-end

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/asmaes-projects-79bc55e6/v0-university-platform-front-end)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/kIbpQNUqG3I)

## Overview

Plateforme de gestion universitaire développée avec Next.js 16, TypeScript, et Tailwind CSS.

## Équipe de développement

- Asmae SERJI
- Ahlam ELBECHARRI
- Malak MALK
- Safae ELHAMDAOUI

## 📦 Architecture du Projet

Ce projet est le **frontend Next.js** de la plateforme universitaire. Il communique avec un **backend Java** composé de :
- 3 services SOAP (Students, Teachers, Courses) sur ports 8089, 8087, 8086
- 1 service REST (Enrollments, Notifications, Academic Tracking) sur port 8090
- Base de données PostgreSQL

**Coordinateur:** Hatim GUERMAH

- **Next.js 16** avec App Router
- **REST API** via Axios pour inscriptions, départements, modules et notes
- **SOAP Web Services** pour authentification et gestion des étudiants/enseignants/cours
- **TypeScript** pour la sécurité des types
- **Tailwind CSS v4** pour le design

## Configuration

### Mode Mock (Développement par défaut)

Par défaut, l'application utilise des données mock pour le développement sans backend :

\`\`\`env
NEXT_PUBLIC_USE_MOCK_DATA=true
\`\`\`

### Mode Production (Backend Java Réel)

Pour connecter au backend Java, créez un fichier `.env.local` :

\`\`\`env
# Désactiver les données mock
NEXT_PUBLIC_USE_MOCK_DATA=false

# URLs des services SOAP
NEXT_PUBLIC_SOAP_STUDENTS_URL=http://localhost:8089
NEXT_PUBLIC_SOAP_TEACHERS_URL=http://localhost:8087
NEXT_PUBLIC_SOAP_COURSES_URL=http://localhost:8086

# URL du service REST
NEXT_PUBLIC_REST_BASE_URL=http://localhost:8090
\`\`\`

Vous pouvez aussi configurer ces variables dans la section **Vars** de la barre latérale v0.

## Installation et démarrage

\`\`\`bash
# Installer les dépendances
npm install

# Mode développement (avec mock data)
npm run dev

# Mode production locale (avec backend réel)
NEXT_PUBLIC_USE_MOCK_DATA=false npm run dev
\`\`\`

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## Structure du projet

\`\`\`
├── app/                      # Pages Next.js
│   ├── login/               # Connexion (SOAP)
│   ├── register/            # Inscription (SOAP)
│   ├── students/            # Gestion étudiants (SOAP)
│   ├── teachers/            # Gestion enseignants (SOAP)
│   ├── courses/             # Gestion cours (SOAP)
│   ├── enrollments/         # Inscriptions (REST)
│   └── academic-tracking/   # Suivi académique (REST)
├── components/              # Composants UI réutilisables
├── lib/
│   ├── api/                # Services API
│   ├── clients/            # Clients REST (Axios) et SOAP (XML)
│   └── config/             # Configuration endpoints
└── public/                 # Ressources statiques
\`\`\`

## Services Backend

### REST API Endpoints
- `/api/enrollments` - Inscriptions
- `/api/departments` - Départements
- `/api/modules` - Modules
- `/api/marks` - Notes
- `/api/academic-tracking` - Suivi académique

### SOAP Web Services
- `AuthenticationService` - login, register
- `StudentService` - CRUD Étudiants
- `TeacherService` - CRUD Enseignants
- `CourseService` - CRUD Cours

## Fonctionnalités

- ✅ Authentification SOAP (login/register)
- ✅ Gestion complète des étudiants
- ✅ Gestion des enseignants
- ✅ Gestion des cours
- ✅ Système d'inscriptions
- ✅ Suivi académique avec notes
- ✅ Dashboard avec statistiques
- ✅ Interface responsive
- ✅ Gestion d'erreurs et loading states



## Build pour production

\`\`\`bash
npm run build
npm start
\`\`\`

Les variables d'environnement doivent être configurées dans les paramètres Vercel pour la production.

## 📚 Documentation Additionnelle

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide complet de déploiement et configuration monorepo
- **[Architecture Backend](./DEPLOYMENT.md#architecture-actuelle)** - Détails des services Java SOAP/REST
- **[Configuration Docker](./DEPLOYMENT.md#option-1--monorepo-recommandé-pour-le-développement)** - Orchestration complète
