import { sheets, spreadsheetId } from "./google-sheets";

// Lee todas las filas de una hoja
export async function getSheetData(sheetName: string): Promise<any[][]> {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId!,
      range: sheetName,
    });
    return res.data.values || [];
  } catch (error) {
    console.error("Error reading sheet:", error);
    return [];
  }
}

// Agrega una fila al final de una hoja
export async function appendRow(sheetName: string, row: any[]): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId!,
      range: sheetName,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });
  } catch (error) {
    console.error("Error appending row:", error);
    throw error;
  }
}

// Actualiza una fila específica
export async function updateRow(sheetName: string, rowIndex: number, rowValues: any[]): Promise<void> {
  try {
    const range = `${sheetName}!A${rowIndex + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId!,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowValues],
      },
    });
  } catch (error) {
    console.error("Error updating row:", error);
    throw error;
  }
}

// Actualiza una celda específica
export async function updateCell(sheetName: string, row: number, col: number, value: any): Promise<void> {
  try {
    const range = `${sheetName}!${numToCol(col)}${row}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId!,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[value]],
      },
    });
  } catch (error) {
    console.error("Error updating cell:", error);
    throw error;
  }
}

// Helper para convertir columna numérica a letra (1 -> A, 2 -> B, etc.)
function numToCol(num: number): string {
  let col = "";
  while (num > 0) {
    const rem = (num - 1) % 26;
    col = String.fromCharCode(65 + rem) + col;
    num = Math.floor((num - 1) / 26);
  }
  return col;
}
