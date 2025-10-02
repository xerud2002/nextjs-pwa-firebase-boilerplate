"use client";
import React from "react";

interface StepServiceProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepService({ formData, handleChange }: StepServiceProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ce tip de serviciu dorești?</h2>
      {["Mutare completă", "Transport câteva obiecte", "Aruncare lucruri"].map((opt) => (
        <label
          key={opt}
          className="block p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
        >
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
  );
}
