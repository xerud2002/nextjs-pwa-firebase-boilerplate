import React from "react";

interface SurveyStepProps {
  value: string;
  onChange: (val: string) => void;
}

const SurveyStep: React.FC<SurveyStepProps> = ({ value, onChange }) => {
  const options = [
    { label: " Da, prin video call (WhatsApp / Facebook)", value: "video" },
    { label: " Da, vizită în persoană", value: "in_person" },
    { label: " Vreau să atașez poze/video cu ce e de mutat", value: "media" },
    { label: " Nu, doresc doar o ofertă estimativă", value: "estimate" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Cum preferi să obții o estimare corectă?
      </h2>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`block border p-3 rounded-lg cursor-pointer ${
              value === opt.value ? "border-green-500" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="survey"
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SurveyStep;
