// ═══════════════════════════════════════════════════════════════
// ALL PRODUCT & CONTENT DATA
// ═══════════════════════════════════════════════════════════════

export const heroSlides = [
  {
    id: 1, name: "Pure Ice", image: "https://i.imgur.com/sLLnGFB.png",
    quote: "The cooling effect is sustained for over 50 minutes from a single application, my clients love it.",
    author: "Dr. Ralph J. Ghosn", role: "Physiotherapist", color: "bg-white",
  },
  {
    id: 2, name: "Pure Ice", image: "https://i.imgur.com/sLLnGFB.png",
    quote: "It provides exceptional relief. Most of my patients are asking to take tubes home for post-session recovery.",
    author: "Marie-Joe Eid", role: "Physiotherapist", color: "bg-blue-50",
  },
];

export const landingProducts = [
  { id: "pure-ice-gel", name: "PURE ICE Gel", category: "Cryo-Recovery", tagline: "Instant Cooling Revitalization", description: "A fast-absorbing cooling gel designed to provide an immediate refreshing sensation. Perfect for post-session application to revitalize tired skin and muscles.", keyFeatures: ["Long-lasting cooling", "Natural Eucalyptus essential oil", "Quick-dry formula"], activeIngredients: ["Menthol", "Eucalyptus Globulus Leaf Oil"], usage: "Apply a thin layer 3–5 times daily to desired areas. Ideal for post-activity refreshment.", packaging: "100 mL Professional Tube", colorClasses: { bg: "bg-blue-50", accent: "text-blue-600" }, iconName: "Wind" },
  { id: "actiflam-cream", name: "ACTIFLAM Cream", category: "Thermal Comfort", tagline: "Advanced Warming Sensation", description: "A specialized cream that provides a gentle, soothing warmth. Formulated with rosemary to help prepare the skin and muscles for manual therapy.", keyFeatures: ["Sustained warming effect", "Non-greasy professional texture", "Botanical Rosemary infusion"], activeIngredients: ["Wintergreen essential oil", "Rosemary Essential Oil"], usage: "Gently massage a thin layer into the skin 2–3 times daily.", packaging: "100 mL Professional Tube", colorClasses: { bg: "bg-orange-50", accent: "text-orange-600" }, iconName: "Flame" },
  { id: "massage-oil", name: "Targeted Comfort Massage Oil", category: "Professional Massage", tagline: "Smooth Glide & Thermal Support", description: "A high-performance massage oil that balances superior glide with a comforting warming effect. Designed for deep tissue work and muscle preparation.", keyFeatures: ["Enhanced tactile feedback", "Soothing thermal support", "Available in Vanilla, Chamomile, Coconut, Oud, Musk and Unscented"], activeIngredients: ["Wintergreen essential oil", "Rosemary Extract"], usage: "Warm a small amount in hands and massage gently until fully absorbed.", packaging: "250 mL Professional Bottle", colorClasses: { bg: "bg-amber-50", accent: "text-amber-600" }, iconName: "Droplets" },
  { id: "massage-lotion", name: "Professional Massage Lotion", category: "Hydrating Therapy", tagline: "Velvety Glide & Deep Hydration", description: "A rich, non-greasy lotion formulated for extended massage sessions. Enriched with an Aloe Vera base to soothe the skin while providing superior drag and moisture control.", keyFeatures: ["Aloe Vera enriched base", "Non-greasy finish", "Available in Aloe, Chamomile, Lavender, Vanilla"], activeIngredients: ["Aloe Barbadensis Leaf", "Vitamin E", "Botanical Extracts"], usage: "Apply generously to skin. Perfect for Swedish massage and clients requiring extra hydration.", packaging: "Professional Pump Bottle", colorClasses: { bg: "bg-purple-50", accent: "text-purple-600" }, iconName: "Sparkles" },
  { id: "firmessence-cream", name: "Firmessence Cream", category: "Skin Toning", tagline: "Natural Firming & Elasticity", description: "A specialized cosmetic cream formulated with Cypress oil to improve skin texture and elasticity. Promotes a smoother, more toned skin appearance.", keyFeatures: ["Skin-firming Cypress oil", "Improves skin smoothness", "Hydrating formula"], activeIngredients: ["Cypress Essential Oil", "Shea Butter Base"], usage: "Massage into targeted areas twice daily using circular motions.", packaging: "100 mL Professional Tube", colorClasses: { bg: "bg-emerald-50", accent: "text-emerald-600" }, iconName: "Leaf" },
  { id: "firmessence-oil", name: "Firmessence Oil", category: "Skin Toning", tagline: "Intensive Smoothing Oil", description: "A potent blend of cypress and vitamin E designed for professional massage. Focuses on improving skin tone and reducing the appearance of uneven texture.", keyFeatures: ["Antioxidant Vitamin E", "High-glide toning formula", "Absorbs without heavy residue"], activeIngredients: ["Cypress Essential Oil", "Vitamin E"], usage: "For professional use. Apply to dampened skin for maximum absorption during massage.", packaging: "250 mL Professional Bottle", colorClasses: { bg: "bg-teal-50", accent: "text-teal-600" }, iconName: "Droplets" },
];

