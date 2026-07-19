import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import storeConfig from "../../config/storeConfig";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-24">

      {/* Map Card */}
      {storeConfig.contact.mapEmbed && (
        <div className="section-padding pt-16">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-[32px] overflow-hidden border border-white/10 bg-black/20 p-2 shadow-2xl">
              <iframe
                title={`${storeConfig.storeName} Location`}
                src={storeConfig.contact.mapEmbed}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[26px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="section-padding py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl uppercase tracking-widest mb-5">
              {storeConfig.storeName}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Premium eyewear designed to combine style, comfort and quality.
              Discover our latest collections for every vision and lifestyle.
            </p>

            <div className="flex gap-3">

              {storeConfig.social.instagram && (
                <a
                  href={storeConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                >
                  <Instagram size={18} />
                </a>
              )}

              {storeConfig.social.facebook && (
                <a
                  href={storeConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                >
                  <Facebook size={18} />
                </a>
              )}

              {storeConfig.social.whatsapp && (
                <a
                  href={storeConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                >
                  <MessageCircle size={18} />
                </a>
              )}

            </div>
          </div>


          {/* Shop */}
          <div>
            <h4 className="uppercase tracking-widest text-sm mb-6 text-white">
              Shop
            </h4>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/shop"
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=prescription"
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                  Prescription Glasses
                </Link>
              </li>

              <li>
                <Link
                  to="/account"
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                  My Account
                </Link>
              </li>

            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="uppercase tracking-widest text-sm mb-6 text-white">
              Contact
            </h4>

            <div className="space-y-5">

              <a
                href={storeConfig.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-sm text-gray-400 hover:text-white transition"
              >
                <MapPin size={18} className="text-gray-500 shrink-0" />
                <span>{storeConfig.contact.address}</span>
              </a>


              <a
                href={`tel:${storeConfig.contact.phone.replace(/\s+/g, "")}`}
                className="flex gap-3 text-sm text-gray-400 hover:text-white transition"
              >
                <Phone size={18} className="text-gray-500 shrink-0" />
                <span>{storeConfig.contact.phone}</span>
              </a>


              <a
                href={`mailto:${storeConfig.contact.email}`}
                className="flex gap-3 text-sm text-gray-400 hover:text-white transition"
              >
                <Mail size={18} className="text-gray-500 shrink-0" />
                <span>{storeConfig.contact.email}</span>
              </a>

            </div>
          </div>


          {/* Information */}
          <div>
            <h4 className="uppercase tracking-widest text-sm mb-6 text-white">
              Information
            </h4>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Shipping
                </Link>
              </li>

              <li>
                <Link
                  to="/returns"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Returns
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-gray-500 tracking-widest text-center">
            {t("footer.copyright", {
              year,
              storeName: storeConfig.storeName,
            })}
          </p>


          <p className="text-xs text-gray-500 tracking-widest">
            Designed with care for modern eyewear brands
          </p>

        </div>
      </div>

    </footer>
  );
}