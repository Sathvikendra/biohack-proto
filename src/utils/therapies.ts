export interface Therapy {
  name: string;
  description: string;
  image?: string;
  category: "self" | "expert";
  keywords: string[];
}

export const therapies: Therapy[] = [
  // Self-administered or common therapies
  {
    name: "Infrared Sauna",
    description:
      "Hands-on therapy focusing on relieving stress, detoxification, blood circulation, skin health, and cardiovascular health.",
    category: "self",
    image: "https://source.unsplash.com/400x300/?sauna",
    keywords: ["stress", "detox", "circulation", "skin", "heart", "wellness"],
  },
  {
    name: "PEMF",
    description:
      "Pulsed Electromagnetic Field therapy for bone & muscle repair, organ health, immunity, pain relief, blood circulation, anti-allergen support, and neuroplasticity.",
    category: "self",
    image: "https://source.unsplash.com/400x300/?therapy",
    keywords: ["bone", "muscle", "pain", "immunity", "circulation", "recovery", "brain"],
  },
  {
    name: "EMS",
    description:
      "Electrical Muscle Stimulation for involuntary muscle contractions after injury or surgery to increase strength and endurance; used for muscle atrophy.",
    category: "self",
    image: "https://source.unsplash.com/400x300/?muscle",
    keywords: ["muscle", "strength", "endurance", "rehabilitation", "atrophy"],
  },
  {
    name: "Cold Plunge",
    description:
      "Cold water bath to reduce inflammation, soreness, improve exercise recovery, mental health, and mood.",
    category: "self",
    image: "https://source.unsplash.com/400x300/?ice-bath",
    keywords: ["inflammation", "recovery", "mental-health", "mood", "soreness", "cold"],
  },
  {
    name: "Nutritional IV",
    description:
      "Inject fluids, vitamins, minerals, and nutrients directly into the bloodstream when the digestive system is not sufficient.",
    category: "self",
    image: "https://source.unsplash.com/400x300/?iv",
    keywords: ["nutrition", "vitamins", "minerals", "hydration", "energy"],
  },
  {
    name: "Red Light Infrared",
    description:
      "Near infrared light to improve joint pain, muscle recovery, cellular health, and treat skin issues like wrinkles, wounds, acne, and hair growth.",
    category: "self",
    image: "https://source.unsplash.com/400x300/?red-light",
    keywords: ["skin", "healing", "joint", "muscle", "cellular", "hair", "recovery"],
  },

  // Expert-supervised therapies
  {
    name: "Photobiomodulation Helmet",
    description: "Procedure for brain health, mood improvement, and cognitive longevity.",
    category: "expert",
    keywords: ["brain", "cognition", "mood", "memory", "focus"],
  },
  {
    name: "UV-B Light",
    description: "Used widely for Vitamin D optimisation.",
    category: "expert",
    keywords: ["vitamin-d", "sunlight", "bones", "immunity"],
  },
  {
    name: "tDCS",
    description: "Transcranial Direct Current Stimulation to improve focus and concentration through memory training.",
    category: "expert",
    keywords: ["focus", "concentration", "memory", "brain", "neuroplasticity"],
  },
  {
    name: "Contrast Hydrotherapy",
    description: "Procedure for blood circulation improvement and faster recovery.",
    category: "expert",
    keywords: ["circulation", "recovery", "muscle", "inflammation", "therapy"],
  },
  {
    name: "Flotation Therapy",
    description: "Primarily for stress management and resetting the nervous system.",
    category: "expert",
    keywords: ["stress", "relaxation", "nervous-system", "mindfulness"],
  },
  {
    name: "Cryotherapy",
    description: "Reduces inflammation and boosts metabolism.",
    category: "expert",
    keywords: ["inflammation", "recovery", "metabolism", "pain", "cold"],
  },
  {
    name: "Ozone Therapy",
    description: "Balances oxidative stress mainly for immunity and antimicrobial support.",
    category: "expert",
    keywords: ["immunity", "oxidative-stress", "detox", "infection"],
  },
  {
    name: "Ketone IV",
    description: "Supports fat metabolism.",
    category: "expert",
    keywords: ["fat", "metabolism", "energy", "weight-loss"],
  },
  {
    name: "Fasting with CGM",
    description: "Uses Continuous Glucose Monitoring for weight management and metabolic flexibility.",
    category: "expert",
    keywords: ["fasting", "glucose", "weight", "metabolism", "insulin"],
  },
  {
    name: "Targeted Probiotic Infusion",
    description: "Aims to improve gut microbiome diversity.",
    category: "expert",
    keywords: ["gut", "probiotics", "microbiome", "digestion", "health"],
  },
  {
    name: "Colon Hydrotherapy",
    description: "Detoxification of the bowel.",
    category: "expert",
    keywords: ["detox", "colon", "digestion", "bowel", "cleanse"],
  },
  {
    name: "Gut Red Light Therapy",
    description: "Near infrared therapy for gut lining repair.",
    category: "expert",
    keywords: ["gut", "digestion", "healing", "inflammation", "cellular"],
  },
  {
    name: "HBOT",
    description: "Hyperbaric Oxygen Therapy for tissue oxygenation and stem cell activation.",
    category: "expert",
    keywords: ["oxygen", "tissue", "recovery", "healing", "stem-cells"],
  },
  {
    name: "PRP",
    description: "Collagen stimulation for skin and hair restoration.",
    category: "expert",
    keywords: ["skin", "hair", "collagen", "anti-aging", "regeneration"],
  },
  {
    name: "NAD+ IV Infusion",
    description: "Supports cellular energy production and DNA repair.",
    category: "expert",
    keywords: ["energy", "dna", "cells", "repair", "anti-aging"],
  },
  {
    name: "Epigenetic Age Testing",
    description: "Calculates biological age using several tests.",
    category: "expert",
    keywords: ["age", "biological-age", "longevity", "testing", "health"],
  },
];
