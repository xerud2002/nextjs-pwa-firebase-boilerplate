"use client";
import React from "react";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepPacking({ formData, handleChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ai nevoie de ajutor la împachetare?</h2>
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
  );
}
