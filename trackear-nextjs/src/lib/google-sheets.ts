import { google } from "googleapis";

// Configuración de autenticación con Google Sheets
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({ version: "v4", auth });
export const spreadsheetId = process.env.GOOGLE_SHEET_ID;
