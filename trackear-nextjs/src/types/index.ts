export interface User {
  id: string;
  email: string;
  name: string;
  google?: boolean;
  googleId?: string;
  image?: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt?: string;
}

export interface Class {
  id: string;
  title: string;
  courseId: string;
  done: boolean;
  createdAt?: string;
}

export interface CourseProgress {
  courseId: string;
  totalClases: number;
  hechas: number;
  progreso: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string;
}
