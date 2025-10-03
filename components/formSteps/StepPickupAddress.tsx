"use client";
import React from "react";
import Select from "react-select";
import counties from "../../utils/counties";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepPickupAddress({ formData, handleChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Adresa completă de colectare</h2>

      <Select
        className="mb-3"
        options={counties.map(c => ({ value: c, label: c }))}
        onChange={(opt) => handleChange("pickupCounty", opt?.value)}
        value={formData.pickupCounty ? { value: formData.pickupCounty, label: formData.pickupCounty } : null}
      />

      <input type="text" placeholder="Oraș / Localitate"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.pickupCity || ""}
        onChange={(e) => handleChange("pickupCity", e.target.value)}
      />
      <input type="text" placeholder="Stradă"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.pickupStreet || ""}
        onChange={(e) => handleChange("pickupStreet", e.target.value)}
      />
      <input type="text" placeholder="Număr"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.pickupNumber || ""}
        onChange={(e) => handleChange("pickupNumber", e.target.value)}
      />
      <input type="text" placeholder="Bloc / Scara / Etaj / Apartament (opțional)"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.pickupDetails || ""}
        onChange={(e) => handleChange("pickupDetails", e.target.value)}
      />
      <input type="text" placeholder="Cod poștal"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.pickupPostal || ""}
        onChange={(e) => handleChange("pickupPostal", e.target.value)}
      />
      <textarea className="w-full border rounded-lg p-3 mb-3" rows={3}
        placeholder="Instrucțiuni speciale pentru acces"
        value={formData.pickupInstructions || ""}
        onChange={(e) => handleChange("pickupInstructions", e.target.value)}
      />
    </div>
  );
}
