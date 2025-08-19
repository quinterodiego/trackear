import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCourse, getUserCourses } from "@/lib/course-service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const courses = await getUserCourses(session.user.id);
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { title, description } = await request.json();
    
    if (!title) {
      return NextResponse.json({ error: "El título es requerido" }, { status: 400 });
    }

    const course = await createCourse(session.user.id, title, description);
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error al crear curso:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
