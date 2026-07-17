import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const features = [
  { key: "premiumFrames", icon: "◆" },
  { key: "qualityLenses", icon: "◎" },
  { key: "secureDelivery", icon: "▣" },
  { key: "customerSupport", icon: "◉" },
];

export default function FeatureRow() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-gray-100 py-12">
      <div className="section-padding grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-center"
          >
            <span className="text-accent text-xl mb-3 block" aria-hidden="true">{f.icon}</span>
            <p className="text-xs uppercase tracking-widest font-medium">{t(`features.${f.key}`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
