"use client";
import React from "react";

interface StepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepSurvey({ formData, handleChange, setFormData }: StepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Pentru o ofertă cât mai exactă, ești dispus să faci un survey?
      </h2>

      <div className="space-y-3">
        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="video"
            checked={formData.survey === "video"}
            onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
            className="mr-2"
          />
          Da, prin video call (WhatsApp / Facebook ...)
        </label>

        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="in_person"
            checked={formData.survey === "in_person"}
            onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
            className="mr-2"
          />
          Da, vizită în persoană
        </label>

        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="estimate"
            checked={formData.survey === "estimate"}
            onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
            className="mr-2"
          />
          Nu, doresc doar o ofertă estimativă
        </label>

        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="media"
            checked={formData.survey === "media"}
            onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
            className="mr-2"
          />
          Vreau să atașez poze/video cu ce e de mutat acum
        </label>

        {formData.survey === "media" && (
          <div className="mt-4">
            <label className="block mb-2 font-medium">Încarcă poze/video</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  media: e.target.files ? Array.from(e.target.files) : [],
                })
              }
              className="block w-full text-sm text-gray-700 border rounded cursor-pointer focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
        )}

        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="media_later"
            checked={formData.survey === "media_later"}
            onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
            className="mr-2"
          />
          Vreau să atașez poze/video cu ce e de mutat mai târziu
        </label>
      </div>
    </div>
  );
}
