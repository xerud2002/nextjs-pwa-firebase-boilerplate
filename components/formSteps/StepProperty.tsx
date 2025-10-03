"use client";
import React from "react";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepProperty({ formData, handleChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tipul de proprietate și detalii colecție</h2>

      <label className="block font-medium mb-2">Tip proprietate</label>
      <select
        className="w-full border rounded-lg p-3 mb-4"
        value={formData.propertyType || ""}
        onChange={(e) => handleChange("propertyType", e.target.value)}
        aria-label="Tip proprietate"
      >
        <option value="">Selectează tipul</option>
        <option>Casă</option>
        <option>Apartament</option>
        <option>Office</option>
        <option>Storage</option>
      </select>

      {formData.propertyType && (
        <>
          {formData.propertyType === "Storage" ? (
            <>
              <label className="block font-medium mb-2">Mărimea Storage (m³)</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg p-3 mb-4"
                value={formData.rooms || ""}
                onChange={(e) => handleChange("rooms", e.target.value)}
                placeholder="Ex: 12"
              />
            </>
          ) : (
            <>
              <label className="block font-medium mb-2">Număr de camere</label>
              <select
                className="w-full border rounded-lg p-3 mb-4"
                value={formData.rooms || ""}
                onChange={(e) => handleChange("rooms", e.target.value)}
                aria-label="Număr de camere"
              >
                <option value="">Selectează</option>
                <option>1 cameră</option>
                <option>2 camere</option>
                <option>3 camere</option>
                <option>4 camere</option>
                <option>5+ camere</option>
              </select>
            </>
          )}
        </>
      )}

      {formData.propertyType === "Casă" && formData.rooms && (
        <>
          <label className="block font-medium mb-2">Câte etaje are casa?</label>
          <select
            className="w-full border rounded-lg p-3"
            value={formData.houseFloors || ""}
            onChange={(e) => handleChange("houseFloors", e.target.value)}
            aria-label="Câte etaje are casa?"
          >
            <option value="">Selectează</option>
            <option>Fără etaj</option>
            <option>1 etaj</option>
            <option>2 etaje</option>
            <option>3 etaje</option>
          </select>
        </>
      )}

      {(formData.propertyType === "Apartament" || formData.propertyType === "Office") && formData.rooms && (
        <>
          <label className="block font-medium mb-2">La ce etaj este?</label>
          <select
            className="w-full border rounded-lg p-3 mb-4"
            value={formData.floor || ""}
            onChange={(e) => handleChange("floor", e.target.value)}
            aria-label="La ce etaj este?"
          >
            <option value="">Selectează</option>
            <option>Parter</option>
            <option>Etaj 1</option>
            <option>Etaj 2</option>
            <option>Etaj 3</option>
            <option>Etaj 4</option>
            <option>Etaj 5+</option>
          </select>

          {formData.floor !== "" && formData.floor !== "Parter" && (
            <>
              <label className="block font-medium mb-2">Există lift?</label>
              <select
                className="w-full border rounded-lg p-3"
                value={formData.lift || ""}
                onChange={(e) => handleChange("lift", e.target.value)}
                aria-label="Există lift?"
              >
                <option value="">Selectează</option>
                <option>Da</option>
                <option>Nu</option>
              </select>
            </>
          )}
        </>
      )}
    </div>
  );
}
