// ═══════════════════════════════════════════════════════════════
// ALL PRODUCT & CONTENT DATA
// ═══════════════════════════════════════════════════════════════

export const heroSlides = [
  {
    id: 1, name: "Pure Ice", image: "https://i.imgur.com/sLLnGFB.png",
    quote: "The cooling sensation is sustained for over 50 minutes from a single application, my clients love it.",
    author: "Dr. Ralph J. Ghosn", role: "Physiotherapist", color: "bg-white",
  },
  {
    id: 2, name: "Pure Ice", image: "https://i.imgur.com/sLLnGFB.png",
    quote: "It provides an exceptional sensation. Most of my patients are asking to take tubes home after their sessions.",
    author: "Marie-Joe Eid", role: "Physiotherapist", color: "bg-blue-50",
  },
];

export const landingProducts = [
  { id: "pure-ice-gel", name: "PURE ICE Gel", category: "Cooling Sensation", tagline: "Instant Cooling Freshness", description: "A fast-absorbing cooling gel designed to provide an immediate refreshing sensation. Perfect for post-session application to revitalize and refresh the skin.", keyFeatures: ["Long-lasting cooling sensation", "Natural Eucalyptus essential oil", "Quick-dry formula"], activeIngredients: ["Menthol", "Eucalyptus Globulus Leaf Oil"], usage: "Apply a thin layer to desired areas as needed for a refreshing cooling sensation.", packaging: "100 mL Professional Tube", colorClasses: { bg: "bg-blue-50", accent: "text-blue-600" }, iconName: "Wind" },
  { id: "actiflam-cream", name: "ACTIFLAM Cream", category: "Warming Sensation", tagline: "Botanical Warming Experience", description: "A specialized cream that delivers a gentle, comforting warming sensation. Formulated with rosemary to condition the skin and prepare it for manual therapy sessions.", keyFeatures: ["Sustained warming sensation", "Non-greasy professional texture", "Botanical Rosemary infusion"], activeIngredients: ["Wintergreen essential oil", "Rosemary Essential Oil"], usage: "Gently massage a thin layer into the skin before or after sessions.", packaging: "100 mL Professional Tube", colorClasses: { bg: "bg-orange-50", accent: "text-orange-600" }, iconName: "Flame" },
  { id: "massage-oil", name: "Targeted Comfort Massage Oil", category: "Professional Massage", tagline: "Smooth Glide & Warming Sensation", description: "A high-performance massage oil that balances superior glide with a comforting warming sensation. Designed to enhance the massage experience during deep tissue work.", keyFeatures: ["Enhanced tactile feedback", "Comforting warming sensation", "Available in Vanilla, Chamomile, Coconut, Oud, Musk and Unscented"], activeIngredients: ["Wintergreen essential oil", "Rosemary Extract"], usage: "Warm a small amount in hands and massage gently into the skin.", packaging: "250 mL Professional Bottle", colorClasses: { bg: "bg-amber-50", accent: "text-amber-600" }, iconName: "Droplets" },
  { id: "massage-lotion", name: "Professional Massage Lotion", category: "Hydrating Care", tagline: "Velvety Glide & Deep Hydration", description: "A rich, non-greasy lotion formulated for extended massage sessions. Enriched with an Aloe Vera base to hydrate and condition the skin while providing superior glide and moisture control.", keyFeatures: ["Aloe Vera enriched base", "Non-greasy finish", "Available in Aloe, Chamomile, Lavender, Vanilla"], activeIngredients: ["Aloe Barbadensis Leaf", "Vitamin E", "Botanical Extracts"], usage: "Apply generously to skin. Ideal for extended massage sessions and clients who prefer extra hydration.", packaging: "Professional Pump Bottle", colorClasses: { bg: "bg-purple-50", accent: "text-purple-600" }, iconName: "Sparkles" },
  { id: "firmessence-cream", name: "Firmessence Cream", category: "Skin Conditioning", tagline: "Firming & Smoothing Care", description: "A specialized cosmetic cream formulated with Cypress oil to help improve the appearance of skin texture and elasticity. Leaves skin looking smoother and more toned.", keyFeatures: ["Skin-conditioning Cypress oil", "Helps improve the appearance of skin smoothness", "Hydrating formula"], activeIngredients: ["Cypress Essential Oil", "Shea Butter Base"], usage: "Massage into desired areas twice daily using circular motions for best results.", packaging: "100 mL Professional Tube", colorClasses: { bg: "bg-emerald-50", accent: "text-emerald-600" }, iconName: "Leaf" },
  { id: "firmessence-oil", name: "Firmessence Oil", category: "Skin Conditioning", tagline: "Intensive Smoothing Oil", description: "A potent blend of cypress and vitamin E designed for professional massage. Helps improve the appearance of skin tone and texture for a more even, refined look.", keyFeatures: ["Antioxidant Vitamin E", "High-glide conditioning formula", "Absorbs without heavy residue"], activeIngredients: ["Cypress Essential Oil", "Vitamin E"], usage: "Apply to dampened skin during massage for enhanced absorption and a smoother skin appearance.", packaging: "250 mL Professional Bottle", colorClasses: { bg: "bg-teal-50", accent: "text-teal-600" }, iconName: "Droplets" },
];

