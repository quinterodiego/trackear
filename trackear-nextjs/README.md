# Trackear - Seguimiento de Cursos

Aplicación web construida con Next.js para hacer seguimiento del progreso de cursos y clases.

## 🚀 Características

- **Autenticación completa**: Login con email/contraseña y OAuth con Google
- **Gestión de cursos**: Crear, ver y organizar cursos
- **Seguimiento de clases**: Marcar clases como completadas y ver progreso
- **Visualización de progreso**: Gráficos circulares con estadísticas
- **Interfaz moderna**: Diseño responsivo con Tailwind CSS
- **Base de datos**: Google Sheets como backend (ideal para MVP)

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Autenticación**: NextAuth.js
- **Base de datos**: Google Sheets API
- **Gráficos**: Recharts
- **Icons**: Heroicons

## 📋 Prerrequisitos

1. Node.js 18+ instalado
2. Cuenta de Google y proyecto en Google Cloud Console
3. Google Sheet configurada como base de datos

## 🔧 Configuración

### 1. Configurar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las APIs:
   - Google Sheets API
   - Google Drive API (opcional, para mayor funcionalidad)

### 2. Configurar OAuth para Google Sign-In

1. Ve a "Credenciales" en Google Cloud Console
2. Crea credenciales OAuth 2.0:
   - Tipo: Aplicación web
   - URLs autorizadas de origen: `http://localhost:3000`
   - URLs de redirección autorizadas: `http://localhost:3000/api/auth/callback/google`

### 3. Crear Service Account para Google Sheets

1. Ve a "Credenciales" → "Crear credenciales" → "Cuenta de servicio"
2. Completa el formulario y crea la cuenta
3. Descarga el archivo JSON de la clave privada
4. Comparte tu Google Sheet con el email de la service account

### 4. Configurar Google Sheet

Crea un Google Sheet con las siguientes hojas (tabs):

#### Hoja "Users"
```
| id | email | name | password | google | googleId | image | createdAt |
```

#### Hoja "Courses"  
```
| id | userId | title | description | createdAt |
```

#### Hoja "Classes"
```
| id | courseId | title | done | createdAt |
```

### 5. Variables de Entorno

Completa las variables en `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=tu_nextauth_secret_muy_seguro_aqui
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (desde Google Cloud Console)
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# Google Sheets (Service Account JSON)
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"tu-proyecto",...}'
GOOGLE_SHEET_ID=tu_google_sheet_id_aqui

# JWT Secret (opcional, para tokens adicionales)
JWT_SECRET=tu_jwt_secret_aqui
```

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Uso de la Aplicación

1. **Registro/Login**: Crea una cuenta o inicia sesión con Google
2. **Dashboard**: Ve tus cursos y su progreso
3. **Crear curso**: Usa el formulario para agregar un nuevo curso
4. **Gestionar clases**: Entra a un curso para agregar y marcar clases
5. **Seguimiento**: Observa tu progreso con los gráficos circulares

¡Feliz aprendizaje con Trackear! 🚀

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
