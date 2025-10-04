"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { 
  registerWithEmail, 
  loginWithEmail, 
  loginWithGoogle, 
  onAuthChange, 
  logout, 
  db 
} from "../../utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export default function CompanyAuthPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // listen for auth changes
  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "companies", u.uid));
        if (snap.exists()) {
          const company = snap.data();
          if (company.verified) router.push("/company/dashboard");
          else router.push("/company/verify");
        } else {
          router.push("/company/profile");
        }
      }
    });
    return () => unsub();
  }, [router]);

  const handleAuth = async () => {
    try {
      if (isRegister) {
        const cred = await registerWithEmail(email, password);
        const uid = cred.user.uid;

        await setDoc(doc(db, "companies", uid), {
          name: companyName,
          email,
          phone,
          city,
          county,
          verified: false,
          services: [],
          insurance: false,
          subscription: "free",
          createdAt: new Date(),
        });

        alert("✅ Cont companie creat! În așteptarea verificării.");
      } else {
        await loginWithEmail(email, password);
        alert("✅ Autentificat cu succes!");
      }
    } catch (err: any) {
      alert("❌ Eroare: " + err.message);
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <p className="text-lg font-semibold mb-4">
            Salut, {user.email}
          </p>
          <button
            onClick={logout}
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Înregistrare firmă" : "Autentificare firmă"}
        </h1>

        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Numele firmei"
              className="w-full border p-3 mb-3 rounded"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telefon"
              className="w-full border p-3 mb-3 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Oraș"
              className="w-full border p-3 mb-3 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Județ"
              className="w-full border p-3 mb-3 rounded"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            />
          </>
        )}

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
          onClick={handleAuth}
          className="w-full bg-green-600 text-white py-2 rounded mb-3 hover:bg-green-700"
        >
          {isRegister ? "Creează cont" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mb-3">
          {isRegister ? "Ai deja cont?" : "Nu ai cont?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 cursor-pointer hover:underline"
          >
            {isRegister ? "Login" : "Înregistrează-te"}
          </span>
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Login cu Google
        </button>
      </div>
    </div>
  );
}
