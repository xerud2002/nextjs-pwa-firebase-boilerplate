"use client";
import React from "react";
import Select from "react-select";
import counties from "../../utils/counties";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function StepDeliveryAddress({ formData, handleChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Adresa completă de livrare</h2>

      <Select
        className="mb-3"
        options={counties.map(c => ({ value: c, label: c }))}
        onChange={(opt) => handleChange("deliveryCounty", opt?.value)}
        value={formData.deliveryCounty ? { value: formData.deliveryCounty, label: formData.deliveryCounty } : null}
      />

      <input
        type="text"
        placeholder="Oraș / Localitate"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.deliveryCity || ""}
        onChange={(e) => handleChange("deliveryCity", e.target.value)}
      />

      <input
        type="text"
        placeholder="Stradă"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.deliveryStreet || ""}
        onChange={(e) => handleChange("deliveryStreet", e.target.value)}
      />

      <input
        type="text"
        placeholder="Număr"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.deliveryNumber || ""}
        onChange={(e) => handleChange("deliveryNumber", e.target.value)}
      />

      <input
        type="text"
        placeholder="Bloc / Scara / Etaj / Apartament (opțional)"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.deliveryDetails || ""}
        onChange={(e) => handleChange("deliveryDetails", e.target.value)}
      />

      <input
        type="text"
        placeholder="Cod poștal"
        className="w-full border rounded-lg p-3 mb-3"
        value={formData.deliveryPostal || ""}
        onChange={(e) => handleChange("deliveryPostal", e.target.value)}
      />

      <textarea
        className="w-full border rounded-lg p-3 mb-3"
        rows={3}
        placeholder="Instrucțiuni speciale pentru acces (ex: interfon, zonă cu restricții...)"
        value={formData.deliveryInstructions || ""}
        onChange={(e) => handleChange("deliveryInstructions", e.target.value)}
      />
    </div>
  );
}
