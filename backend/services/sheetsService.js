import sheets from "../config/google.js";
import { google } from "googleapis";

const spreadsheetId  = process.env.GOOGLE_SHEET_ID ;

// Lee todas las filas de una hoja
export async function getSheetData(sheetName) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId ,
    range: sheetName,
  });
  return res.data.values; // incluye headers
}

// Agrega una fila al final de una hoja
export async function appendRow(sheetName, row) {
  sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: sheetName,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [row],
    },
  });
}

// Reemplaza una fila existente (por índice)
export async function updateRow(sheetName, rowIndex, rowValues) {
  const range = `${sheetName}!A${rowIndex + 1}`;
  sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range,
    valueInputOption: "RAW",
    resource: {
      values: [rowValues],
    },
  });
}

// Esta función escribe un valor en una celda específica
export async function updateCell(sheetName, row, col, value) {
  const range = `${sheetName}!${numToCol(col)}${row}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[value]],
    },
  });
}

export async function getUserCourses(sheetTitle) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetTitle}!A1:Z1000`,
  });

  const [headers, ...rows] = res.data.values;

  return rows.map((row) => {
    const obj = {};
    headers.forEach((key, i) => {
      obj[key] = row[i] || "";
    });
    return obj;
  });
};

// Helper para convertir columna numérica a letra (1 -> A, 2 -> B, etc.)
function numToCol(num) {
  let col = "";
  while (num > 0) {
    const rem = (num - 1) % 26;
    col = String.fromCharCode(65 + rem) + col;
    num = Math.floor((num - 1) / 26);
  }
  return col;
}