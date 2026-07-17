import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import storeConfig from "../../config/storeConfig";

const collections = [
  { key: "men", gender: "men", image: storeConfig.collections.men },
  { key: "women", gender: "women", image: storeConfig.collections.women },
  { key: "kids", gender: "kids", image: storeConfig.collections.kids },
];

export default function CollectionGrid() {
  const { t } = useTranslation();

  return (
    <section className="section-padding py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col, i) => (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/shop?gender=${col.gender}`}
              className="block relative aspect-[3/4] overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <img
                src={col.image}
                alt={t(`collections.${col.key}`)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-120 ease-in-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-120" />
              <h2 className="absolute bottom-8 left-8 text-white font-heading text-3xl uppercase tracking-widest">
                {t(`collections.${col.key}`)}
              </h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
