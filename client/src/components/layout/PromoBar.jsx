import { useTranslation } from "react-i18next";
import storeConfig from "../../config/storeConfig";

export default function PromoBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-promo text-white text-center text-xs tracking-widest uppercase py-2 px-4">
      {t(storeConfig.promo.messageKey, {
        amount: storeConfig.promo.threshold,
        currency: storeConfig.currency,
      })}
    </div>
  );
}
