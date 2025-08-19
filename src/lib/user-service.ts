import { getSheetData, appendRow, updateRow } from "./sheets-service";
import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";

const USERS_SHEET = "Users";

// Obtener usuario por email
export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await getSheetData(USERS_SHEET);
  if (rows.length === 0) return null;
  
  const [headers, ...data] = rows;
  const userRow = data.find((row) => row[headers.indexOf("email")] === email);
  
  if (!userRow) return null;
  
  return {
    id: userRow[headers.indexOf("id")],
    email: userRow[headers.indexOf("email")],
    name: userRow[headers.indexOf("name")],
    google: userRow[headers.indexOf("google")] === "true",
    googleId: userRow[headers.indexOf("googleId")] || undefined,
    image: userRow[headers.indexOf("image")] || undefined,
  };
}

// Crear nuevo usuario
export async function createUser(userData: {
  email: string;
  name: string;
  password?: string;
  google?: boolean;
  googleId?: string;
  image?: string;
}): Promise<User> {
  const id = uuidv4();
  const newUser = [
    id,
    userData.email,
    userData.name,
    userData.password || "",
    userData.google ? "true" : "false",
    userData.googleId || "",
    userData.image || "",
    new Date().toISOString(),
  ];
  
  await appendRow(USERS_SHEET, newUser);
  
  return {
    id,
    email: userData.email,
    name: userData.name,
    google: userData.google,
    googleId: userData.googleId,
    image: userData.image,
  };
}

// Encontrar o crear usuario de Google
export async function findOrCreateGoogleUser(googleData: {
  email: string;
  name: string;
  googleId: string;
  image?: string;
}): Promise<User> {
  const existingUser = await getUserByEmail(googleData.email);
  
  if (existingUser) {
    return existingUser;
  }
  
  return await createUser({
    email: googleData.email,
    name: googleData.name,
    google: true,
    googleId: googleData.googleId,
    image: googleData.image,
  });
}

// Obtener usuario por ID
export async function getUserById(id: string): Promise<User | null> {
  const rows = await getSheetData(USERS_SHEET);
  if (rows.length === 0) return null;
  
  const [headers, ...data] = rows;
  const userRow = data.find((row) => row[headers.indexOf("id")] === id);
  
  if (!userRow) return null;
  
  return {
    id: userRow[headers.indexOf("id")],
    email: userRow[headers.indexOf("email")],
    name: userRow[headers.indexOf("name")],
    google: userRow[headers.indexOf("google")] === "true",
    googleId: userRow[headers.indexOf("googleId")] || undefined,
    image: userRow[headers.indexOf("image")] || undefined,
  };
}
