import { useTranslation } from "react-i18next";
import storeConfig from "../../config/storeConfig";
import { formatPrice } from "../../utils/helpers";

const LENS_TYPES = ["single", "progressive", "bifocal"];
const TREATMENTS = [
  { key: "anti-reflective", labelKey: "antiReflective" },
  { key: "blue-light", labelKey: "blueLight" },
  { key: "uv", labelKey: "uv" },
  { key: "photochromic", labelKey: "photochromic" },
];

export default function LensCustomizer({ framePrice, lensOptions, onChange }) {
  const { t } = useTranslation();
  const { type = "single", treatments = [] } = lensOptions || {};

  const typePrice = storeConfig.lensPricing.types[type] || 0;
  const treatmentTotal = treatments.reduce(
    (sum, tr) => sum + (storeConfig.lensPricing.treatments[tr] || 0),
    0
  );
  const total = framePrice + typePrice + treatmentTotal;

  const setType = (newType) => onChange({ type: newType, treatments });

  const toggleTreatment = (tr) => {
    const next = treatments.includes(tr)
      ? treatments.filter((x) => x !== tr)
      : [...treatments, tr];
    onChange({ type, treatments: next });
  };

  return (
    <div className="border border-gray-200 p-6 space-y-6">
      <h3 className="font-heading text-xl uppercase tracking-widest">{t("lens.title")}</h3>

      <div>
        <p className="text-xs uppercase tracking-widest mb-3">{t("lens.type")}</p>
        <div className="space-y-2">
          {LENS_TYPES.map((lt) => (
            <label key={lt} className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2 text-sm">
                <input type="radio" name="lensType" checked={type === lt} onChange={() => setType(lt)} />
                {t(`lens.${lt}`)}
              </span>
              <span className="text-sm text-gray-500">
                {storeConfig.lensPricing.types[lt] > 0
                  ? `+${formatPrice(storeConfig.lensPricing.types[lt])}`
                  : t("common.free")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest mb-3">{t("lens.treatments")}</p>
        <div className="space-y-2">
          {TREATMENTS.map((tr) => (
            <label key={tr.key} className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={treatments.includes(tr.key)}
                  onChange={() => toggleTreatment(tr.key)}
                />
                {t(`lens.${tr.labelKey}`)}
              </span>
              <span className="text-sm text-gray-500">
                +{formatPrice(storeConfig.lensPricing.treatments[tr.key])}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>{t("lens.frame")}</span>
          <span>{formatPrice(framePrice)}</span>
        </div>
        {typePrice > 0 && (
          <div className="flex justify-between text-gray-500">
            <span>{t(`lens.${type}`)}</span>
            <span>+{formatPrice(typePrice)}</span>
          </div>
        )}
        {treatments.map((tr) => (
          <div key={tr} className="flex justify-between text-gray-500">
            <span>{tr}</span>
            <span>+{formatPrice(storeConfig.lensPricing.treatments[tr])}</span>
          </div>
        ))}
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>{t("lens.total")}</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
