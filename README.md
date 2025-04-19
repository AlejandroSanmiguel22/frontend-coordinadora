# Coordinadora - Frontend

Este proyecto esta construida con **React**, **TypeScript**, **TailwindCSS** y **Redux**, que consume los servicios del backend para gestionar el flujo logístico de Coordinadora. Implementa arquitectura por funcionalidades, autenticación con **JWT**, pruebas con **React Testing Library** y soporte para usuarios con rol `user` y `admin`.

---

## Arquitectura

Se sigue una arquitectura modular por funcionalidades, con énfasis en **separación de responsabilidades** y escalabilidad:

```
src/
├── features/
│   ├── auth/                  # Login y registro
│   ├── user/                  # Perfil de usuario
│   └── shipments/             # Gestión de envíos (crear, listar, asignar, reportes)
│       ├── components/        # Componentes UI reutilizables
│       ├── pages/             # Páginas principales (admin, crear envío, etc.)
│       └── services/          # Llamadas a la API
├── routes/                    # Rutas protegidas y públicas
├── shared/                    # Componentes reutilizables (botones, inputs)
├── assets/                    # Imágenes y SVG
├── App.tsx                    # Definición de rutas
└── main.tsx                   # Punto de entrada
```

---

## Pruebas

Se han implementado pruebas unitarias para los componentes clave con **Jest** y **React Testing Library**:

```bash
npm run test
```

Componentes cubiertos:

- `ReportChart`
- `ReportTable`
- `ReportFilters`
- `ShipmentForm`
- `ShipmentFormTitle`

---

## Seguridad

- Manejo de autenticación con JWT
- Validación de rol en frontend (`admin` vs `user`)
- Rutas protegidas con `PrivateRoute`

---

## Características

- Login y registro de usuarios
- Crear nuevos envíos
- Ver historial de envíos
- Consultar estado en tiempo real mediante **polling**
- Panel administrativo:
  - Visualización y asignación de rutas
  - Marcar entregas
  - Dashboard con filtros avanzados y gráficos

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/coordinadora-frontend.git
cd coordinadora-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar entorno

Asegúrate de que el backend esté corriendo en `http://localhost:3000`.
El frontend se iniciará por defecto en `http://localhost:3000`, pero si ese puerto está ocupado (por ejemplo, por el backend), **se moverá automáticamente a `http://localhost:3001`**.

### 4. Iniciar aplicación

```bash
npm run dev
```

---

## Tecnologías usadas

- React + TypeScript
- TailwindCSS
- Redux (para manejo global de estado)
- React Router DOM
- React Testing Library + Jest
- Webpack / Vite

---

## Autor

**Luis Alejandro Sanmiguel Galeano**  
Desarrollador Fullstack apasionado por construir interfaces funcionales, accesibles y conectadas a arquitecturas limpias.
