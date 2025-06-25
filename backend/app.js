import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";
import classesRoutes from "./routes/classesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/classes", classesRoutes);

app.get("/", (req, res) => {
  res.send("Trackear backend funcionando ✅");
});

export default app;