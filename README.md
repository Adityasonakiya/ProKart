# ProKart

Role-based e-commerce web application built with Angular and Spring Boot.

## Overview
ProKart is a full-stack shopping platform with separate experiences for guests, users, and admins.

- Guests can browse the landing page and register/login.
- Users can browse products, add to cart, place orders, track orders, and manage reviews.
- Admins can manage products, view customer reviews, and monitor/update orders.

## Key Features
- JWT-based authentication and authorization
- Role-based routing and API protection (`admin`, `user`)
- Product CRUD for admins
- Product browsing, search, category filtering, and review viewing for users
- Cart and checkout flow with address capture
- Order placement, status updates, cancel flow, and order history
- Review creation, listing, and deletion
- Image upload via Cloudinary
- OpenStreetMap/Leaflet map section on landing page
- Toast notifications with `ngx-toastr`

## Tech Stack
- Frontend: Angular 10, TypeScript, RxJS, Angular Router, Reactive Forms
- Backend: Spring Boot 3, Spring Security, Spring Data JPA, JWT
- Database: MySQL
- API Docs: springdoc OpenAPI + Swagger UI
- Media: Cloudinary

## Project Structure
```text
ProKart/
|- angularapp/   # Angular frontend
|- springapp/    # Spring Boot backend
```

## Prerequisites
- Node.js + npm (compatible with Angular 10)
- Java 17
- Maven 3.8+
- MySQL 8+

## Local Setup
### 1) Configure MySQL
Create a database named `proKart`.

Backend DB config is currently in `springapp/src/main/resources/application.properties`:
- URL: `jdbc:mysql://localhost:3306/proKart`
- Username: `root`
- Password: `Mysql@123`

Update these values for your local environment.

### 2) Start Backend (Spring Boot)
```bash
cd springapp
./mvnw spring-boot:run
```
On Windows:
```powershell
cd springapp
.\mvnw.cmd spring-boot:run
```
Backend runs on `http://localhost:8080`.

### 3) Start Frontend (Angular)
```bash
cd angularapp
npm install
npm start
```
Frontend runs on `http://localhost:8081`.

The frontend API base URL is configured in `angularapp/src/environments/environment.ts` as:
`BACKEND_URL: 'http://localhost:8080'`

## API Entry Points
- Auth: `/api/register`, `/api/login`
- Products: `/api/products`
- Orders: `/api/orders`
- Reviews: `/api/reviews`

Swagger UI is enabled via springdoc and typically available at:
- `http://localhost:8080/swagger-ui/index.html`

## Notes
- JWT secret and database credentials are currently hardcoded for local development. Move them to environment variables before production deployment.
- Cloudinary upload preset is configured in `angularapp/src/app/services/cloudinaryService.service.ts`.

## Future Improvements
- Move secrets/config to environment variables and secret manager
- Add Docker setup for one-command local startup
- Add integration and E2E test coverage
- Add CI pipeline (build, test, lint, quality gate)
