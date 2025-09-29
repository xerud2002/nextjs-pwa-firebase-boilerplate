interface SurveyStepProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SurveyStep({ value, onChange }: SurveyStepProps) {
  const options = [
    { label: " Da, prin video call (WhatsApp / Facebook)", value: "video" },
    { label: " Da, vizită în persoană", value: "in_person" },
    { label: " Vreau să atașez poze/video cu ce e de mutat", value: "media" }
    { label: " Nu, doresc doar o ofertă estimativă", value: "estimate" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Pentru o ofertă cât mai exactă, ești dispus să faci un survey?
      </h3>

      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer ${
              value === opt.value ? "border-green-500 bg-green-50" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="survey"
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-green-600"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
