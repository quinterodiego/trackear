import { getSheetData, appendRow } from "./sheets-service";
import { Course, CourseProgress } from "@/types";
import { v4 as uuidv4 } from "uuid";

const COURSES_SHEET = "Courses";
const CLASSES_SHEET = "Classes";

// Crear nuevo curso
export async function createCourse(userId: string, title: string, description?: string): Promise<Course> {
  const id = uuidv4();
  const newCourse = [
    id,
    userId,
    title,
    description || "",
    new Date().toISOString(),
  ];
  
  await appendRow(COURSES_SHEET, newCourse);
  
  return {
    id,
    title,
    description,
    userId,
  };
}

// Obtener cursos del usuario
export async function getUserCourses(userId: string): Promise<Course[]> {
  const rows = await getSheetData(COURSES_SHEET);
  if (rows.length === 0) return [];
  
  const [headers, ...data] = rows;
  
  return data
    .filter((row) => row[headers.indexOf("userId")] === userId)
    .map((row) => ({
      id: row[headers.indexOf("id")],
      title: row[headers.indexOf("title")],
      description: row[headers.indexOf("description")],
      userId: row[headers.indexOf("userId")],
    }));
}

// Obtener curso por ID
export async function getCourseById(courseId: string, userId: string): Promise<Course | null> {
  const rows = await getSheetData(COURSES_SHEET);
  if (rows.length === 0) return null;
  
  const [headers, ...data] = rows;
  const courseRow = data.find(
    (row) => row[headers.indexOf("id")] === courseId && row[headers.indexOf("userId")] === userId
  );
  
  if (!courseRow) return null;
  
  return {
    id: courseRow[headers.indexOf("id")],
    title: courseRow[headers.indexOf("title")],
    description: courseRow[headers.indexOf("description")],
    userId: courseRow[headers.indexOf("userId")],
  };
}

// Calcular progreso del curso
export async function getCourseProgress(courseId: string, userId: string): Promise<CourseProgress | null> {
  // Verificar que el curso pertenezca al usuario
  const course = await getCourseById(courseId, userId);
  if (!course) return null;
  
  // Obtener clases del curso
  const rows = await getSheetData(CLASSES_SHEET);
  if (rows.length === 0) {
    return {
      courseId,
      totalClases: 0,
      hechas: 0,
      progreso: 0,
    };
  }
  
  const [headers, ...data] = rows;
  const courseClasses = data.filter((row) => row[headers.indexOf("courseId")] === courseId);
  
  const total = courseClasses.length;
  const done = courseClasses.filter((row) => row[headers.indexOf("done")] === "true").length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);
  
  return {
    courseId,
    totalClases: total,
    hechas: done,
    progreso: progress,
  };
}
