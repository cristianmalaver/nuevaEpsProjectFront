# nuevaEpsProject
Sistema full-stack para la gestión de solicitudes de medicamentos en una EPS, construido con **Spring Boot** y **Angular**.

---

## Tecnologías

**Backend:**
- Java 17+
- Spring Boot 3
- Spring Security con JWT
- JPA / Hibernate
- MySQL
- Arquitectura en capas: `controller`, `service`, `service.impl`, `repository`, `entity`, `dto`, `config`

**Frontend:**
- Angular 20 (standalone components)
- Reactive Forms
- Guards y HTTP Interceptor para JWT
- Arquitectura organizada por features (`auth`, `core`, `solicitudes`)

---

### Estructura 

backend/           -> Spring Boot (Java 17+)
  src/
    main/
      java/
        com.eps/...
      resources/
        application.properties
  pom.xml
  .gitignore

frontend/          -> Angular 20
  src/
    app/
      auth/
      core/
      solicitudes/
  angular.json
  package.json
  tsconfig.json
  .gitignore



### Instalación y ejecución LOCAL

cd backend
mvn clean install        # o ./gradlew build si usas Gradle
mvn spring-boot:run      # levantar servidor puerto 8080 default

cd frontend
npm install
ng serve --open          # abrir en localhost:4200

### ENDPOINTS
-  http://localhost:8080/auth/register                          POST
-  http://localhost:8080/api/solicitudes                        GET
-  http://localhost:8080/api/solicitudes                        POST
-  http://localhost:8080/api/solicitudes?page=0&size=2          GET
-  http://localhost:8080/auth/login                             POST
-  http://localhost:8080/api/medicamentos                       GET


## 🏗 Funcionalidades

### Autenticación
- Registro de usuario (`POST /api/auth/register`)
- Login con JWT (`POST /api/auth/login`)
- Rutas protegidas por **AuthGuard**
- Interceptor para enviar token automáticamente

### Solicitudes de medicamentos
- Listado de solicitudes con paginación y diseño profesional
- Crear nueva solicitud:
  - Selección de medicamento (POS / NO POS)
  - Campos adicionales para medicamentos NO POS:
    - número de orden
    - dirección
    - teléfono
    - correo
- Backend retorna JSON según tipo de medicamento

### Medicamentos
- Endpoint protegido: `GET /api/medicamentos`
- Respuesta ejemplo:

```json
[
  { "id": 1, "nombre": "Acetaminofén", "descripcion": "Analgésico", "esPos": true },
  { "id": 2, "nombre": "Ibuprofeno", "descripcion": "Antiinflamatorio", "esPos": true },
  { "id": 3, "nombre": "Medicamento Especial X", "descripcion": "Especial", "esPos": false }
]
