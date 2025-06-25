import { appendRow, getSheetData, updateCell } from "../services/sheetsService.js";
import { formatISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const CLASSES_SHEET = "Classes";

// Crear clase dentro de un curso
export async function addClass(req, res) {
  const { courseId, title } = req.body;
  if (!courseId || !title)
    return res.status(400).json({ error: "Faltan datos" });

  const newClass = [uuidv4(), courseId, title, "false"];
  await appendRow(CLASSES_SHEET, newClass);

  res.status(201).json({ message: "Clase agregada", class: newClass });
}

// Obtener clases de un curso
export async function getClassesByCourse(req, res) {
  const { courseId } = req.params;
  const rows = await getSheetData(CLASSES_SHEET);
  const data = rows.slice(1);

  const classes = data
    .filter(row => row[1] === courseId)
    .map(row => ({
      id: row[0],
      title: row[2],
      done: row[3] === "true",
    }));

  res.json(classes);
}

// Cambiar estado de completado
export async function toggleClassDone(req, res) {
  const { id } = req.params;

  const rows = await getSheetData(CLASSES_SHEET);
  const headers = rows[0];
  const data = rows.slice(1);

  const rowIndex = data.findIndex(row => row[0] === id);
  if (rowIndex === -1) return res.status(404).json({ error: "Clase no encontrada" });

  const fullIndex = rowIndex + 2;
  const doneCol = headers.indexOf("done");
  const dateCol = headers.indexOf("date");

  const current = data[rowIndex][doneCol];
  const updatedDone = current === "true" ? "false" : "true";
  const updatedDate = updatedDone === "true" ? formatISO(new Date(), { representation: "date" }) : "";

  await updateCell(CLASSES_SHEET, fullIndex, doneCol + 1, updatedDone);
  if (dateCol !== -1) {
    await updateCell(CLASSES_SHEET, fullIndex, dateCol + 1, updatedDate);
  }

  res.json({ message: "Estado actualizado", done: updatedDone === "true", date: updatedDate });
}

// Ruta para ver cronograma del usuario
export async function getUserSchedule(req, res) {
  const userId = req.user.id;

  // Cargar cursos del usuario
  const courses = await getSheetData("Courses");
  const courseMap = new Map();
  courses.slice(1).forEach(row => {
    if (row[1] === userId) {
      courseMap.set(row[0], row[2]); // courseId -> courseTitle
    }
  });

  if (courseMap.size === 0) return res.json([]);

  // Cargar clases
  const rows = await getSheetData(CLASSES_SHEET);
  const data = rows.slice(1);

  const schedule = data
    .filter(row => courseMap.has(row[1]) && row[4]) // tiene fecha
    .map(row => ({
      classId: row[0],
      courseId: row[1],
      courseTitle: courseMap.get(row[1]),
      title: row[2],
      date: row[4],
    }));

  res.json(schedule);
}