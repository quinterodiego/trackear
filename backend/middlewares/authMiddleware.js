import { verifyToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token faltante o inválido" });
  }
  
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
  
  req.user = decoded; // el payload del token
  next();
}