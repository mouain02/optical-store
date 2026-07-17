import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import storeConfig from "../../config/storeConfig";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-24">
      <div className="section-padding py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading text-2xl uppercase tracking-widest mb-4">
            {storeConfig.storeName}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">{storeConfig.contact.address}</p>
          <p className="text-sm text-gray-400 mt-2">{storeConfig.contact.phone}</p>
          <p className="text-sm text-gray-400">{storeConfig.contact.email}</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="space-y-3">
            <li><Link to="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">{t("nav.shop")}</Link></li>
            <li><Link to="/shop?category=prescription" className="text-sm text-gray-400 hover:text-white transition-colors">{t("nav.prescription")}</Link></li>
            <li><Link to="/account" className="text-sm text-gray-400 hover:text-white transition-colors">{t("nav.account")}</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-widest mb-4 text-gray-500">{t("footer.contact")}</p>
          <div className="flex gap-4">
            {storeConfig.social.instagram && (
              <a href={storeConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Instagram</a>
            )}
            {storeConfig.social.facebook && (
              <a href={storeConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Facebook</a>
            )}
            {storeConfig.social.whatsapp && (
              <a href={storeConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">WhatsApp</a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-xs text-gray-500 tracking-widest">
          {t("footer.copyright", { year, storeName: storeConfig.storeName })}
        </p>
      </div>
    </footer>
  );
}
