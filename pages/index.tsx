import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MoveForm from "../components/MoveForm";
import { loginWithGoogle, loginWithFacebook, loginWithEmail, registerWithEmail, logout, onAuthChange, auth } from "../utils/firebase"
import { useEffect, useState } from "react"
import { User } from "firebase/auth"
import { useRouter } from "next/router"


export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
    const unsub = onAuthChange(setUser)
    return () => unsub()
  }, [])

  const handleGetOffers = () => {
    if (user) {
      router.push("/form")      // 🔹 dacă e logat → formular
    } else {
      router.push("/auth")      // 🔹 dacă nu e logat → pagina de login
    }
  }

    return (
    <>
      <Head>
        <title>ofertemutare.ro</title>
        <meta name="description" content="Compară oferte de la companii de mutări verificate." />
      </Head>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <Image src="/index.png" alt="Mutări" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Găsește firma de mutări potrivită pentru tine
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Compară oferte de la companii verificate și alege varianta ideală pentru mutarea ta.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleGetOffers}
              className="px-6 py-3 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
            >
              Obține oferte acum
            </button>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Cum funcționează?</h2>
          <p className="text-gray-600">Proces simplu și rapid pentru a găsi firma ideală.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <span className="text-3xl font-bold text-green-500">1</span>
            <h3 className="text-lg font-semibold">Completează formularul</h3>
            <p className="text-gray-600">Trimite cererea ta online în doar câteva minute.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <span className="text-3xl font-bold text-green-500">2</span>
            <h3 className="text-lg font-semibold">Primești oferte</h3>
            <p className="text-gray-600">Firmele de mutări îți trimit oferte personalizate.</p>
          </div> 
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <span className="text-3xl font-bold text-green-500">3</span>
            <h3 className="text-lg font-semibold">Alegi firma potrivită</h3>
            <p className="text-gray-600">Compari și alegi oferta care ți se potrivește.</p>
          </div>
        </div>
      </section>

      {/* CLIENT ACCOUNT BOX */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto rounded-2xl bg-white p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow">
          <div className="flex-1 max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cont Client</h2>

            {!user ? (
              <>
                <p className="text-gray-600 mb-6">
                  Autentifică-te pentru a trimite cereri rapid și a urmări ofertele primite.
                </p>

                {/* Email + Parolă */}
                <Link 
                  href="/auth" 
                  className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition"
                >
                  Autentificare / Înregistrare
                </Link>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-4">Gestionezati Cererile, {user.displayName || user.email}</p>
                <div className="flex gap-4">
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Panou Client
                  </Link>
                  <button
                    onClick={logout}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Imagine dreapta */}
          <div className="flex-1 flex gap-4 justify-center">
            <Image src="/pics/oferta.png" alt="Ofertă" width={180} height={200} className="rounded-xl shadow-lg object-cover hidden md:block" />
            <Image src="/pics/mutare.png" alt="Mutare" width={180} height={200} className="rounded-xl shadow-lg object-cover hidden md:block" />
          </div>
        </div>
      </section>


      {/* SERVICES GRID */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-">Servicii oferite de companiile partenere</h2>
          <p className="text-gray-600">Prin ofertemutare.ro intri în legătură directă cu firme de mutări verificate.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Image src="/pics/packing1.png" alt="Împachetare" width={300} height={200} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2"> Servicii de împachetare</h3>
            <p className="text-gray-600">Partenerii noștri pot împacheta obiectele tale folosind materiale profesionale.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Image src="/pics/dism.png" alt="Demontare" width={300} height={200} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2"> Demontare și reasamblare</h3>
            <p className="text-gray-600">Mobilierul voluminos este demontat și reasamblat la destinație.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Image src="/pics/loading4.png" alt="Transport" width={300} height={200} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2"> Transport</h3>
            <p className="text-gray-600">Camioane și echipe pentru mutări locale sau internaționale.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Image src="/pics/storage.png" alt="Depozitare" width={300} height={200} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2"> Spații de depozitare</h3>
            <p className="text-gray-600">Depozitare sigură pentru termen scurt sau lung.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Image src="/pics/disposal.png" alt="Debarasare mobilă" width={300} height={200} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2"> Debarasare mobilă</h3>
            <p className="text-gray-600">
              Scăpați rapid și ușor de mobilierul vechi sau inutil. Ne ocupăm de ridicare, transport și eliminare responsabilă.
            </p>
          </div>
        </div>
      </section>

      {/* PARTENER SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl shadow bg-white p-8">
          {/* Image */}
          <div>
            <Image 
              src="/pics/partner.png" 
              alt="Partener" 
              width={600} 
              height={400} 
              className="rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Devino partener 
            </h2>
            <p className="text-gray-600 mb-6">
              Primește acces la sute de cereri de mutare de la clienți în fiecare lună. 
              Dacă ai o firmă de mutări autorizată și vrei să îți crești afacerea, alătură-te platformei noastre.
            </p>
            <Link 
              href="/firms" 
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Înregistrează-ți firma →
            </Link>
          </div>
        </div>
      </section>

      {/* TIPS & ARTICLES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
            Sfaturi utile pentru o mutare reușită
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3"> Cum să împachetezi eficient</h3>
              <p className="text-gray-600 mb-4">
                Folosește cutii rezistente, etichetează clar conținutul și începe cu lucrurile mai puțin folosite.
              </p>
              <Link href="/articles/impachetare" className="text-green-600 hover:underline">
                Citește mai mult →
              </Link>
            </div>

            {/* Article 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3"> Pregătirea locuinței pentru mutare</h3>
              <p className="text-gray-600 mb-4">
                Eliberează coridoarele, protejează podelele și asigură-te că ai pregătite actele necesare.
              </p>
              <Link href="/articles/pregatire" className="text-green-600 hover:underline">
                Citește mai mult →
              </Link>
            </div>

            {/* Article 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3"> De ce recomandăm un video call sau survey la fața locului</h3>
              <p className="text-gray-600 mb-4">
                Pentru a primi o ofertă cât mai precisă, este indicat să faci un video call sau să soliciți o vizită de evaluare.
              </p>
              <Link href="/articles/survey" className="text-green-600 hover:underline">
                Citește mai mult →
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <Footer />
    </>
    )
}
