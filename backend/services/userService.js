import sheets from "../config/google.js";

// Asumimos que tenés una hoja "usuarios" con las columnas:
// ID | Email | Password | Name | Google

const SHEET_NAME = "Users";
export async function getAllUsers() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A2:E`,
  });

  const rows = res.data.values || [];

  return rows.map((row, index) => ({
    id: row[0],
    email: row[1],
    password: row[2],
    name: row[3],
    googleId: row[4],
    rowIndex: index + 2, // A2 es fila 2
  }));
}

export async function getUserByEmail(email) {
  const users = await getAllUsers();
  return users.find((u) => u.email === email);
}

export async function createUser({ email, password, name, googleId }) {
  const id = crypto.randomUUID();

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:E`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id, email, password, name, googleId ]],
    },
  });

  return { id, email, name, googleId };
}

export async function findOrCreateGoogleUser({ email, name, googleId, img }) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) return existingUser;

  return await createUser({
    email,
    password: "", // No necesita password
    name,
    googleId,
    img
  });
}