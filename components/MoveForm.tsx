import { useState } from "react";
import SurveyStep from "./SurveyStep";

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
    name: "",
    phone: "",
    email: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Formular mutare</h2>

      {/* Pas 1 – Tip serviciu */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Ce dorești să faci?</h3>
          <div className="space-y-2">
            {["Mutare completă", "Transport câteva obiecte", "Debarasare / Aruncat lucruri"].map(
              (opt) => (
                <label key={opt} className="flex items-center space-x-2 border rounded-lg p-3">
                  <input
                    type="radio"
                    value={opt}
                    checked={formData.serviceType === opt}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  />
                  <span>{opt}</span>
                </label>
              )
            )}
          </div>
        </div>
      )}

      {/* Pas 2 – Dimensiune mutare */}
      {step === 2 && formData.serviceType === "Mutare completă" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Ce dimensiune are mutarea?</h3>
          <div className="space-y-2">
            {["Garsonieră", "2 camere", "3 camere", "4 camere sau mai mult"].map((opt) => (
              <label key={opt} className="flex items-center space-x-2 border rounded-lg p-3">
                <input
                  type="radio"
                  value={opt}
                  checked={formData.moveSize === opt}
                  onChange={(e) => setFormData({ ...formData, moveSize: e.target.value })}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Pas 3 – Ajutor la împachetare */}
      {step === 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Ai nevoie de ajutor la împachetare?</h3>
          <div className="space-y-2">
            {["Da, împachetare completă", "Doar mobilă/aparate mari", "Nu, ne ocupăm noi"].map(
              (opt) => (
                <label key={opt} className="flex items-center space-x-2 border rounded-lg p-3">
                  <input
                    type="radio"
                    value={opt}
                    checked={formData.packingHelp === opt}
                    onChange={(e) => setFormData({ ...formData, packingHelp: e.target.value })}
                  />
                  <span>{opt}</span>
                </label>
              )
            )}
          </div>
        </div>
      )}

      {/* Pas 4 – Acces ridicare */}
      {step === 4 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Acces la adresa de ridicare</h3>
          <div className="space-y-2">
            {["Parter", "Etaj 1-3 fără lift", "Etaj 4+ fără lift", "Lift persoane", "Lift marfă"].map(
              (opt) => (
                <label key={opt} className="flex items-center space-x-2 border rounded-lg p-3">
                  <input
                    type="radio"
                    value={opt}
                    checked={formData.stairsFrom === opt}
                    onChange={(e) => setFormData({ ...formData, stairsFrom: e.target.value })}
                  />
                  <span>{opt}</span>
                </label>
              )
            )}
          </div>
        </div>
      )}

      {/* Pas 5 – Acces destinație */}
      {step === 5 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Acces la adresa de destinație</h3>
          <div className="space-y-2">
            {["Parter", "Etaj 1-3 fără lift", "Etaj 4+ fără lift", "Lift persoane", "Lift marfă"].map(
              (opt) => (
                <label key={opt} className="flex items-center space-x-2 border rounded-lg p-3">
                  <input
                    type="radio"
                    value={opt}
                    checked={formData.stairsTo === opt}
                    onChange={(e) => setFormData({ ...formData, stairsTo: e.target.value })}
                  />
                  <span>{opt}</span>
                </label>
              )
            )}
          </div>
        </div>
      )}

      {/* Pas 6 – Detalii suplimentare */}
      {step === 6 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Detalii suplimentare</h3>
          <textarea
            placeholder="Descrie obiectele mari sau observațiile tale..."
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full border p-3 rounded-lg"
            rows={4}
          />
        </div>
      )}

      {/* Pas 7 – Survey */}
      {step === 7 && (
        <SurveyStep
          value={formData.survey}
          onChange={(val) => setFormData({ ...formData, survey: val })}
        />
      )}

      {/* Pas 8 – Adrese */}
      {step === 8 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Adrese</h3>
          <input
            type="text"
            placeholder="Cod poștal ridicare"
            value={formData.postcodeFrom}
            onChange={(e) => setFormData({ ...formData, postcodeFrom: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />
          <input
            type="text"
            placeholder="Cod poștal livrare"
            value={formData.postcodeTo}
            onChange={(e) => setFormData({ ...formData, postcodeTo: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />
        </div>
      )}

      {/* Pas 9 – Data mutării */}
      {step === 9 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Când dorești mutarea?</h3>
          <input
            type="date"
            value={formData.moveDate}
            onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
            className="w-full border p-3 rounded"
          />
        </div>
      )}

      {/* Pas 10 – Contact */}
      {step === 10 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Date de contact</h3>
          <input
            type="text"
            placeholder="Nume complet"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />
          <input
            type="text"
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />
        </div>
      )}

      {/* Navigație */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Înapoi
          </button>
        )}

        {step < 10 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Următorul
          </button>
        ) : (
          <button
            onClick={() => alert("Formular trimis: " + JSON.stringify(formData, null, 2))}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Trimite cererea
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2 mt-6 rounded">
        <div
          className="bg-green-500 h-2 rounded"
          style={{ width: `${(step / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
