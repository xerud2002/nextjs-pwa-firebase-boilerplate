"use client";
import React from "react";
import { Calendar } from "react-multi-date-picker";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepMoveDate({ formData, handleChange }: StepProps) {
  const toIsoDate = (d: any) => {
    if (!d) return "";
    if (typeof d === "string") return d;
    if (typeof d?.format === "function") return d.format("YYYY-MM-DD");
    try {
      return new Date(d).toISOString().slice(0, 10);
    } catch {
      return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4 text-center">
        Când dorești să aibă loc mutarea?
      </h2>

      <Calendar
        value={formData.moveDate || ""}
        onChange={(date) => {
          handleChange("moveDate", toIsoDate(date));
          handleChange("moveOption", "");
        }}
        className="custom-calendar text-lg relative z-40"
      />

      <div className="w-full flex flex-col space-y-3 mt-4">
        {["Sunt flexibil cu data mutării", "Încă nu știu data mutării"].map((opt) => (
          <label
            key={opt}
            className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="moveOption"
              value={opt}
              checked={formData.moveOption === opt}
              onChange={(e) => {
                handleChange("moveOption", e.target.value);
                handleChange("moveDate", "");
              }}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
