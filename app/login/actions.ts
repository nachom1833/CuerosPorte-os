"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getFirebaseAuth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        const userCredential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
        const token = await userCredential.user.getIdToken()

        const cookieStore = await cookies()
        cookieStore.set("firebase-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        })
    } catch (error: any) {
        console.error("Login error:", error)
        let message = "No se pudo autenticar al usuario. Intente nuevamente."

        if (error.code) {
            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    message = "El correo electrónico o la contraseña ingresados son incorrectos."
                    break
                case "auth/invalid-email":
                    message = "El formato de correo electrónico ingresado es inválido."
                    break
                case "auth/user-disabled":
                    message = "Esta cuenta de usuario ha sido inhabilitada."
                    break
                case "auth/too-many-requests":
                    message = "Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde."
                    break
                case "auth/network-request-failed":
                    message = "Error de red. Comprueba tu conexión a internet."
                    break
                default:
                    message = `Error de autenticación: ${error.message}`
            }
        }

        redirect(`/login?error=${encodeURIComponent(message)}`)
    }

    revalidatePath("/", "layout")
    redirect("/admin")
}
