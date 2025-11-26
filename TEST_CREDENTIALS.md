# Identifiants de Test

## Mode Développement (Mock Data)

En mode développement, vous pouvez vous connecter avec les identifiants suivants:

### Étudiants

| Nom | Numéro Étudiant | Mot de passe | Email |
|-----|----------------|--------------|-------|
| Asmae SERJI | `STU001` | `password123` | asmae.serji@university.ma |
| Ahlam ELBECHARRI | `STU002` | `password123` | ahlam.elbecharri@university.ma |
| Malak MALK | `STU003` | `password123` | malak.malk@university.ma |
| Safae ELHAMDAOUI | `STU004` | `password123` | safae.elhamdaoui@university.ma |
| Youssef ALAMI | `STU005` | `password123` | youssef.alami@university.ma |

### Enseignants

| Nom | Email | Mot de passe |
|-----|-------|--------------|
| Mohammed BENNANI | mohammed.bennani@university.ma | `teacher123` |
| Fatima ZAHRAE | fatima.zahrae@university.ma | `teacher123` |
| Ahmed KADIRI | ahmed.kadiri@university.ma | `teacher123` |
| Samira TAZI | samira.tazi@university.ma | `teacher123` |
| Hatim GUERMAH | hatim.guermah@university.ma | `teacher123` |

## Mode Production (Backend Java)

En mode production, les identifiants sont gérés par le backend Java via les services SOAP d'authentification.

### Configuration

Pour activer le backend réel:

1. Créez un fichier `.env.local`:
\`\`\`bash
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_SOAP_AUTH_URL=http://localhost:8088/auth
NEXT_PUBLIC_SOAP_STUDENTS_URL=http://localhost:8089/students
NEXT_PUBLIC_SOAP_TEACHERS_URL=http://localhost:8087/teachers
NEXT_PUBLIC_SOAP_COURSES_URL=http://localhost:8086/courses
NEXT_PUBLIC_REST_BASE_URL=http://localhost:8090/api
\`\`\`

2. Les identifiants seront alors ceux configurés dans votre base de données PostgreSQL

### Comment tester

#### Pour les étudiants:
1. Allez sur la page d'accueil `/`
2. Cliquez sur "Connexion Étudiant"
3. Entrez un numéro d'étudiant (ex: `STU001`)
4. Entrez le mot de passe: `password123`
5. Cliquez sur "Se connecter"

#### Pour les enseignants:
1. Allez sur la page d'accueil `/`
2. Cliquez sur "Connexion Enseignant"
3. Entrez un email (ex: `hatim.guermah@university.ma`)
4. Entrez le mot de passe: `teacher123`
5. Cliquez sur "Se connecter"

## Notes de Sécurité

- **Ces mots de passe sont uniquement pour le développement**
- En production, les utilisateurs doivent créer leurs propres comptes via le backend
- Les mots de passe en production doivent être forts et uniques
- Le backend Java gère le hashing et la sécurité des mots de passe
