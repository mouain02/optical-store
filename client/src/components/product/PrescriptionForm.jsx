import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function PrescriptionForm({ onSave, saving = false }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState("manual");
  const [file, setFile] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("label", data.label || "My Prescription");
    if (mode === "manual") {
      formData.append("rightEye", JSON.stringify({ sph: data.rSph, cyl: data.rCyl, axis: data.rAxis }));
      formData.append("leftEye", JSON.stringify({ sph: data.lSph, cyl: data.lCyl, axis: data.lAxis }));
      formData.append("pd", data.pd || "");
    }
    if (file) formData.append("file", file);
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={`text-xs uppercase tracking-widest ${mode === "upload" ? "text-accent font-medium" : "text-gray-500"}`}
          onClick={() => setMode("upload")}
        >
          {t("prescription.upload")}
        </button>
        <button
          type="button"
          className={`text-xs uppercase tracking-widest ${mode === "manual" ? "text-accent font-medium" : "text-gray-500"}`}
          onClick={() => setMode("manual")}
        >
          {t("prescription.manual")}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("label")} placeholder="Label" className="input-field" />

        {mode === "upload" && (
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="input-field"
          />
        )}

        {mode === "manual" && (
          <>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2">{t("prescription.rightEye")}</p>
              <div className="grid grid-cols-3 gap-2">
                <input {...register("rSph")} placeholder={t("prescription.sph")} className="input-field" />
                <input {...register("rCyl")} placeholder={t("prescription.cyl")} className="input-field" />
                <input {...register("rAxis")} placeholder={t("prescription.axis")} className="input-field" />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2">{t("prescription.leftEye")}</p>
              <div className="grid grid-cols-3 gap-2">
                <input {...register("lSph")} placeholder={t("prescription.sph")} className="input-field" />
                <input {...register("lCyl")} placeholder={t("prescription.cyl")} className="input-field" />
                <input {...register("lAxis")} placeholder={t("prescription.axis")} className="input-field" />
              </div>
            </div>
            <input {...register("pd")} placeholder={t("prescription.pd")} className="input-field" />
          </>
        )}

        <button type="submit" className="btn-primary w-full" disabled={saving}>
          {t("prescription.save")}
        </button>
      </form>
    </div>
  );
}
