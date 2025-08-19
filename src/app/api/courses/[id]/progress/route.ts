import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCourseProgress } from "@/lib/course-service";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const progress = await getCourseProgress(params.id, session.user.id);
    
    if (!progress) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error al obtener progreso:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
