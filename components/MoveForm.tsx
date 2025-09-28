import { useState } from "react";

const steps = [
  {
    question: "What do you need to move?",
    options: [
      "4 bedrooms or larger",
      "3 bedrooms",
      "2 bedrooms",
      "1 bedroom home",
      "11-20 boxes / suitcases",
      "1-10 boxes / suitcases",
      "Sofa moving only",
    ],
  },
  {
    question: "Do you need help with packing?",
    options: [
      "Yes, please disassemble & pack all items",
      "Only large furniture & appliances",
      "No, we will do all the packing",
    ],
  },
  {
    question: "Will we use the stairs or a lift at the loading point?",
    options: [
      "We are on the ground floor",
      "Stairs - 1 to 3 floors",
      "Stairs - 4 floors or more",
      "Passenger lift",
      "Service lift",
    ],
  },
  {
    question: "Where are you moving from (postcode)?",
    input: true,
  },
  {
    question: "When are you moving?",
    options: [
      "Specific Time (choose date & hour)",
      "In Two Months",
      "In Six Months",
      "Just Looking For Price",
    ],
    input: true, // date picker
  },
];

export default function MoveForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else alert("Form submitted: " + JSON.stringify(answers, null, 2));
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

      {/* Question */}
      <h2 className="text-lg font-semibold mb-4">{currentStep.question}</h2>

      {/* Options */}
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

      {/* Input field (if exists) */}
      {currentStep.input && (
        <input
          type="text"
          placeholder="Type here..."
          value={answers[step] || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
      >
        {step === steps.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
}
