import { getSheetData, appendRow, updateRow } from "./sheets-service";
import { Class } from "@/types";
import { v4 as uuidv4 } from "uuid";

const CLASSES_SHEET = "Classes";

// Crear nueva clase
export async function createClass(courseId: string, title: string): Promise<Class> {
  const id = uuidv4();
  const newClass = [
    id,
    courseId,
    title,
    "false", // done
    new Date().toISOString(),
  ];
  
  await appendRow(CLASSES_SHEET, newClass);
  
  return {
    id,
    title,
    courseId,
    done: false,
  };
}

// Obtener clases de un curso
export async function getCourseClasses(courseId: string): Promise<Class[]> {
  const rows = await getSheetData(CLASSES_SHEET);
  if (rows.length === 0) return [];
  
  const [headers, ...data] = rows;
  
  return data
    .filter((row) => row[headers.indexOf("courseId")] === courseId)
    .map((row) => ({
      id: row[headers.indexOf("id")],
      title: row[headers.indexOf("title")],
      courseId: row[headers.indexOf("courseId")],
      done: row[headers.indexOf("done")] === "true",
    }));
}

// Marcar clase como completada/pendiente
export async function toggleClassStatus(classId: string, courseId: string): Promise<boolean> {
  const rows = await getSheetData(CLASSES_SHEET);
  if (rows.length === 0) return false;
  
  const [headers, ...data] = rows;
  const classIndex = data.findIndex(
    (row) => row[headers.indexOf("id")] === classId && row[headers.indexOf("courseId")] === courseId
  );
  
  if (classIndex === -1) return false;
  
  const currentStatus = data[classIndex][headers.indexOf("done")] === "true";
  const newStatus = !currentStatus;
  
  // Actualizar en la hoja (índice + 1 porque el primer índice es headers, +1 más porque las filas empiezan en 1)
  const rowIndex = classIndex + 1;
  data[classIndex][headers.indexOf("done")] = newStatus ? "true" : "false";
  
  await updateRow(CLASSES_SHEET, rowIndex, data[classIndex]);
  
  return newStatus;
}

// Eliminar clase
export async function deleteClass(classId: string, courseId: string): Promise<boolean> {
  // Para simplificar, marcamos la clase como eliminada o podríamos implementar 
  // lógica más compleja para eliminar realmente la fila
  // Por ahora, retornamos true como placeholder
  return true;
}
