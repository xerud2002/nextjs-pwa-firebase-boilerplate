"use client";
import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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
    moveSize: "",
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

  const handleSubmit = () => {
    alert("Formular trimis:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            {steps.map((s, i) => (
              <span key={i} className={i <= step ? "text-green-600 font-medium" : ""}>{s}</span>
            ))}
          </div>
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
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="mr-2 text-green-600"
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Dimensiunea mutării</h2>
            <select
              className="w-full border rounded-lg p-3"
              value={formData.moveSize}
              onChange={(e) => setFormData({ ...formData, moveSize: e.target.value })}
            >
              <option value="">Selectează...</option>
              <option>Garsonieră</option>
              <option>2 camere</option>
              <option>3 camere</option>
              <option>4+ camere / casă mare</option>
            </select>
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
                  onChange={(e) => setFormData({ ...formData, packing: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, stairsFrom: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, stairsTo: e.target.value })}
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
          <div>
            <h2 className="text-xl font-bold mb-4">Cum vrei să faci estimarea?</h2>
            {["Video call", "Vizită la fața locului", "Nu, doar online"].map((opt) => (
              <label key={opt} className="block p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="survey"
                  value={opt}
                  checked={formData.survey === opt}
                  onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
                  className="mr-2 text-green-600"
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Alte detalii pentru ofertă</h2>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={4}
              placeholder="Ex: canapea mare, parcare dificilă, acces strâmt..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefon"
              className="w-full border rounded-lg p-3 mb-3"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg p-3"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          {step > 0 && (
            <button onClick={prevStep} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
              Înapoi
            </button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={nextStep} className="ml-auto px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
              Următorul
            </button>
          ) : (
            <button onClick={handleSubmit} className="ml-auto px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
              Trimite cererea
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
