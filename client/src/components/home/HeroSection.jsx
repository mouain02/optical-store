import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import storeConfig from "../../config/storeConfig";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <img
        src={storeConfig.heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.85) brightness(0.9)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4 max-w-3xl"
      >
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-widest mb-4">
          {t("hero.title")}
        </h1>
        <p className="text-sm sm:text-base tracking-wide text-white/90 mb-8 font-body">
          {t("hero.subtitle")}
        </p>
        <Link to="/shop" className="btn-primary bg-white text-primary hover:bg-accent hover:text-white">
          {t("hero.cta")}
        </Link>
      </motion.div>
    </section>
  );
}
