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
  heroImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1920&q=80",
  collections: {
    men: "https://images.unsplash.com/photo-1622519407650-3df9883f76e5?w=800&q=80",
    women: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    kids: "https://images.unsplash.com/photo-1503341457502-2d958b3080b6?w=800&q=80",
  },
};
