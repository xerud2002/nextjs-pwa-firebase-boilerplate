"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import emailjs from "@emailjs/browser";
// import DatePicker from "react-datepicker";
import { Calendar, DateObject } from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  "Tip serviciu",
  "Dimensiunea mutării",
  "Împachetare",
  "Demontare",
  "Detalii destinație",
  "Survey estimare",
  "Detalii suplimentare",
  "Date contact",
];

export default function MoveForm() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => console.log("✅ User anonim autentificat"))
      .catch((err) => console.error("❌ Eroare la autentificare anonimă:", err));
    
    setHydrated(true);
  }, []);

  // default values
  const defaultFormData = {
    serviceType: "",
    propertyType: "",
    rooms: "",
    houseFloors: "",
    floor: "",
    lift: "",
    packing: "",
    stairsFrom: "",
    stairsTo: "",
    survey: "",
    details: "",
    name: "",
    phone: "",
    email: "",
    dismantling: "",
    propertyTypeTo: "",
    roomsTo: "",
    houseFloorsTo: "",
    floorTo: "",
    liftTo: "",
    media: [] as File[],
    moveDate: "",
    moveOption: "",
  };

  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>(defaultFormData);
  

  // ✅ Load saved data after client hydration
  useEffect(() => {
    const savedStep = localStorage.getItem("moveFormStep");
    const savedData = localStorage.getItem("moveFormData");

    if (savedStep) setStep(Number(savedStep));
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (err) {
        console.error("Failed to parse saved form data", err);
      }
    }

    setHydrated(true);
  }, []);
  // ✅ Save progress to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("moveFormStep", step.toString());
    }
  }, [step, hydrated]);
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("moveFormData", JSON.stringify(formData));
    }
  }, [formData, hydrated]);
  if (!hydrated) {
    return <div className="text-center py-10">Se încarcă...</div>;
  }
  const toIsoDate = (d: any) => {
  if (!d) return "";
  if (typeof d === "string") {
    // deja string → îl returnăm direct
    return d;
  }
  if (typeof d.format === "function") {
    // obiect din react-multi-date-picker
    return d.format("YYYY-MM-DD");
  }
  if (d instanceof Date) {
    // nativ Date
    return d.toISOString().slice(0, 10);
  }
  try {
    // fallback – forțăm conversia
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return "";
  }
  }
  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      let mediaUrls: string[] = [];

      // dacă există fișiere și a selectat "media" (acum)
      if (formData.media && formData.media.length > 0 && formData.survey === "media") {
        mediaUrls = await Promise.all(
          formData.media.map(async (file: File) => {
            const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
          })
        );
      }

      // adăugăm cererea în Firestore
      const docRef = await addDoc(collection(db, "requests"), {
        ...formData,
        media: mediaUrls, // înlocuim File[] cu URL[]
        createdAt: Timestamp.now(),
      });

      // dacă a ales "media_later", trimitem email cu linkul de upload
      if (formData.survey === "media_later") {
        const uploadLink = `${window.location.origin}/upload/${docRef.id}`;

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            to_email: formData.email,
            to_name: formData.name || "Client",
            upload_link: uploadLink,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
      }

      alert("✅ Cererea a fost salvată cu succes!");
      setFormData(defaultFormData);
      setStep(0);
      localStorage.removeItem("moveFormData");
      localStorage.removeItem("moveFormStep");
    } catch (error) {
      console.error("Eroare la salvare:", error);
      alert("❌ A apărut o eroare la salvarea cererii.");
    }
  };
  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.serviceType !== "";
      case 1:
        if (formData.propertyType === "Casă") {
          return (
            formData.propertyType !== "" &&
            formData.rooms !== "" &&
            formData.houseFloors !== ""
          );
        }
        if (
          formData.propertyType === "Apartament" ||
          formData.propertyType === "Office"
        ) {
          return (
            formData.propertyType !== "" &&
            formData.rooms !== "" &&
            formData.floor !== "" &&
            (formData.floor === "Parter" || formData.lift !== "")
          );
        }
        if (formData.propertyType === "Storage") {
          return formData.propertyType !== "" && formData.rooms !== "";
        }
        return false;
      case 2:
        return formData.packing !== "";
      case 3:
        return formData.dismantling !== "";
      case 4:
        if (formData.propertyTypeTo === "Casă") {
          return (
            formData.propertyTypeTo !== "" &&
            formData.roomsTo !== "" &&
            formData.houseFloorsTo !== ""
          );
        }
        if (
          formData.propertyTypeTo === "Apartament" ||
          formData.propertyTypeTo === "Office"
        ) {
          return (
            formData.propertyTypeTo !== "" &&
            formData.roomsTo !== "" &&
            formData.floorTo !== "" &&
            (formData.floorTo === "Parter" || formData.liftTo !== "")
          );
        }
        return formData.propertyTypeTo !== "" && formData.roomsTo !== "";
      case 5:
        return formData.survey !== "";
      case 6:
        return true;
      case 7:
        return (
          formData.name !== "" &&
          formData.phone !== "" &&
          formData.email !== ""
        );
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          {/* Progress bar */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Pasul {step + 1} din {steps.length}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          {/* Step content */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Ce tip de serviciu dorești?
              </h2>
              {[
                "Mutare completă",
                "Transport câteva obiecte",
                "Aruncare lucruri",
              ].map((opt) => (
                <label
                  key={opt}
                  className="block p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="serviceType"
                    value={opt}
                    checked={formData.serviceType === opt}
                    onChange={(e) =>
                      handleChange("serviceType", e.target.value)
                    }
                    className="mr-2 text-green-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Tipul de proprietate și detalii colectare
              </h2>

              {/* Tip proprietate */}
              <label className="block font-medium mb-2">Tip proprietate</label>
              <select
                className="w-full border rounded-lg p-3 mb-4"
                value={formData.propertyType || ""}
                onChange={(e) => handleChange("propertyType", e.target.value)}
              >
                <option value="">Selectează tipul</option>
                <option>Casă</option>
                <option>Apartament</option>
                <option>Office</option>
                <option>Storage</option>
              </select>

              {/* Afișăm doar dacă a ales tipul */}
              {formData.propertyType && (
                <>
                  {formData.propertyType === "Storage" ? (
                    <>
                      <label className="block font-medium mb-2">Mărimea Storage (m³)</label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border rounded-lg p-3 mb-4"
                        value={formData.rooms || ""}
                        onChange={(e) => handleChange("rooms", e.target.value)}
                        placeholder="Ex: 12"
                      />
                    </>
                  ) : (
                    <>
                      <label className="block font-medium mb-2">Număr de camere</label>
                      <select
                        className="w-full border rounded-lg p-3 mb-4"
                        value={formData.rooms || ""}
                        onChange={(e) => handleChange("rooms", e.target.value)}
                      >
                        <option value="">Selectează</option>
                        <option>1 cameră</option>
                        <option>2 camere</option>
                        <option>3 camere</option>
                        <option>4 camere</option>
                        <option>5+ camere</option>
                      </select>
                    </>
                  )}
                </>
              )}

              {/* Dacă e Casă */}
              {formData.propertyType === "Casă" && formData.rooms && (
                <>
                  <label className="block font-medium mb-2">Câte etaje are casa?</label>
                  <select
                    className="w-full border rounded-lg p-3"
                    value={formData.houseFloors || ""}
                    onChange={(e) => handleChange("houseFloors", e.target.value)}
                  >
                    <option value="">Selectează</option>
                    <option>Fără etaj</option>
                    <option>1 etaj</option>
                    <option>2 etaje</option>
                    <option>3 etaje</option>
                  </select>
                </>
              )}

              {/* Dacă e Apartament / Office */}
              {(formData.propertyType === "Apartament" ||
                formData.propertyType === "Office") &&
                formData.rooms && (
                  <>
                    <label className="block font-medium mb-2">La ce etaj este?</label>
                    <select
                      className="w-full border rounded-lg p-3 mb-4"
                      value={formData.floor || ""}
                      onChange={(e) => handleChange("floor", e.target.value)}
                    >
                      <option value="">Selectează</option>
                      <option>Parter</option>
                      <option>Etaj 1</option>
                      <option>Etaj 2</option>
                      <option>Etaj 3</option>
                      <option>Etaj 4</option>
                      <option>Etaj 5+</option>
                    </select>

                    {formData.floor !== "" && formData.floor !== "Parter" && (
                      <>
                        <label className="block font-medium mb-2">Există lift?</label>
                        <select
                          className="w-full border rounded-lg p-3"
                          value={formData.lift || ""}
                          onChange={(e) => handleChange("lift", e.target.value)}
                        >
                          <option value="">Selectează</option>
                          <option>Da</option>
                          <option>Nu</option>
                        </select>
                      </>
                    )}
                  </>
                )}
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Ai nevoie de ajutor la împachetare?
              </h2>
              {["Da, complet", "Parțial", "Nu, ne ocupăm noi"].map((opt) => (
                <label
                  key={opt}
                  className="block p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="packing"
                    value={opt}
                    checked={formData.packing === opt}
                    onChange={(e) => handleChange("packing", e.target.value)}
                    className="mr-2 text-green-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Ai nevoie de ajutor la demontare și reasamblare mobilier?
              </h2>
              <select
                className="w-full border rounded-lg p-3"
                value={formData.dismantling}
                onChange={(e) => handleChange("dismantling", e.target.value)}
              >
                <option value="">Selectează...</option>
                <option value="none">Nu, nu este nevoie</option>
                <option value="all">
                  Da, pentru majoritatea pieselor
                </option>
              </select>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Tipul de proprietate la destinație
              </h2>

              {/* Tip proprietate */}
              <label className="block font-medium mb-2">Tip proprietate</label>
              <select
                className="w-full border rounded-lg p-3 mb-3"
                value={formData.propertyTypeTo}
                onChange={(e) => handleChange("propertyTypeTo", e.target.value)}
              >
                <option value="">Selectează...</option>
                <option>Casă</option>
                <option>Apartament</option>
                <option>Office</option>
                <option>Storage</option>
              </select>

              {/* Afișăm doar dacă a ales tipul */}
              {formData.propertyTypeTo && (
                <>
                  {formData.propertyTypeTo === "Storage" ? (
                    <>
                      <label className="block font-medium mb-2">Mărimea Storage (m³)</label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border rounded-lg p-3 mb-4"
                        value={formData.roomsTo || ""}
                        onChange={(e) => handleChange("roomsTo", e.target.value)}
                        placeholder="Ex: 20"
                      />
                    </>
                  ) : (
                    <>
                      <label className="block font-medium mb-2">Număr camere / spații</label>
                      <select
                        className="w-full border rounded-lg p-3 mb-3"
                        value={formData.roomsTo}
                        onChange={(e) => handleChange("roomsTo", e.target.value)}
                      >
                        <option value="">Selectează...</option>
                        <option>1 cameră</option>
                        <option>2 camere</option>
                        <option>3 camere</option>
                        <option>4 camere</option>
                        <option>5+ camere</option>
                      </select>
                    </>
                  )}
                </>
              )}

              {/* Dacă e Casă */}
              {formData.propertyTypeTo === "Casă" && formData.roomsTo && (
                <>
                  <label className="block font-medium mb-2">Câte etaje are casa?</label>
                  <select
                    className="w-full border rounded-lg p-3"
                    value={formData.houseFloorsTo || ""}
                    onChange={(e) => handleChange("houseFloorsTo", e.target.value)}
                  >
                    <option value="">Selectează...</option>
                    <option>1 etaj</option>
                    <option>2 etaje</option>
                    <option>3 etaje</option>
                    <option>4+ etaje</option>
                  </select>
                </>
              )}

              {/* Dacă e Apartament / Office */}
              {(formData.propertyTypeTo === "Apartament" ||
                formData.propertyTypeTo === "Office") &&
                formData.roomsTo && (
                  <>
                    <label className="block font-medium mb-2">La ce etaj este?</label>
                    <select
                      className="w-full border rounded-lg p-3 mb-3"
                      value={formData.floorTo}
                      onChange={(e) => handleChange("floorTo", e.target.value)}
                    >
                      <option value="">Selectează...</option>
                      <option>Parter</option>
                      <option>Etaj 1</option>
                      <option>Etaj 2</option>
                      <option>Etaj 3</option>
                      <option>Etaj 4</option>
                      <option>Etaj 5+</option>
                    </select>

                    {formData.floorTo !== "" && formData.floorTo !== "Parter" && (
                      <>
                        <label className="block font-medium mb-2">Există lift?</label>
                        <select
                          className="w-full border rounded-lg p-3"
                          value={formData.liftTo || ""}
                          onChange={(e) => handleChange("liftTo", e.target.value)}
                        >
                          <option value="">Selectează</option>
                          <option>Da</option>
                          <option>Nu</option>
                        </select>
                      </>
                    )}
                  </>
                )}
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Pentru o ofertă cât mai exactă, ești dispus să faci un survey?
              </h2>

              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="video"
                    checked={formData.survey === "video"}
                    onChange={(e) =>
                      setFormData({ ...formData, survey: e.target.value })
                    }
                    className="mr-2"
                  />
                  Da, prin video call (WhatsApp / Facebook ...)
                </label>

                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="in_person"
                    checked={formData.survey === "in_person"}
                    onChange={(e) =>
                      setFormData({ ...formData, survey: e.target.value })
                    }
                    className="mr-2"
                  />
                  Da, vizită în persoană
                </label>

                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="estimate"
                    checked={formData.survey === "estimate"}
                    onChange={(e) =>
                      setFormData({ ...formData, survey: e.target.value })
                    }
                    className="mr-2"
                  />
                  Nu, doresc doar o ofertă estimativă
                </label>

                {/* ✅ Opțiune atașare poze/video acum */}
                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="media"
                    checked={formData.survey === "media"}
                    onChange={(e) =>
                      setFormData({ ...formData, survey: e.target.value })
                    }
                    className="mr-2"
                  />
                  Vreau să atașez poze/video cu ce e de mutat acum
                </label>

                {/* ✅ Câmp upload */}
                {formData.survey === "media" && (
                  <div className="mt-4">
                    <label className="block mb-2 font-medium">
                      Încarcă poze/video
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          media: e.target.files ? Array.from(e.target.files) : [],
                        })
                      }
                      className="block w-full text-sm text-gray-700 border rounded cursor-pointer focus:outline-none focus:ring focus:ring-green-200"
                    />
                  </div>
                )}

                {/* ✅ Opțiune atașare mai târziu */}
                <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="media_later"
                    checked={formData.survey === "media_later"}
                    onChange={(e) =>
                      setFormData({ ...formData, survey: e.target.value })
                    }
                    className="mr-2"
                  />
                  Vreau să atașez poze/video cu ce e de mutat mai târziu
                </label>
              </div>
            </div>
          )}
{step === 6 && (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-xl font-bold mb-4 text-center">
      Când dorești să aibă loc mutarea?
    </h2>

    {/* Calendar pentru o singură dată */}
    <Calendar
      value={formData.moveDate || ""}
      onChange={(date) => {
        const toIsoDate = (d: any) => {
          if (!d) return "";
          if (typeof d === "string") return d;
          if (typeof d?.format === "function") {
            return d.format("YYYY-MM-DD");
          }
          try {
            return new Date(d).toISOString().slice(0, 10);
          } catch {
            return "";
          }
        };
        handleChange("moveDate", toIsoDate(date));
        handleChange("moveOption", "");
      }}
      className="custom-calendar text-lg relative z-40"
    />


    {/* Opțiuni alternative */}
    <div className="w-full flex flex-col space-y-3">
      {["Sunt flexibil cu data mutării", "Încă nu știu data mutării"].map((opt) => (
        <label
          key={opt}
          className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            name="moveOption"
            value={opt}
            checked={formData.moveOption === opt}
            onChange={(e) => {
              handleChange("moveOption", e.target.value);
              handleChange("moveDate", ""); // șterge data selectată dacă există
            }}
            className="mr-2"
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
)}









          {step === 7 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Datele tale de contact</h2>
              <input
                type="text"
                placeholder="Nume complet"
                className="w-full border rounded-lg p-3 mb-3"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Telefon"
                className="w-full border rounded-lg p-3 mb-3"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg p-3"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          )}
          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            {step > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Înapoi
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`ml-auto px-6 py-2 rounded-lg ${
                  isStepValid()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Următorul
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`ml-auto px-6 py-2 rounded-lg ${
                  isStepValid()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Trimite cererea
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
