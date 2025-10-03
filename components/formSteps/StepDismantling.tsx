"use client";
import React from "react";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepDismantling({ formData, handleChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Ai nevoie de ajutor la demontare și reasamblare mobilier?
      </h2>
      <select
        className="w-full border rounded-lg p-3"
        value={formData.dismantling}
        onChange={(e) => handleChange("dismantling", e.target.value)}
      >
        <option value="">Selectează...</option>
        <option value="none">Nu, nu este nevoie</option>
        <option value="all">Da, pentru majoritatea pieselor</option>
      </select>
    </div>
  );
}