export const shopItems = [
  { id: 107, slug: "hydrating-body-lotion", name: "Hydrating Body Lotion", price: 15, image: null, description: "Aloe Vera Base (500mL Pump Bottle)", iconName: "Sparkles", iconColor: "text-purple-500", scents: ["Aloe Vera", "Vanilla", "Chamomile"], sizes: null, categories: ["Personal care"], details: { ingredients: ["Aloe Barbadensis Leaf", "Vitamin E", "Botanical Extracts"], usage: "Apply generously to skin for deep hydration and a smooth, conditioned feel." } },
  { id: 101, slug: "premium-massage-candle", name: "Premium Massage Candle", price: null, image: "https://imgur.com/OJsrnB1.png", description: "Natural Soy Wax Blend", iconName: "Flame", iconColor: "text-amber-500", scents: ["Vanilla", "Chamomile", "Oud", "Musk", "Unscented"], sizes: [{ label: "Standard (80g)", price: 12 }, { label: "Large (160g)", price: 17 }], categories: ["Massage supplies", "Personal care"], details: { ingredients: ["Natural Soy Wax", "Essential Oils", "Cotton Wick", "Shea Butter"], usage: "Light the wick and allow the wax to melt for 10–15 minutes. Blow out the flame and pour the warm, nourishing oil directly onto the skin for a luxurious massage experience." } },
  { id: 102, slug: "targeted-massage-oil", name: "Targeted Massage Oil", price: 14, image: "https://imgur.com/4D9PFvq.png", description: "Deep tissue blend (250mL)", iconName: "Droplets", iconColor: "text-emerald-600", scents: ["Vanilla", "Chamomile", "Oud", "Musk", "Unscented"], sizes: null, categories: ["Massage supplies", "Personal care"], details: { ingredients: ["Wintergreen essential oil", "Rosemary Extract", "Carrier Oils Blend"], usage: "Warm a small amount in hands and massage gently into the skin. Formulated for an enhanced deep tissue massage experience." } },
  { id: 103, slug: "pure-ice-gel", name: "Pure Ice Gel", price: 12, image: "https://i.imgur.com/XXfbpzI.png", description: "Cooling Sensation Formula (100mL)", iconName: "Wind", iconColor: "text-blue-500", scents: null, sizes: null, categories: ["For active people", "Personal care"], details: { ingredients: ["Menthol", "Eucalyptus Globulus Leaf Oil", "Cooling Complex"], usage: "Apply a thin layer to desired areas as needed. Delivers an immediate, refreshing cooling sensation." } },
  { id: 104, slug: "actiflam-cream", name: "Actiflam Cream", price: 12, image: "https://imgur.com/YjGjz0G.png", description: "Warming Rosemary Formula (100mL)", iconName: "Flame", iconColor: "text-orange-500", scents: null, sizes: null, categories: ["For active people", "Personal care"], details: { ingredients: ["Wintergreen essential oil", "Rosemary Essential Oil", "Warming Complex"], usage: "Gently massage a thin layer into the skin for a comforting warming sensation." } },
  { id: 105, slug: "firmessence-cream", name: "Firmessence Cream", price: 14, image: null, description: "Skin Conditioning with Cypress (100mL)", iconName: "Leaf", iconColor: "text-emerald-500", scents: null, sizes: null, categories: ["Cellulite care", "Personal care"], details: { ingredients: ["Cypress Essential Oil", "Shea Butter Base", "Skin Conditioning Complex"], usage: "Massage into desired areas twice daily using circular motions to help improve the appearance of skin texture." } },
  { id: 106, slug: "firmessence-oil", name: "Firmessence Oil", price: 14, image: null, description: "Vitamin E Enriched (250mL)", iconName: "Droplets", iconColor: "text-teal-500", scents: null, sizes: null, categories: ["Cellulite care", "Personal care"], details: { ingredients: ["Cypress Essential Oil", "Vitamin E", "Nourishing Oil Base"], usage: "Apply to dampened skin during massage for enhanced absorption and a smoother, more conditioned skin appearance." } },
];

export const SHOP_CATEGORIES = ["All", "Massage supplies", "For active people", "Cellulite care", "Personal care"];

export const faqs = [
  { q: "Are these products professional-grade?", a: "Yes. Our cosmetic formulations are specifically developed for physiotherapists, osteopaths, and massage therapists, with the ideal glide-to-absorption ratio for professional manual techniques." },
  { q: "Do you offer wholesale pricing for clinics?", a: "Absolutely. We provide tiered wholesale pricing for physical therapy clinics, gyms, and sports clubs. Use our inquiry form below to receive our B2B price list." },
  { q: "Are the products safe for sensitive skin?", a: "Our products are formulated with cosmetic-grade botanical oils. As with any topical cosmetic product, we recommend a small patch test for individuals with known sensitivities to essential oils." },
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
