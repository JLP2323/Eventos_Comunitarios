#Sistema Web de Gestión de Eventos Comunitarios

Aplicación web Full Stack (**Single Page Application en React + API RESTful en Node.js/Express**) desarrollada para **registrar, validar, almacenar de forma persistente y consultar eventos comunitarios** especificando nombre del evento, organizador, correo electrónico de contacto, descripción de actividades, fecha programada y categoría temática.

---

## Tabla de Contenidos

1. [Alcance y Flujo de Datos](#-1-alcance-y-flujo-de-datos)
2. [Arquitectura y Estructura del Repositorio](#-2-arquitectura-y-estructura-del-repositorio)
3. [Requisitos Previos](#-3-requisitos-previos)
4. [Instalación y Configuración](#-4-instalación-y-configuración)
5. [Comandos de Ejecución y Puertos](#-5-comandos-de-ejecución-y-puertos)
6. [Rutas de la Aplicación Frontend (SPA)](#-6-rutas-de-la-aplicación-frontend-spa)
7. [Documentación y Ejemplos de Uso de la API REST](#-7-documentación-y-ejemplos-de-uso-de-la-api-rest)
8. [Almacenamiento Persistente y Pruebas](#-8-almacenamiento-persistente-y-pruebas)
9. [Distribución de Roles del Equipo](#-9-distribución-de-roles-del-equipo)

---

##  1. Alcance y Flujo de Datos

El sistema opera de extremo a extremo conectando el cliente React con el servidor Express mediante peticiones HTTP asíncronas e intercambio de datos en formato JSON:

```text
[Formulario Controlado en React (/registro)]
        │  1. Validación en cliente (src/validation.js)
        ▼
[Cliente HTTP Fetch (src/api.js)]
        │  2. Petición HTTP POST / GET (JSON) + CORS
        ▼
[Servidor API REST en Express (backend/server.js)]
        │  3. Validación en servidor + Generación de ID único
        ▼
[Almacenamiento Persistente (backend/eventos.json)]
        │  4. Lectura/escritura con fs sin perder registros previos
        ▼
[Consulta y Visualización en React (/lista -> EventCard.jsx)]
```

---

##  2. Arquitectura y Estructura del Repositorio

El proyecto está organizado en carpetas separadas para `frontend/` y `backend/` dentro del mismo repositorio raíz:

```text
Eventos_Comunitarios/
├── backend/
│   ├── eventos.json          # Archivo JSON de almacenamiento persistente
│   ├── package.json          # Dependencias y scripts del servidor (Express, CORS)
│   ├── package-lock.json     # Bloqueo de versiones de dependencias del backend
│   ├── server.js             # API REST (GET /registros y POST /registros)
│   └── server.test.js        # Suite de pruebas automatizadas de la API
│
├── frontend/
│   ├── public/               # Recursos estáticos e íconos
│   ├── src/
│   │   ├── assets/           # Imágenes e ilustraciones de la interfaz
│   │   ├── components/
│   │   │   ├── Layout.jsx    # Barra de navegación superior y contenedor reutilizable
│   │   │   └── EventCard.jsx # Tarjeta reutilizable para mostrar cada evento
│   │   ├── pages/
│   │   │   ├── Inicio.jsx    # Ruta "/" - Portada y bienvenida
│   │   │   ├── Registro.jsx  # Ruta "/registro" - Formulario controlado con validaciones
│   │   │   └── Lista.jsx     # Ruta "/lista" - Consulta, filtrado y estados de vista
│   │   ├── api.js            # Funciones HTTP Fetch (obtenerEventos, crearEvento)
│   │   ├── validation.js     # Reglas de validación de campos, email y fecha
│   │   ├── App.jsx           # Configuración de BrowserRouter, Routes y Route
│   │   ├── App.css           # Estilos de componentes y diseño responsive
│   │   ├── index.css         # Variables globales y reseteo CSS
│   │   └── main.jsx          # Punto de entrada de React
│   ├── index.html            # Plantilla HTML principal
│   ├── package.json          # Dependencias del cliente (React, React Router DOM, Vite)
│   ├── package-lock.json     # Bloqueo de versiones de dependencias del frontend
│   └── vite.config.js        # Configuración del servidor de desarrollo Vite
│
├── .gitignore                # Exclusión de node_modules/, dist/ y .env
└── README.md                 # Documentación general del proyecto
```

---

##  3. Requisitos Previos

Antes de ejecutar el proyecto en un entorno local, asegúrese de contar con:

- **Node.js**: Versión `18.0.0` o superior (recomendado `v20 LTS`).
- **npm**: Gestor de paquetes de Node.js (v9 o superior).
- **Git**: Para clonar el repositorio y gestionar el control de versiones.

---

##  4. Instalación y Configuración

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/JLP2323/Eventos_Comunitarios.git
cd Eventos_Comunitarios
```

### Paso 2: Instalar dependencias del Backend
```bash
cd backend
npm install
```

### Paso 3: Instalar dependencias del Frontend
```bash
cd ../frontend
npm install
```

### Paso 4: Variables de entorno (Opcional)
Por defecto, el frontend se conecta automáticamente a `http://localhost:3000`. Si desea personalizar la dirección del backend, puede crear un archivo `.env` dentro de `frontend/` con:
```env
VITE_API_URL=http://localhost:3000
```

---

## 5. Comandos de Ejecución y Puertos

Para ejecutar el sistema completo de extremo a extremo, abra **dos terminales distintas** desde la raíz del proyecto:

### Terminal 1 — Levantar el Servidor Backend (Express)
```bash
cd backend
npm start
```
- **Puerto del Backend:** `3000`
- **URL Base de la API:** `http://localhost:3000`
- **Endpoint de registros:** `http://localhost:3000/registros`

### Terminal 2 — Levantar el Cliente Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
- **Puerto del Frontend:** `5173`
- **URL de la Aplicación Web:** `http://localhost:5173`

### Resumen de Comandos Disponibles

| Ubicación | Comando | Descripción | Puerto |
| :--- | :--- | :--- | :---: |
| `backend/` | `npm start` | Inicia el servidor API REST en Node.js y Express. | `3000` |
| `backend/` | `npm test` | Ejecuta las pruebas automatizadas del servidor (`server.test.js`). | — |
| `frontend/` | `npm run dev` | Inicia el servidor de desarrollo de Vite con recarga en caliente (HMR). | `5173` |
| `frontend/` | `npm run build` | Compila la aplicación React para producción en la carpeta `dist/`. | — |
| `frontend/` | `npm run preview` | Previsualiza localmente la versión compilada de producción. | `4173` |

---

##  6. Rutas de la Aplicación Frontend (SPA)

La aplicación utiliza `react-router-dom` para gestionar la navegación sin recargar el navegador:

| Ruta | Vista / Componente | Responsabilidad Funcional |
| :--- | :--- | :--- |
| `/` | `pages/Inicio.jsx` | Página de bienvenida, presentación del propósito de la plataforma y accesos rápidos hacia el formulario y el listado. |
| `/registro` | `pages/Registro.jsx` | Formulario controlado por el estado de React para crear eventos comunitarios. Valida campos obligatorios, formato de email y fecha válida antes de enviar `POST /registros`. |
| `/lista` | `pages/Lista.jsx` | Consulta los eventos mediante `GET /registros`, gestiona estados de **carga**, **lista vacía** y **error de conexión**, permite filtrar por categoría y renderiza cada registro en tarjetas `EventCard.jsx`. |

---

##  7. Documentación y Ejemplos de Uso de la API REST

El servidor Express habilita `CORS` para permitir la comunicación con el frontend en React y utiliza JSON tanto en las peticiones como en las respuestas.

### 7.1 Consultar todos los eventos registrados (`GET /registros`)

Devuelve el listado completo de eventos almacenados en `backend/eventos.json`.

- **Método:** `GET`
- **URL:** `http://localhost:3000/registros`
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:3000/registros
  ```
- **Respuesta Exitosa (`200 OK`):**
  ```json
  [
    {
      "id": "1729036800001",
      "nombre": "Minga Comunitaria por el Parque Central",
      "organizador": "Comité Barrial Las Acacias",
      "email": "contacto@barrioacacias.org",
      "descripcion": "Jornada de limpieza, siembra de árboles nativos y pintura de bancas con participación vecinal.",
      "fecha": "2026-11-20",
      "categoria": "Medio Ambiente"
    }
  ]
  ```

---

### 7.2 Registrar un nuevo evento comunitario (`POST /registros`)

Valida los datos en el servidor, genera un identificador único (`id`), persiste el evento en `backend/eventos.json` conservando los registros anteriores y retorna el objeto creado.

- **Método:** `POST`
- **URL:** `http://localhost:3000/registros`
- **Encabezados (`Headers`):** `Content-Type: application/json`
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:3000/registros \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "Feria de Emprendimiento y Cultura",
      "organizador": "Junta Cívica Juvenil",
      "email": "feria@juntacivica.org",
      "descripcion": "Espacio abierto para artesanos locales, presentaciones de música folclórica y gastronomía tradicional.",
      "fecha": "2026-12-10",
      "categoria": "Cultura"
    }'
  ```

- **Respuesta Exitosa (`201 Created`):**
  ```json
  {
    "id": "1729037105492",
    "nombre": "Feria de Emprendimiento y Cultura",
    "organizador": "Junta Cívica Juvenil",
    "email": "feria@juntacivica.org",
    "descripcion": "Espacio abierto para artesanos locales, presentaciones de música folclórica y gastronomía tradicional.",
    "fecha": "2026-12-10",
    "categoria": "Cultura"
  }
  ```

- **Respuesta con Datos Inválidos (`400 Bad Request`):**
  Si falta algún campo obligatorio, el formato de correo es inválido o la fecha no cumple las condiciones, el servidor rechaza la petición sin detenerse:
  ```json
  {
    "error": "Datos inválidos: verifique que todos los campos obligatorios, el correo electrónico y la fecha sean correctos."
  }
  ```

---

## 8. Almacenamiento Persistente y Pruebas

### Verificación de Persistencia en Archivo JSON
1. Todos los eventos se guardan en `backend/eventos.json`. Si el archivo aún no existe al iniciar el servidor, se inicializa automáticamente con una lista vacía (`[]`).
2. Para comprobar la persistencia:
   - Registre uno o más eventos desde `http://localhost:5173/registro`.
   - Detenga el servidor backend en su terminal con `Ctrl + C`.
   - Inícielo nuevamente con `npm start`.
   - Recargue `http://localhost:5173/lista` y verifique que los eventos permanecen almacenados y disponibles.

### Ejecución de Pruebas Automatizadas
El backend incluye una suite de pruebas en `backend/server.test.js` que valida la creación (`201`), la consulta (`200`), el rechazo de datos inválidos (`400`) y la persistencia en el archivo JSON:
```bash
cd backend
npm test
```

---

## 9. Distribución de Roles del Equipo

| Integrante | Rol Asignado | Responsabilidades Principales |
| :--- | :--- | :--- |
| **Estudiante 1** | Arquitectura y Navegación (Frontend) | Configuración de Vite + React, estructura de carpetas (`components/` y `pages/`), enrutador `BrowserRouter` (`/`, `/registro`, `/lista`), componente `Layout.jsx`, página `Inicio.jsx` y estilos responsive. |
| **Estudiante 2** | Formulario y Validaciones (Frontend) | Estado controlado del formulario en `Registro.jsx`, validaciones de cliente en `validation.js` (campos obligatorios, formato de email y fecha), cliente HTTP `POST` en `api.js` y mensajes de confirmación/error. |
| **Estudiante 3** | API REST y Persistencia JSON (Backend) | Servidor Express en `server.js`, configuración de `CORS`, endpoints `GET /registros` y `POST /registros`, validaciones en servidor, generación de `id` único y lectura/escritura segura en `eventos.json`. |
| **Estudiante 4** | Consulta, Tarjetas y Pruebas (Integración) | Vista `Lista.jsx` con petición `GET /registros`, estados de carga/lista vacía/error, componente reutilizable `EventCard.jsx`, pruebas automatizadas en `server.test.js` y verificación integral. |