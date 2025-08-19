import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, findOrCreateGoogleUser, createUser } from "@/lib/user-service";
import { comparePassword, hashPassword } from "@/lib/hash";
import { AuthUser } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" }, // "login" o "register"
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password, name, action } = credentials;

        try {
          if (action === "register") {
            // Registro
            if (!name) return null;
            
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
              throw new Error("Email ya registrado");
            }

            const hashedPassword = await hashPassword(password);
            const newUser = await createUser({
              email,
              name,
              password: hashedPassword,
              google: false,
            });

            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              image: newUser.image,
            };
          } else {
            // Login
            const user = await getUserByEmail(email);
            if (!user || user.google) {
              return null;
            }

            // Verificar contraseña (necesitamos obtener la contraseña hasheada de la hoja)
            // Por simplicidad, asumimos que tenemos acceso a la contraseña
            const rows = await import("@/lib/sheets-service").then(m => m.getSheetData("Users"));
            if (rows.length === 0) return null;
            
            const [headers, ...data] = rows;
            const userRow = data.find((row) => row[headers.indexOf("email")] === email);
            
            if (!userRow) return null;
            
            const storedPassword = userRow[headers.indexOf("password")];
            const isValid = await comparePassword(password, storedPassword);
            
            if (!isValid) return null;

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await findOrCreateGoogleUser({
            email: user.email!,
            name: user.name!,
            googleId: user.id,
            image: user.image || undefined,
          });
          return true;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
