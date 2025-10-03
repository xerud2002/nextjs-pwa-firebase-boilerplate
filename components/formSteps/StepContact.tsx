"use client";
import React from "react";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepContact({ formData, handleChange }: StepProps) {
  return (
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
        className="w-full border rounded-lg p-3 border-gray-300"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      {!formData.email && (
        <p className="text-gray-600 text-sm mt-1">Emailul este obligatoriu</p>
      )}
    </div>
  );
}
