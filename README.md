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

## � Deployment en Vercel

### Preparación

1. **Asegúrate de que tu código esté en GitHub**:
   ```bash
   git add .
   git commit -m "Preparar para deployment en Vercel"
   git push origin main
   ```

2. **Configura las variables de entorno para producción**:
   - `NEXTAUTH_URL`: Tu dominio de Vercel (ej: `https://tu-app.vercel.app`)
   - Todas las demás variables del archivo `.env.example`

### Deployment

1. **Ve a [Vercel](https://vercel.com/)**
2. **Conecta tu cuenta de GitHub**
3. **Importa tu repositorio `trackear`**
4. **Configura las variables de entorno**:
   - Ve a Settings → Environment Variables
   - Añade todas las variables del archivo `.env.example`
   - Para `NEXTAUTH_URL`, usa tu dominio de Vercel
5. **Deploy automático**: Vercel detectará que es un proyecto Next.js y lo deployará automáticamente

### Variables de entorno requeridas en Vercel:

```env
NEXTAUTH_SECRET=tu_nextauth_secret_aqui
NEXTAUTH_URL=https://tu-app.vercel.app
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
GOOGLE_SHEET_ID=tu_google_sheet_id_aqui
JWT_SECRET=tu_jwt_secret_aqui
```

### Configuración adicional para Google OAuth

1. **Actualiza las URLs autorizadas en Google Cloud Console**:
   - URLs de origen: `https://tu-app.vercel.app`
   - URLs de redirección: `https://tu-app.vercel.app/api/auth/callback/google`

2. **Verifica que tu Google Sheet esté compartida** con la cuenta de servicio

## �📱 Uso de la Aplicación

1. **Registro/Login**: Crea una cuenta o inicia sesión con Google
2. **Dashboard**: Ve tus cursos y su progreso
3. **Crear curso**: Usa el formulario para agregar un nuevo curso
4. **Gestionar clases**: Entra a un curso para agregar y marcar clases
5. **Seguimiento**: Observa tu progreso con los gráficos circulares

## 🎨 Características de Diseño

- **Paleta de colores moderna**: Yellow-green (#BAFF39), grises optimizados para contraste
- **Completamente responsive**: Optimizado para móviles, tablets y desktop
- **Accesible**: Cumple con estándares WCAG 2.1 AA/AAA
- **Animaciones sutiles**: Transiciones y efectos hover
- **Iconografía consistente**: Heroicons para una UI profesional

¡Feliz aprendizaje con Trackear! 🚀
