# SafeLogin - Fullstack Auth App

Ce repository contient le frontend de l’application SafeLogin.

➡️ Repository du backend :
https://github.com/omnyazer/safelogin-back.git

SafeLogin est une application d'authentification fullstack (frontend + backend) construite pour démontrer une architecture propre, la sécurité des mots de passe et la protection des routes avec JWT.

## Stack technique

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- React Hot Toast

### Backend
- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA / Hibernate
- JWT (`jjwt`)
- MySQL
- Maven

## Fonctionnalités

- Inscription et connexion
- Validation des champs côté frontend et backend
- Hashage des mots de passe avec BCrypt
- Réponses API JSON structurées (`success`, `message`, `token`)
- Gestion centralisée des erreurs
- Authentification JWT côté backend
- Routes protégées et gestion des rôles (`USER` / `ADMIN`)
- Interface responsive avec dark mode et animations

## Structure du projet

```text
safelogin-front/
  src/
    components/
    context/
    pages/
    services/

safelogin-back/
  src/main/java/com/safelogin/
    controller/
    service/
    repository/
    entity/
    dto/
    config/
```

## Prérequis

- Node.js 18+
- Java 17+
- Maven (ou `./mvnw`)
- MySQL

## Configuration backend (important)

Le backend lit la config DB dans `safelogin-back/src/main/resources/application.properties`.

Configuration actuelle (MAMP):

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:8889/safelogin
spring.datasource.username=root
spring.datasource.password=root
```

Si vous utilisez un autre MySQL local (ex: Homebrew sur 3306), adaptez ces valeurs.

## Lancer le projet en local

## 1) Backend

```bash
cd /Users/omnyazer/eclipse-workspace/safelogin-back
./mvnw spring-boot:run
```

Backend disponible sur `http://localhost:8080`.

## 2) Frontend

```bash
cd /Users/omnyazer/eclipse-workspace/safelogin-front
npm install
npm run dev
```

Frontend disponible sur `http://localhost:5173`.

## Endpoints principaux (backend)

- `POST /register`
- `POST /login`
- `GET /profile` (authentifié)
- `GET /dashboard` (authentifié)
- `GET /users` (ADMIN)
- `DELETE /users/{id}` (ADMIN)
- `PUT /change-password` (authentifié)

## Exemples rapides (curl)

### Register

```bash
curl -i -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo_user","password":"123456"}'
```

### Login

```bash
curl -i -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo_user","password":"123456"}'
```

## Points techniques clés

- Architecture en couches (`controller/service/repository`)
- DTO pour structurer les échanges API
- `@Valid`, `@NotBlank`, `@Size` pour la validation
- `@RestControllerAdvice` pour les erreurs globales
- `SecurityFilterChain` + `JwtAuthenticationFilter` pour la sécurité

## Notes

- Le frontend gère actuellement la session UI via `localStorage`.
- Le backend expose déjà un token JWT au login pour la sécurisation API.


