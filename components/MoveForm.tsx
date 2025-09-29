"use client";
import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import SurveyStep from "./SurveyStep";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const steps = [
  "Tip serviciu",
  "Dimensiunea mutării",
  "Împachetare",
  "Etaj plecare",
  "Etaj destinație",
  "Survey estimare",
  "Detalii suplimentare",
  "Date contact",
];

export default function MoveForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
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
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "requests"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      alert("✅ Cererea a fost salvată cu succes!");
      setFormData({
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
      });
      setStep(0);
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
          return formData.propertyType !== "" && formData.rooms !== "" && formData.houseFloors !== "";
        }
        if (formData.propertyType === "Apartament" || formData.propertyType === "Office") {
          return (
            formData.propertyType !== "" &&
            formData.rooms !== "" &&
            formData.floor !== "" &&
            (formData.floor === "Parter" || formData.lift !== "")
          );
        };
        return false;
      case 2:
        return formData.packing !== "";
      case 3:
        return formData.stairsFrom !== "";
      case 4:
        return formData.stairsTo !== "";
      case 5:
        return formData.survey !== "";
      case 6:
        return true; // optional
      case 7:
        return formData.name !== "" && formData.phone !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  return (
  <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        {/* Progress bar simplificat */}
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
            <h2 className="text-xl font-bold mb-4">Ce tip de serviciu dorești?</h2>
            {["Mutare completă", "Transport câteva obiecte", "Aruncare lucruri"].map((opt) => (
              <label key={opt} className="block p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="serviceType"
                  value={opt}
                  checked={formData.serviceType === opt}
                  onChange={(e) => handleChange("serviceType", e.target.value)}
                  className="mr-2 text-green-600"
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Tipul de proprietate și detalii</h2>

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
            </select>

            {/* Număr camere (valabil pentru toate) */}
            <label className="block font-medium mb-2">Număr de camere</label>
            <select
              className="w-full border rounded-lg p-3 mb-4"
              value={formData.rooms || ""}
              onChange={(e) => handleChange("rooms", e.target.value)}
            >
              <option value="">Selectează</option>
              <option>Garsonieră</option>
              <option>2 camere</option>
              <option>3 camere</option>
              <option>4 camere</option>
              <option>5 camere</option>
              <option>6+ camere</option>
            </select>

            {/* Dacă este Casă */}
            {formData.propertyType === "Casă" && (
              <>
                <label className="block font-medium mb-2">Câte etaje are casa?</label>
                <select
                  className="w-full border rounded-lg p-3"
                  value={formData.houseFloors || ""}
                  onChange={(e) => handleChange("houseFloors", e.target.value)}
                >
                  <option value="">Selectează</option>
                  <option>Parter</option>
                  <option>Parter + 1 Etaj</option>
                  <option>Parter + 2 Etaje</option>
                  <option>Parter + 3 Etaje</option>
                </select>
              </>
            )}

            {/* Dacă este Apartament sau Office */}
            {(formData.propertyType === "Apartament" ||
              formData.propertyType === "Office") && (
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

                {/* Dacă etajul este mai mare decât Parter */}
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
            <h2 className="text-xl font-bold mb-4">Ai nevoie de ajutor la împachetare?</h2>
            {["Da, complet", "Doar mobilă mare", "Nu, ne ocupăm noi"].map((opt) => (
              <label key={opt} className="block p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
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
            <h2 className="text-xl font-bold mb-4">La ce etaj ești la plecare?</h2>
            <select
              className="w-full border rounded-lg p-3"
              value={formData.stairsFrom}
              onChange={(e) => handleChange("stairsFrom", e.target.value)}
            >
              <option value="">Selectează...</option>
              <option>Parter</option>
              <option>1–3 etaje fără lift</option>
              <option>4+ etaje fără lift</option>
              <option>Lift disponibil</option>
            </select>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">La ce etaj ești la destinație?</h2>
            <select
              className="w-full border rounded-lg p-3"
              value={formData.stairsTo}
              onChange={(e) => handleChange("stairsTo", e.target.value)}
            >
              <option value="">Selectează...</option>
              <option>Parter</option>
              <option>1–3 etaje fără lift</option>
              <option>4+ etaje fără lift</option>
              <option>Lift disponibil</option>
            </select>
          </div>
        )}

        {step === 5 && (
          <SurveyStep
            value={formData.survey}
            onChange={(val) => handleChange("survey", val)}
          />
        )}

        {step === 6 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Alte detalii pentru ofertă</h2>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={4}
              placeholder="Ex: canapea mare, parcare dificilă, acces strâmt..."
              value={formData.details}
              onChange={(e) => handleChange("details", e.target.value)}
            />
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

        {/* Navigation buttons */}
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

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
