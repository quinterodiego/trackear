import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClass, getCourseClasses } from "@/lib/class-service";
import { getCourseById } from "@/lib/course-service";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    
    if (!courseId) {
      return NextResponse.json({ error: "courseId es requerido" }, { status: 400 });
    }

    // Verificar que el curso pertenezca al usuario
    const course = await getCourseById(courseId, session.user.id);
    if (!course) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    const classes = await getCourseClasses(courseId);
    return NextResponse.json(classes);
  } catch (error) {
    console.error("Error al obtener clases:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { courseId, title } = await request.json();
    
    if (!courseId || !title) {
      return NextResponse.json({ error: "courseId y title son requeridos" }, { status: 400 });
    }

    // Verificar que el curso pertenezca al usuario
    const course = await getCourseById(courseId, session.user.id);
    if (!course) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    const newClass = await createClass(courseId, title);
    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error("Error al crear clase:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
