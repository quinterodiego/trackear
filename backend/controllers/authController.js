import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { getGoogleUser } from "../services/googleAuth.js";
import {
  getUserByEmail,
  createUser,
  findOrCreateGoogleUser
} from "../services/userService.js";

// REGISTRO
export async function register(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "Email ya registrado" });
  }

  const hashed = await hashPassword(password);

  const user = await createUser({
    id: uuidv4(),
    email,
    password: hashed,
    name,
    google: false,
  });

  const token = generateToken(user);
  res.status(201).json({ user, token });
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user || user.google === true) {
    return res.status(400).json({ error: "Usuario no registrado o es de Google" });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }
  console.log(user)
  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      googleId: user.googleId,
    },
    token,
  });
}

// GOOGLE AUTH CALLBACK
export async function googleCallback(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send("Código de Google faltante");

  const googleUser = await getGoogleUser(code);
  const { email, name, id: googleId, picture: img } = googleUser;
  const user = await findOrCreateGoogleUser({ email, name, googleId, img });
  console.log(user)
  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  // Redirigir al frontend con el token
  return res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
}