# Eventos Comunitarios

Proyecto de registro y consulta de eventos comunitarios con React y Express.

## Estructura

- `frontend/`: SPA con React, Vite y React Router.
- `backend/`: API REST con Express y almacenamiento en JSON.

## Ejecución

Usar dos terminales distintas.

Terminal 1 (frontend, puerto 5173):

```bash
cd frontend
npm install
npm run dev
```

Terminal 2 (backend, puerto 3000):

```bash
cd backend
npm install
npm start
```

## Rutas del frontend

- `/`: Inicio
- `/registro`: Registrar evento
- `/lista`: Explorar eventos
