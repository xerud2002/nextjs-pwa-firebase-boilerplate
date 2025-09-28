import { useState } from "react";

const steps = [
  {
    question: "Ce ai de mutat?",
    options: [
      "Casă 4 camere sau mai mare",
      "Apartament 3 camere",
      "Apartament 2 camere",
      "Garsonieră",
      "11-20 cutii / valize",
      "1-10 cutii / valize",
      "Doar canapea",
    ],
  },
  {
    question: "Ai nevoie de ajutor la împachetare?",
    options: [
      "Da, demontare și împachetare completă",
      "Doar pentru mobilier/aparatură mare",
      "Nu, ne ocupăm noi de împachetare",
    ],
  },
  {
    question: "La adresa de încărcare se folosește scara sau liftul?",
    options: [
      "Parter",
      "Scări – 1-3 etaje",
      "Scări – peste 4 etaje",
      "Lift pentru persoane",
      "Lift de marfă",
    ],
  },
  {
    question: "Care este adresa de plecare? (localitate / cod poștal)",
    input: true,
  },
  {
    question: "Care este adresa de destinație? (localitate / cod poștal)",
    input: true,
  },
  {
    question: "Când dorești mutarea?",
    options: [
      "Dată și oră specifică",
      "În următoarele 2 luni",
      "În următoarele 6 luni",
      "Caut doar o estimare de preț",
    ],
    input: true, // aici putem pune un date picker ulterior
  },
];

export default function MoveForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      alert("Formular trimis: " + JSON.stringify(answers, null, 2));
    }
  };

  const handleChange = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Întrebare */}
      <h2 className="text-lg font-semibold mb-4">{currentStep.question}</h2>

      {/* Opțiuni */}
      {currentStep.options &&
        currentStep.options.map((opt, i) => (
          <label
            key={i}
            className="flex items-center space-x-3 border rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name={`step-${step}`}
              value={opt}
              checked={answers[step] === opt}
              onChange={() => handleChange(opt)}
              className="w-4 h-4 text-green-600"
            />
            <span>{opt}</span>
          </label>
        ))}

      {/* Câmp text (dacă există) */}
      {currentStep.input && (
        <input
          type="text"
          placeholder="Scrie aici..."
          value={answers[step] || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />
      )}

      {/* Butonul de navigare */}
      <button
        onClick={handleNext}
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
      >
        {step === steps.length - 1 ? "Trimite cererea" : "Următorul pas"}
      </button>
    </div>
  );
}
