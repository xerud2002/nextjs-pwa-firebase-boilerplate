"use client";
import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function MoveForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    moveSize: "",
    packingHelp: "",
    stairsFrom: "",
    stairsTo: "",
    details: "",
    survey: "",
    postcodeFrom: "",
    postcodeTo: "",
    moveDate: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "requests"), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      alert("Cererea a fost salvată cu succes! ID: " + docRef.id);

      // Resetare formular
      setFormData({
        serviceType: "",
        moveSize: "",
        packingHelp: "",
        stairsFrom: "",
        stairsTo: "",
        details: "",
        survey: "",
        postcodeFrom: "",
        postcodeTo: "",
        moveDate: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Eroare la salvare:", error);
      alert("A apărut o eroare la salvarea cererii.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Formular Mutare</h1>

      {/* PAS 1 - Tip serviciu */}
      {step === 1 && (
        <div>
          <p className="font-semibold mb-2">Ce tip de serviciu dorești?</p>
          {["Mutare completă", "Doar câteva lucruri", "Aruncare obiecte"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="serviceType"
                value={opt}
                checked={formData.serviceType === opt}
                onChange={(e) => handleChange("serviceType", e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 2 - Dimensiune mutare */}
      {step === 2 && (
        <div>
          <p className="font-semibold mb-2">Ce dimensiune are mutarea?</p>
          {["1 cameră", "2 camere", "3 camere", "4+ camere"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="moveSize"
                value={opt}
                checked={formData.moveSize === opt}
                onChange={(e) => handleChange("moveSize", e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 3 - Ajutor împachetare */}
      {step === 3 && (
        <div>
          <p className="font-semibold mb-2">Ai nevoie de ajutor la împachetare?</p>
          {["Da, împachetare completă", "Doar mobilă mare & electrocasnice", "Nu"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="packingHelp"
                value={opt}
                checked={formData.packingHelp === opt}
                onChange={(e) => handleChange("packingHelp", e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 4 - Scări/Lift la plecare */}
      {step === 4 && (
        <div>
          <p className="font-semibold mb-2">La locația de plecare?</p>
          {["Parter", "1-3 etaje", "4+ etaje", "Lift persoane", "Lift marfă"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="stairsFrom"
                value={opt}
                checked={formData.stairsFrom === opt}
                onChange={(e) => handleChange("stairsFrom", e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 5 - Scări/Lift la destinație */}
      {step === 5 && (
        <div>
          <p className="font-semibold mb-2">La locația de destinație?</p>
          {["Parter", "1-3 etaje", "4+ etaje", "Lift persoane", "Lift marfă"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="stairsTo"
                value={opt}
                checked={formData.stairsTo === opt}
                onChange={(e) => handleChange("stairsTo", e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 6 - Survey */}
      {step === 6 && (
        <div>
          <p className="font-semibold mb-2">Pentru o estimare corectă, accepți un survey?</p>
          {["Video call", "Vizită în persoană", "Nu, prefer fără"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="survey"
                value={opt}
                checked={formData.survey === opt}
                onChange={(e) => handleChange("survey", e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 7 - Detalii suplimentare */}
      {step === 7 && (
        <div>
          <p className="font-semibold mb-2">Detalii suplimentare:</p>
          <textarea
            className="w-full border p-2 rounded"
            value={formData.details}
            onChange={(e) => handleChange("details", e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 8 - Date mutare */}
      {step === 8 && (
        <div>
          <p className="font-semibold mb-2">Date despre mutare:</p>
          <input
            type="text"
            placeholder="Cod poștal plecare"
            className="w-full border p-2 rounded mb-2"
            value={formData.postcodeFrom}
            onChange={(e) => handleChange("postcodeFrom", e.target.value)}
          />
          <input
            type="text"
            placeholder="Cod poștal destinație"
            className="w-full border p-2 rounded mb-2"
            value={formData.postcodeTo}
            onChange={(e) => handleChange("postcodeTo", e.target.value)}
          />
          <input
            type="date"
            className="w-full border p-2 rounded mb-2"
            value={formData.moveDate}
            onChange={(e) => handleChange("moveDate", e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded">
              Următorul
            </button>
          </div>
        </div>
      )}

      {/* PAS 9 - Date de contact */}
      {step === 9 && (
        <div>
          <p className="font-semibold mb-2">Date de contact:</p>
          <input
            type="text"
            placeholder="Nume complet"
            className="w-full border p-2 rounded mb-2"
            value={formData.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
          />
          <input
            type="tel"
            placeholder="Telefon"
            className="w-full border p-2 rounded mb-2"
            value={formData.contactPhone}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-2"
            value={formData.contactEmail}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
              Înapoi
            </button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
              Trimite cererea
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
