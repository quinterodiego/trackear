# Configuración de Google Sheets para Trackear

## Estructura de las Hojas de Cálculo

### Hoja 1: "Users"
**Headers (Fila 1):**
```
id | email | name | password | google | googleId | image | createdAt
```

**Ejemplo de datos:**
```
uuid-123 | juan@email.com | Juan Pérez | $2b$12$hashedpassword | false |  | https://avatar.com/juan.jpg | 2025-08-19T15:30:00.000Z
uuid-456 | maria@gmail.com | María García |  | true | 108234567890 | https://lh3.googleusercontent.com/a/photo.jpg | 2025-08-19T16:00:00.000Z
```

### Hoja 2: "Courses"
**Headers (Fila 1):**
```
id | userId | title | description | createdAt
```

**Ejemplo de datos:**
```
course-123 | uuid-123 | Curso de React | Aprende React desde cero | 2025-08-19T15:45:00.000Z
course-456 | uuid-123 | JavaScript Moderno | ES6+ y mejores prácticas | 2025-08-19T16:15:00.000Z
```

### Hoja 3: "Classes"
**Headers (Fila 1):**
```
id | courseId | title | done | createdAt
```

**Ejemplo de datos:**
```
class-123 | course-123 | Introducción a React | true | 2025-08-19T15:50:00.000Z
class-456 | course-123 | Componentes y JSX | false | 2025-08-19T15:55:00.000Z
class-789 | course-123 | Estados y Props | false | 2025-08-19T16:00:00.000Z
```

## Pasos para Configurar Google Sheets

### 1. Crear el Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo spreadsheet
3. Nómbralo "Trackear Database" o similar
4. Copia el ID de la URL (será tu `GOOGLE_SHEET_ID`)

### 2. Crear las Hojas
1. Renombra la primera hoja a "Users"
2. Agrega los headers exactamente como se muestra arriba
3. Crea una nueva hoja llamada "Courses" con sus headers
4. Crea una tercera hoja llamada "Classes" con sus headers

### 3. Configurar Permisos
1. Ve a Google Cloud Console
2. Crea una Service Account
3. Descarga el archivo JSON
4. Comparte tu Google Sheet con el email de la service account
5. Dale permisos de "Editor" a la service account

### 4. Variables de Entorno
```env
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"tu-proyecto","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA\n-----END PRIVATE KEY-----\n","client_email":"trackear@tu-proyecto.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token"}'
```

## Tips Importantes

### Formato de Datos
- **IDs**: Usa UUIDs únicos para cada registro
- **Fechas**: Formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
- **Booleanos**: "true" o "false" como strings
- **Emails**: Formato válido de email
- **Contraseñas**: Siempre hasheadas con bcrypt

### Seguridad
- Nunca expongas tu Service Account JSON públicamente
- Mantén el Google Sheet privado
- Solo comparte con la service account necesaria
- Usa variables de entorno para datos sensibles

### Validación
Para verificar que todo funciona:
1. Asegúrate de que las hojas tengan los nombres exactos
2. Verifica que los headers estén en la fila 1
3. Prueba agregar un registro manualmente
4. Verifica los permisos de la service account

### Troubleshooting Común

**Error: "The caller does not have permission"**
- Verifica que hayas compartido el sheet con la service account
- Revisa que los permisos sean de "Editor"

**Error: "Unable to parse range"**
- Asegúrate de que los nombres de las hojas sean exactos: "Users", "Courses", "Classes"
- Verifica que no haya espacios extra en los nombres

**Error: "Requested entity was not found"**
- Verifica el GOOGLE_SHEET_ID en la URL
- Asegúrate de que el sheet no sea privado sin permisos

### Escalabilidad
Google Sheets tiene límites:
- 10 millones de celdas por spreadsheet
- 256 columnas por hoja
- 2 millones de celdas por hoja

Para aplicaciones con más usuarios, considera migrar a:
- PostgreSQL
- MongoDB  
- Firebase Firestore
- Supabase
