"use client";
import React from "react";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepDeliveryProperty({ formData, handleChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tipul de proprietate la destinație</h2>

      <label className="block font-medium mb-2">Tip proprietate</label>
      <select
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.propertyTypeTo}
        onChange={(e) => handleChange("propertyTypeTo", e.target.value)}
        aria-label="Tip proprietate"
      >
        <option value="">Selectează...</option>
        <option>Casă</option>
        <option>Apartament</option>
        <option>Office</option>
        <option>Storage</option>
      </select>

      {formData.propertyTypeTo === "Casă" && (
        <>
          <label className="block font-medium mb-2">Număr camere</label>
          <select className="w-full border rounded-lg p-3 mb-3"
            value={formData.roomsTo}
            onChange={(e) => handleChange("roomsTo", e.target.value)}
            aria-label="Număr camere"
          >
            <option value="">Selectează...</option>
            <option>1 cameră</option>
            <option>2 camere</option>
            <option>3 camere</option>
            <option>4 camere</option>
            <option>5+ camere</option>
          </select>
          <label className="block font-medium mb-2">Câte etaje are casa?</label>
          <select className="w-full border rounded-lg p-3"
            value={formData.houseFloorsTo || ""}
            onChange={(e) => handleChange("houseFloorsTo", e.target.value)}
            aria-label="Câte etaje are casa?"
          >
            <option value="">Selectează...</option>
            <option>1 etaj</option>
            <option>2 etaje</option>
            <option>3 etaje</option>
            <option>4+ etaje</option>
          </select>
        </>
      )}

      {(formData.propertyTypeTo === "Apartament" || formData.propertyTypeTo === "Office") && (
        <>
          <label className="block font-medium mb-2">Număr camere</label>
          <select className="w-full border rounded-lg p-3 mb-3"
            value={formData.roomsTo}
            onChange={(e) => handleChange("roomsTo", e.target.value)}
            aria-label="Număr camere"
          >
            <option value="">Selectează...</option>
            <option>1 cameră</option>
            <option>2 camere</option>
            <option>3 camere</option>
            <option>4 camere</option>
            <option>5+ camere</option>
          </select>
          <label className="block font-medium mb-2">La ce etaj este?</label>
          <select className="w-full border rounded-lg p-3 mb-3"
            value={formData.floorTo}
            onChange={(e) => handleChange("floorTo", e.target.value)}
            aria-label="La ce etaj este?"
          >
            <option value="">Selectează...</option>
            <option>Parter</option>
            <option>Etaj 1</option>
            <option>Etaj 2</option>
            <option>Etaj 3</option>
            <option>Etaj 4</option>
            <option>Etaj 5+</option>
          </select>
          {formData.floorTo !== "" && formData.floorTo !== "Parter" && (
            <>
              <label className="block font-medium mb-2">Există lift?</label>
              <select className="w-full border rounded-lg p-3"
                value={formData.liftTo || ""}
                onChange={(e) => handleChange("liftTo", e.target.value)}
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
