// Utilidades para depuración y validación
export function validateGoogleSheetsConfig() {
  const requiredEnvVars = [
    'GOOGLE_SERVICE_ACCOUNT_JSON',
    'GOOGLE_SHEET_ID',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Variables de entorno faltantes:', missing);
    return false;
  }

  try {
    JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);
    console.log('✅ GOOGLE_SERVICE_ACCOUNT_JSON es válido');
  } catch (error) {
    console.error('❌ GOOGLE_SERVICE_ACCOUNT_JSON no es un JSON válido');
    return false;
  }

  console.log('✅ Todas las variables de entorno están configuradas');
  return true;
}

export function logSheetOperation(operation: string, sheetName: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Google Sheets: ${operation} en hoja "${sheetName}"`, data ? { data } : '');
  }
}

export function handleSheetError(error: Record<string, unknown>, operation: string) {
  console.error(`❌ Error en Google Sheets (${operation}):`, error.message);
  
  if (error.code === 403) {
    console.error('💡 Posible solución: Verifica permisos de la service account');
  }
  
  if (error.code === 404) {
    console.error('💡 Posible solución: Verifica GOOGLE_SHEET_ID y nombres de hojas');
  }
  
  if (typeof error.message === 'string' && error.message.includes('Unable to parse range')) {
    console.error('💡 Posible solución: Verifica nombres exactos de hojas: "Users", "Courses", "Classes"');
  }
}
