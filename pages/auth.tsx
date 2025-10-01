"use client"
import { useState, useEffect } from "react"
import { 
  loginWithEmail, registerWithEmail, loginWithGoogle, loginWithFacebook, 
  logout, onAuthChange, resetPassword 
} from "../utils/firebase"
import { User } from "firebase/auth"
import { useRouter } from "next/router"

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()

    useEffect(() => {
        const unsub = onAuthChange((u) => {
            setUser(u)
            if (u) {
            const redirect = localStorage.getItem("redirectAfterLogin")
            if (redirect === "form") {
                localStorage.removeItem("redirectAfterLogin")
                router.push("/form")    // 🔹 merge la formular
            } else {
                router.push("/dashboard") // 🔹 altfel dashboard direct
            }
            }
        })
        return () => unsub()
    }, [router])


  const handleEmailAuth = async () => {
    try {
      if (isRegister) {
        await registerWithEmail(email, password)
        alert("✅ Cont creat cu succes!")
      } else {
        await loginWithEmail(email, password)
        alert("✅ Autentificat cu succes!")
      }
      router.push("/dashboard")
    } catch (err: any) {
      alert("❌ Eroare: " + err.message)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      alert("Introduceți adresa de email pentru resetare!")
      return
    }
    try {
      await resetPassword(email)
      alert("📩 Ți-am trimis un email pentru resetarea parolei.")
    } catch (err: any) {
      alert("❌ Eroare: " + err.message)
    }
  }

  const handleGoogle = async () => {
    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (err: any) {
      alert("❌ Eroare: " + err.message)
    }
  }

  const handleFacebook = async () => {
    try {
      await loginWithFacebook()
      router.push("/dashboard")
    } catch (err: any) {
      alert("❌ Eroare: " + err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Înregistrare" : "Login"}
        </h1>

        {!user ? (
          <>
            {/* Email + Parolă */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 mb-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Parolă"
              className="w-full border p-3 mb-3 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleEmailAuth}
              className="w-full bg-green-600 text-white py-2 rounded mb-3 hover:bg-green-700"
            >
              {isRegister ? "Înregistrează-te" : "Login"}
            </button>

            {/* Resetare parolă */}
            {!isRegister && (
              <p
                onClick={handleResetPassword}
                className="text-sm text-green-600 text-center mb-4 cursor-pointer hover:underline"
              >
                Am uitat parola
              </p>
            )}

            <p className="text-center text-sm text-gray-600 mb-3">
              {isRegister ? "Ai deja cont?" : "Nu ai cont?"}{" "}
              <span
                onClick={() => setIsRegister(!isRegister)}
                className="text-green-600 cursor-pointer hover:underline"
              >
                {isRegister ? "Login" : "Înregistrează-te"}
              </span>
            </p>

            {/* Google & Facebook */}
            <button
              onClick={handleGoogle}
              className="w-full bg-red-500 text-white py-2 rounded mb-2 hover:bg-red-600"
            >
              Login cu Google
            </button>
            <button
              onClick={handleFacebook}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login cu Facebook
            </button>
          </>
        ) : (
          <>
            <p className="text-center mb-4">Salut, {user.email}</p>
            <button
              onClick={logout}
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
