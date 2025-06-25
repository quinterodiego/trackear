import { getSheetData, appendRow } from "../services/sheetsService.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { getGoogleUser } from "../services/googleAuth.js";


const USERS_SHEET = "Users";

// REGISTRO
export async function register(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ error: "Faltan datos" });

  const rows = await getSheetData(USERS_SHEET);
  const headers = rows[0];
  const users = rows.slice(1);

  const emailIndex = headers.indexOf("email");
  const existingUser = users.find((u) => u[emailIndex] === email);
  if (existingUser) return res.status(400).json({ error: "Email en uso" });

  const hashed = await hashPassword(password);
  const newUser = [uuidv4(), email, hashed, name, ""]; // googleId vacío

  await appendRow(USERS_SHEET, newUser);

  const user = {
    id: newUser[0],
    email,
    name,
  };
  const token = generateToken(user);
  res.status(201).json({ user, token });
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  const rows = await getSheetData(USERS_SHEET);
  const headers = rows[0];
  const users = rows.slice(1);

  const emailIndex = headers.indexOf("email");
  const passwordIndex = headers.indexOf("password");
  const nameIndex = headers.indexOf("name");
  const idIndex = headers.indexOf("id");

  const user = users.find((u) => u[emailIndex] === email);
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const valid = await comparePassword(password, user[passwordIndex]);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = generateToken({
    id: user[idIndex],
    email,
    name: user[nameIndex],
  });

  res.json({
    user: {
      id: user[idIndex],
      email,
      name: user[nameIndex],
    },
    token,
  });
}

// GOOGLE AUTH
export async function googleCallback(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send("Código de Google faltante");

  const googleUser = await getGoogleUser(code);
  const { email, name, id: googleId } = googleUser;

  const rows = await getSheetData("Users");
  const headers = rows[0];
  const users = rows.slice(1);

  const emailIndex = headers.indexOf("email");
  const googleIdIndex = headers.indexOf("googleId");
  const idIndex = headers.indexOf("id");
  const nameIndex = headers.indexOf("name");

  let user = users.find(u => u[emailIndex] === email || u[googleIdIndex] === googleId);

  if (!user) {
    const newUser = [uuidv4(), email, "", name, googleId];
    await appendRow("Users", newUser);
    user = newUser;
  }

  const userObj = {
    id: user[idIndex] || user[0],
    email,
    name: user[nameIndex] || name,
  };

  const token = generateToken(userObj);

  // Redirigimos al frontend con el token en la URL (ajustalo a tu app)
  return res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
}