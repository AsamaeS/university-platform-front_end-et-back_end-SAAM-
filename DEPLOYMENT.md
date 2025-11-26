# Guide de Déploiement - Backend Java + Frontend Next.js

## Architecture Actuelle

Le projet est organisé en deux parties :
- **Frontend** : Next.js (ce dépôt GitHub)
- **Backend** : Services Java SOAP/REST (dépôt séparé)

## Options pour Lier Backend et Frontend

### Option 1 : Monorepo (Recommandé pour le développement)

Organisez votre projet avec cette structure :

\`\`\`
university-platform/
├── frontend/                 # Ce projet Next.js
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── next.config.mjs
│
├── backend/                  # Projet Java
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   ├── soap/
│   │       │   │   ├── StudentService.java
│   │       │   │   ├── TeacherService.java
│   │       │   │   └── CourseService.java
│   │       │   └── rest/
│   │       │       ├── InscriptionResource.java
│   │       │       └── NotificationResource.java
│   │       └── resources/
│   ├── pom.xml
│   └── target/
│
├── docker-compose.yml        # Pour orchestrer les services
├── .gitignore
└── README.md
\`\`\`

#### Étapes de Configuration :

**1. Créer la structure monorepo**
\`\`\`bash
# Créer le dossier racine
mkdir university-platform
cd university-platform

# Déplacer le frontend existant
git clone <url-frontend-repo> frontend

# Ajouter le backend Java
mkdir backend
# Copier vos fichiers Java dans backend/
\`\`\`

**2. Créer docker-compose.yml**
\`\`\`yaml
version: '3.8'

services:
  # Base de données PostgreSQL
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: universite_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Backend Java - Service SOAP Students
  soap-students:
    build:
      context: ./backend
      dockerfile: Dockerfile.students
    ports:
      - "8089:8089"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/universite_db

  # Backend Java - Service SOAP Teachers
  soap-teachers:
    build:
      context: ./backend
      dockerfile: Dockerfile.teachers
    ports:
      - "8087:8087"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/universite_db

  # Backend Java - Service SOAP Courses
  soap-courses:
    build:
      context: ./backend
      dockerfile: Dockerfile.courses
    ports:
      - "8086:8086"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/universite_db

  # Backend Java - Service REST
  rest-api:
    build:
      context: ./backend
      dockerfile: Dockerfile.rest
    ports:
      - "8090:8090"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/universite_db

  # Frontend Next.js
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - soap-students
      - soap-teachers
      - soap-courses
      - rest-api
    environment:
      # URLs backend en mode Docker
      NEXT_PUBLIC_SOAP_STUDENTS_URL: http://soap-students:8089
      NEXT_PUBLIC_SOAP_TEACHERS_URL: http://soap-teachers:8087
      NEXT_PUBLIC_SOAP_COURSES_URL: http://soap-courses:8086
      NEXT_PUBLIC_REST_BASE_URL: http://rest-api:8090
      NEXT_PUBLIC_USE_MOCK_DATA: "false"

volumes:
  postgres_data:
\`\`\`

**3. Créer Dockerfiles pour le backend Java**

`backend/Dockerfile.students`:
\`\`\`dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/student-service.jar app.jar
EXPOSE 8089
CMD ["java", "-jar", "app.jar", "StudentServicePublisher"]
\`\`\`

**4. Créer Dockerfile pour le frontend**

`frontend/Dockerfile`:
\`\`\`dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**5. Démarrer tout le système**
\`\`\`bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter tous les services
docker-compose down
\`\`\`

---

### Option 2 : Dépôts Séparés avec CI/CD

Structure avec deux dépôts GitHub :
- `university-platform-frontend` (actuel)
- `university-platform-backend` (nouveau)

**Configuration du Frontend (.env.production)**
\`\`\`env
# URLs backend en production
NEXT_PUBLIC_SOAP_STUDENTS_URL=https://api.votre-domaine.com:8089
NEXT_PUBLIC_SOAP_TEACHERS_URL=https://api.votre-domaine.com:8087
NEXT_PUBLIC_SOAP_COURSES_URL=https://api.votre-domaine.com:8086
NEXT_PUBLIC_REST_BASE_URL=https://api.votre-domaine.com:8090
NEXT_PUBLIC_USE_MOCK_DATA=false
\`\`\`

**Déploiement :**
- **Frontend** : Déployé sur Vercel (bouton "Publish" dans v0)
- **Backend** : Déployé sur un serveur VPS, AWS, ou Google Cloud

---

### Option 3 : Développement Local Sans Docker

Pour le développement local sans Docker :

**1. Démarrer le backend Java**
\`\`\`bash
cd backend

# Compiler et démarrer chaque service dans un terminal séparé
# Terminal 1 - Service Students
mvn clean package
java -jar target/student-service.jar StudentServicePublisher

# Terminal 2 - Service Teachers
java -jar target/teacher-service.jar TeacherServicePublisher

# Terminal 3 - Service Courses
java -jar target/course-service.jar CourseServicePublisher

# Terminal 4 - Service REST
java -jar target/rest-service.jar RestApplication
\`\`\`

**2. Configurer le frontend**

Créer `frontend/.env.local`:
\`\`\`env
NEXT_PUBLIC_SOAP_STUDENTS_URL=http://localhost:8089
NEXT_PUBLIC_SOAP_TEACHERS_URL=http://localhost:8087
NEXT_PUBLIC_SOAP_COURSES_URL=http://localhost:8086
NEXT_PUBLIC_REST_BASE_URL=http://localhost:8090
NEXT_PUBLIC_USE_MOCK_DATA=false
\`\`\`

**3. Démarrer le frontend**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Accéder à l'application : http://localhost:3000

---

## Recommandations par Équipe

### Pour le développement (équipe de 4 personnes) :
✅ **Option 1 (Monorepo + Docker)** 
- Configuration une seule fois
- Tout le monde a le même environnement
- Un seul `docker-compose up` démarre tout

### Pour la production :
✅ **Option 2 (Dépôts séparés + CI/CD)**
- Frontend sur Vercel (gratuit, rapide)
- Backend sur serveur dédié
- Scalabilité indépendante

### Pour tester rapidement :
✅ **Option 3 (Développement local)**
- Pas besoin de Docker
- Bon pour déboguer

---

## Configuration PostgreSQL

Créer la base de données :

\`\`\`sql
CREATE DATABASE universite_db;

-- Tables principales
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    filiere VARCHAR(100),
    annee INTEGER
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    specialite VARCHAR(100),
    departement VARCHAR(100)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(200),
    description TEXT,
    enseignant_id INTEGER REFERENCES teachers(id),
    credits INTEGER,
    places_disponibles INTEGER,
    horaires VARCHAR(200)
);

CREATE TABLE inscriptions (
    id SERIAL PRIMARY KEY,
    etudiant_id INTEGER REFERENCES students(id),
    cours_id INTEGER REFERENCES courses(id),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    destinataire_id INTEGER,
    message TEXT,
    type VARCHAR(20),
    statut VARCHAR(20),
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## Prochaines Étapes

1. ✅ Choisir l'option qui convient à votre équipe
2. ✅ Configurer PostgreSQL
3. ✅ Mettre à jour les URLs dans `.env.local` ou `.env.production`
4. ✅ Tester la connexion backend-frontend
5. ✅ Déployer en production

Pour toute question, consultez le README.md principal.