export const shopItems = [
  { id: 107, slug: "hydrating-body-lotion", name: "Hydrating Body Lotion", price: 15, image: null, description: "Aloe Vera Base (500mL Pump Bottle)", iconName: "Sparkles", iconColor: "text-purple-500", scents: null, sizes: null, categories: ["Personal care"], details: { ingredients: ["Aloe Barbadensis Leaf", "Vitamin E", "Botanical Extracts"], usage: "Apply generously to skin. Perfect for Swedish massage and clients requiring extra hydration without greasiness." } },
  { id: 101, slug: "premium-massage-candle", name: "Premium Massage Candle", price: null, image: "https://imgur.com/OJsrnB1.png", description: "Natural Soy Wax Blend", iconName: "Flame", iconColor: "text-amber-500", scents: ["Vanilla", "Chamomile", "Oud", "Musk", "Unscented"], sizes: [{ label: "Standard (80g)", price: 12 }, { label: "Large (160g)", price: 17 }], categories: ["Massage supplies", "Personal care"], details: { ingredients: ["Natural Soy Wax", "Essential Oils", "Cotton Wick", "Shea Butter"], usage: "Light the wick and allow the wax to melt for 10-15 minutes. Blow out the flame and pour the warm, nourishing oil directly onto the skin for a soothing massage." } },
  { id: 102, slug: "targeted-massage-oil", name: "Targeted Massage Oil", price: 14, image: "https://imgur.com/4D9PFvq.png", description: "Deep tissue blend (250mL)", iconName: "Droplets", iconColor: "text-emerald-600", scents: ["Vanilla", "Chamomile", "Oud", "Musk", "Unscented"], sizes: null, categories: ["Massage supplies", "Personal care"], details: { ingredients: ["Wintergreen essential oil", "Rosemary Extract", "Carrier Oils Blend"], usage: "Warm a small amount in hands and massage gently until fully absorbed. Designed for deep tissue work." } },
  { id: 103, slug: "pure-ice-gel", name: "Pure Ice Gel", price: 12, image: "https://i.imgur.com/XXfbpzI.png", description: "Cryo-Recovery Formula (100mL)", iconName: "Wind", iconColor: "text-blue-500", scents: null, sizes: null, categories: ["For active people", "Personal care"], details: { ingredients: ["Menthol", "Eucalyptus Globulus Leaf Oil", "Cooling Agents"], usage: "Apply a thin layer 3–5 times daily to desired areas. Ideal for post-activity refreshment and cooling relief." } },
  { id: 104, slug: "actiflam-cream", name: "Actiflam Cream", price: 12, image: "https://imgur.com/YjGjz0G.png", description: "Warming Rosemary Formula (100mL)", iconName: "Flame", iconColor: "text-orange-500", scents: null, sizes: null, categories: ["For active people", "Personal care"], details: { ingredients: ["Wintergreen essential oil", "Rosemary Essential Oil", "Warming Agents"], usage: "Gently massage a thin layer into the skin 2–3 times daily to provide soothing warmth." } },
  { id: 105, slug: "firmessence-cream", name: "Firmessence Cream", price: 14, image: null, description: "Skin Toning with Cypress (100mL)", iconName: "Leaf", iconColor: "text-emerald-500", scents: null, sizes: null, categories: ["Cellulite care", "Personal care"], details: { ingredients: ["Cypress Essential Oil", "Shea Butter Base", "Skin Firming Complex"], usage: "Massage into targeted areas twice daily using circular motions to improve skin texture and elasticity." } },
  { id: 106, slug: "firmessence-oil", name: "Firmessence Oil", price: 14, image: null, description: "Vitamin E Enriched (250mL)", iconName: "Droplets", iconColor: "text-teal-500", scents: null, sizes: null, categories: ["Cellulite care", "Personal care"], details: { ingredients: ["Cypress Essential Oil", "Vitamin E", "Nourishing Oil Base"], usage: "For professional use. Apply to dampened skin for maximum absorption during toning massage." } },
];

export const SHOP_CATEGORIES = ["All", "Massage supplies", "For active people", "Cellulite care", "Personal care"];

export const faqs = [
  { q: "Are these products professional-grade?", a: "Yes. Our formulations are specifically designed for physiotherapists, osteopaths, and massage therapists, focusing on the correct glide-to-absorption ratio for clinical manual therapy." },
  { q: "Do you offer wholesale pricing for clinics?", a: "Absolutely. We provide tiered wholesale pricing for physical therapy clinics, gyms, and sports clubs. Use our inquiry form below to receive our B2B price list." },
  { q: "Are the products safe for sensitive skin?", a: "Our products use cosmetic-grade botanical oils. However, as with any professional topical, we recommend a small patch test for clients with known hypersensitivity to essential oils." },
];

export const DELIVERY_FEE = 3.00;
export const WHATSAPP_NUMBER = "9613203567";
export const WEB3FORMS_KEY = "f23546d0-7c35-4655-adee-b6af9841d1cd";

export function getItemPrice(item, selectedSize) {
  if (item.sizes) {
    const size = item.sizes.find(s => s.label === selectedSize) || item.sizes[0];
    return size.price;
  }
  return item.price;
}

export function getShopItemBySlug(slug) {
  return shopItems.find(item => item.slug === slug) || null;
}
