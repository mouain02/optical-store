import hero from "../assets/images/hero.png";
import men from "../assets/images/collections/men.jpg";
import women from "../assets/images/collections/women.jpg";
import kids from "../assets/images/collections/kids.jpg";

export default {
  storeName: "optic store",

  logo: "/uploads/store/logo.png",
  favicon: "/uploads/store/favicon.png",

  currency: "TND",
  defaultLanguage: "en",

  theme: {
    primary: "#000000",
    accent: "#b83109",
    promoBar: "#000000",
  },

  contact: {
    phone: "+216 12 345 678",
    email: "hello@opticstore.com",
    address: "Avenue Habib Bourguiba, Tunis, Tunisia",

    // Google Maps
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Avenue+Habib+Bourguiba+Tunis+Tunisia",

    // Google Maps Embed
    mapEmbed:
      "https://www.google.com/maps?q=Avenue%20Habib%20Bourguiba%20Tunis%20Tunisia&output=embed",
  },

  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/21612345678",
  },

  promo: {
    messageKey: "promo.freeDelivery",
    threshold: 200,
  },

  shipping: {
    flatRate: 15,
    freeThreshold: 200,
  },

  lensPricing: {
    types: {
      single: 0,
      progressive: 150,
      bifocal: 100,
    },
    treatments: {
      "anti-reflective": 50,
      "blue-light": 80,
      uv: 30,
      photochromic: 120,
    },
  },

  heroImage: hero,

  collections: {
    men,
    women,
    kids,
  },
};