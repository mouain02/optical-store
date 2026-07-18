export default {
  storeName: "optic store",
  logo: "/uploads/store/logo.png",
  favicon: "/uploads/store/favicon.png",
  currency: "TND",
  defaultLanguage: "en",
  theme: {
    primary: "#1a1a1a",
    accent: "#b83109",
    promoBar: "#2d2d2d",
  },
  contact: {
    phone: "+216 12 345 678",
    email: "hello@opticstore.com",
    address: "Avenue Habib Bourguiba, Tunis, Tunisia",
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
  heroImage: "src/assets/images/hero.jpg",
  collections: {
    men: "src/assets/images/collections/men.jpg",
    women: "src/assets/images/collections/women.jpg",
    kids: "src/assets/images/collections/kids.jpg",
  },
};
