import { appendRow, getSheetData } from "../services/sheetsService.js";
import { v4 as uuidv4 } from "uuid";

const COURSES_SHEET = "Courses";
const CLASSES_SHEET = "Classes";

// Crear un nuevo curso
export async function createCourse(req, res) {
  const { title, description } = req.body;
  const userId = req.user.id;
  
  console.log('Llego a createCourse', req.body);
  if (!title) return res.status(400).json({ error: "Falta el título" });
  
  const newCourse = [uuidv4(), userId, title, description || ""];
  await appendRow(COURSES_SHEET, newCourse);

  res.status(201).json({ message: "Curso creado", course: newCourse });
}

// Obtener todos los cursos del usuario
export async function getUserCourses(req, res) {
  const userId = req.user.id;
  const rows = await getSheetData(COURSES_SHEET);
  const [headers, ...data] = rows;

  const userCourses = data
    .filter((row) => row[headers.indexOf("userId")] === userId)
    .map((row) => ({
      id: row[headers.indexOf("id")],
      title: row[headers.indexOf("title")],
      description: row[headers.indexOf("description")],
    }));
  res.json(userCourses);
}

// Obtener un curso por ID
export async function getCourseById(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const rows = await getSheetData(COURSES_SHEET);
  const data = rows.slice(1);

  const course = data.find(row => row[0] === id && row[1] === userId);
  if (!course) return res.status(404).json({ error: "Curso no encontrado" });

  res.json({
    id: course[0],
    title: course[2],
    description: course[3],
  });
}

// Calcular progreso de un curso
export async function getCourseProgress(req, res) {
  const userId = req.user.id;
  const { id: courseId } = req.params;

  // Verificamos que el curso pertenezca al usuario
  const courses = await getSheetData("Courses");
  const headers = courses[0];
  const course = courses
    .slice(1)
    .find(row => row[0] === courseId && row[1] === userId);

  if (!course) return res.status(404).json({ error: "Curso no encontrado" });

  // Buscamos las clases asociadas
  const rows = await getSheetData(CLASSES_SHEET);
  const data = rows.slice(1).filter(row => row[1] === courseId);

  const total = data.length;
  const doneCount = data.filter(row => row[3] === "true").length;

  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  res.json({
    courseId,
    totalClases: total,
    hechas: doneCount,
    progreso: progress,
  });
}