## 1. Visión General de la Arquitectura
La aplicación **Bike Store** adopta un patrón de arquitectura **Cliente-Servidor de 3 Capas (N-Tiers)** desacoplado, utilizando servicios web bajo el estándar **REST API**.

- **Capa de Presentación (Frontend):** Desarrollada con React y Vite, encargada de la interfaz de usuario y consumo de endpoints HTTP.
- **Capa de Negocio y Lógica (Backend API):** Servidor HTTP construido con Node.js y Express, estructurado bajo el patrón MVC (Rutas, Controladores y Middlewares).
- **Capa de Persistencia (Base de Datos):** Sistema Gestor de Base de Datos Relacional MySQL (`tienda`), gestionado mediante pools de conexión asíncronos (`mysql2`).

## 2. Esquema y Flujo de Comunicación (Diagrama)
```mermaid
graph TD
    A[Cliente Web: React + Vite] -->|Peticiones HTTP / REST API| B[Servidor Backend: Express.js]
    B -->|Middleware CORS & Auth JWT| C[Controladores de Negocio]
    C -->|Consultas SQL Pool| D[(Base de Datos MySQL: tienda)]
    D -->|Respuesta Datos| C
    C -->|Respuesta JSON| A
    