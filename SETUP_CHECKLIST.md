# ✅ Checklist de Configuración - Trackear

## 📋 Lista de Verificación Paso a Paso

### 1. ✅ Proyecto Next.js Creado
- [x] Proyecto Next.js configurado con TypeScript
- [x] Dependencias instaladas
- [x] Estructura de archivos creada

### 2. ⏳ Configuración de Google Cloud Console

#### Google Sheets API
- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Sheets API habilitada
- [ ] Service Account creada
- [ ] Archivo JSON de credenciales descargado

#### OAuth para Google Sign-In
- [ ] Credenciales OAuth 2.0 creadas
- [ ] URLs autorizadas configuradas:
  - Origen: `http://localhost:3000`
  - Redirección: `http://localhost:3000/api/auth/callback/google`

### 3. ⏳ Google Sheet Configurado

#### Crear Spreadsheet
- [ ] Google Sheet creado
- [ ] ID del Sheet copiado de la URL

#### Hojas Creadas
- [ ] Hoja "Users" con headers: `id | email | name | password | google | googleId | image | createdAt`
- [ ] Hoja "Courses" con headers: `id | userId | title | description | createdAt`
- [ ] Hoja "Classes" con headers: `id | courseId | title | done | createdAt`

#### Permisos
- [ ] Google Sheet compartido con email de service account
- [ ] Permisos de "Editor" otorgados

### 4. ⏳ Variables de Entorno

Completa en `.env.local`:

```env
# ✅ NextAuth (genera secrets únicos)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# ⏳ Google OAuth (desde Cloud Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ⏳ Google Sheets (minifica el JSON)
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_SHEET_ID=

# ✅ JWT Secret (opcional)
JWT_SECRET=
```

### 5. ✅ Pruebas de Funcionamiento

#### Verificar Configuración
```bash
# Ejecutar servidor de desarrollo
npm run dev

# Verificar en http://localhost:3000
```

#### Funcionalidades a Probar
- [ ] Página principal carga correctamente
- [ ] Registro de usuario funciona
- [ ] Login con email/contraseña funciona
- [ ] Login con Google funciona
- [ ] Dashboard muestra cursos
- [ ] Crear curso funciona
- [ ] Crear clases funciona
- [ ] Marcar clases como completadas funciona
- [ ] Gráficos de progreso se muestran

### 6. 🔧 Resolución de Problemas Comunes

#### Error: "The caller does not have permission"
**Solución:**
- [ ] Verificar que el Sheet esté compartido con la service account
- [ ] Verificar permisos de "Editor"
- [ ] Revisar el email de la service account en las credenciales JSON

#### Error: "Unable to parse range"
**Solución:**
- [ ] Verificar nombres exactos de hojas: "Users", "Courses", "Classes"
- [ ] Verificar que no haya espacios extra
- [ ] Verificar que los headers estén en la fila 1

#### Error: "Invalid JSON"
**Solución:**
- [ ] Verificar que GOOGLE_SERVICE_ACCOUNT_JSON sea JSON válido
- [ ] Minificar el JSON (quitar saltos de línea y espacios)
- [ ] Usar comillas simples para envolver el JSON en .env.local

#### Error: "Redirect URI mismatch"
**Solución:**
- [ ] Verificar URLs en Google Cloud Console
- [ ] Asegurar que coincidan exactamente con las configuradas

### 7. 🚀 Listo para Usar

Una vez completado todo:
- [ ] Crear tu primera cuenta
- [ ] Agregar tu primer curso
- [ ] Agregar algunas clases
- [ ] Marcar clases como completadas
- [ ] Ver el progreso en el dashboard

### 8. 📚 Recursos Útiles

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Sheets](https://sheets.google.com/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Next.js Docs](https://nextjs.org/docs)

### 9. 🆘 Si Necesitas Ayuda

1. **Revisa la consola del navegador** para errores específicos
2. **Verifica los logs del servidor** en la terminal
3. **Confirma que todas las variables de entorno están configuradas**
4. **Asegúrate de que el Google Sheet tenga la estructura correcta**

### 10. 🎯 Próximos Pasos (Opcional)

- [ ] Personalizar diseño y colores
- [ ] Agregar más funcionalidades
- [ ] Configurar deployment en Vercel
- [ ] Migrar a base de datos real para producción

---

**¡Una vez que completes todos los elementos marcados con ⏳, tu aplicación Trackear estará completamente funcional!** 🚀

Para generar secrets seguros:
```bash
# Para NEXTAUTH_SECRET y JWT_SECRET
openssl rand -base64 32
```
