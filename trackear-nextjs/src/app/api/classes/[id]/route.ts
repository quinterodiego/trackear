import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toggleClassStatus } from "@/lib/class-service";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { courseId } = await request.json();
    
    if (!courseId) {
      return NextResponse.json({ error: "courseId es requerido" }, { status: 400 });
    }

    const newStatus = await toggleClassStatus(params.id, courseId);
    
    return NextResponse.json({ id: params.id, done: newStatus });
  } catch (error) {
    console.error("Error al cambiar estado de clase:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
