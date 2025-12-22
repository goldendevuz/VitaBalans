
import logo from "../assets/images/VitaBalansLogo.jpg"

const products = [
  {
    id: 'p1',
    title: 'Energy Booster',
    price: 229900,
    oldPrice: 344900,
    available: true,
    description: 'Tabiiy ekstraktlar bilan energiyangizni oshiring. Kun davomida kuch va tetiklikni ta\'minlaydi.',
    image: logo,
    category: 'Energiya',
    rating: 4.8
  },
  {
    id: 'p2',
    title: 'Mood Support',
    price: 287400,
    available: true,
    oldPrice: 329400,
    description: 'Kayfiyat muvozanatini tiklash uchun o\'simlik tarkibli qo\'shimcha. Stress va tashvishni kamaytiradi.',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3P7-FrTKpVSxcE8HO6eWtqM_ACgp0sloUQ&s",
    category: 'Kayfiyat',
    rating: 4.9
  },
  {
    id: 'p3',
    title: 'Daily Vitamins',
    price: 172400,
    available: true,
    description: 'Umumiy salomatlik uchun kundalik multivitaminlar. Immunitetni mustahkamlaydi.',
    image: logo,
    category: 'Vitaminlar',
    rating: 4.7
  },
  {
    id: 'p4',
    title: 'Omega-3 Plus',
    price: 344900,
    available: false,
    description: 'Yurak va miya salomatligi uchun omega-3 yog\' kislotalari. Xotira va diqqatni yaxshilaydi.',
    image: logo,
    category: 'Vitaminlar',
    rating: 4.8
  },
  {
    id: 'p5',
    title: 'Immune Shield',
    price: 264400,
    available: true,
    description: 'Immunitet tizimini mustahkamlovchi kompleks. Vitamin C, D va Zinc kombinatsiyasi.',
    image: logo,
    category: 'Immunitet',
    rating: 4.9
  },
  {
    id: 'p6',
    title: 'Sleep Aid',
    price: 149400,
    available: true,
    description: 'Tinch uyqu uchun yumshoq o\'simliklar. Uxlashni osonlashtiradi va uyqu sifatini yaxshilaydi.',
    image: logo,
    category: 'Uyqu',
    rating: 4.6
  },
  {
    id: 'p7',
    title: 'Joint Flex',
    price: 402400,
    available: false,
    description: 'Bo\'g\'imlar va tog\'aylar uchun glukozamin va xondroitin. Harakatchanlikni yaxshilaydi.',
    image: logo,
    category: "Bo'g'imlar",
    rating: 4.5
  },
  {
    id: 'p8',
    title: 'Beauty Complex',
    price: 321900,
    available: true,
    description: 'Teri, soch va tirnoqlar uchun biotin va kollagen. Ichkaridan go\'zallik.',
    image: logo,
    category: "Go'zallik",
    rating: 4.7
  },
  {
    id: 'p9',
    title: 'Probiotic Balance',
    price: 198000,
    available: false,
    description: 'Ichak florasini tiklash va hazm qilishni qo\'llab-quvvatlash uchun probiotik kompleks.',
    image: logo,
    category: 'Sog\'liq',
    rating: 4.6
  },
  {
    id: 'p10',
    title: 'Hair & Nails Forte',
    price: 239500,
    available: true,
    description: 'Soch va tirnoqlarni mustahkamlash uchun vitamin va minerallar kompleksi.',
    image: logo,
    category: "Go'zallik",
    rating: 4.6
  }
]

export const categories = [
  { id: 'all', name: 'Barcha mahsulotlar' },
  { id: 'Energiya', name: 'Energiya' },
  { id: 'Kayfiyat', name: 'Kayfiyat' },
  { id: 'Vitaminlar', name: 'Vitaminlar' },
  { id: 'Immunitet', name: 'Immunitet' },
  { id: 'Uyqu', name: 'Uyqu' },
  { id: "Bo'g'imlar", name: "Bo'g'imlar" },
  { id: "Go'zallik", name: "Go'zallik" },
  { id: 'Sog\'liq', name: 'Sog\'liq' }
]

// Try to fetch latest products from backend API and replace local data at runtime.
// This keeps existing imports (which receive the `products` array reference) working
// while allowing the app to use server-provided prices when available.
if (typeof window !== 'undefined' && window.fetch) {
  try {
    fetch('https://api.vita-balans.uz/products')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return
        const mapped = data.map(item => ({
          id: item.id || item._id || item.slug || String(item.code || Math.random()),
          title: item.title || item.name || item.product_name || 'No title',
          price: Number(item.price) || Number(item.current_price) || 0,
          oldPrice: item.oldPrice || item.list_price || item.previous_price || null,
          available: item.available !== undefined ? Boolean(item.available) : true,
          description: item.description || item.desc || '',
          image: item.image || (item.images && item.images[0]) || logo,
          category: item.category || item.categoryName || 'Boshqa',
          rating: Number(item.rating) || 4.8
        }))

        // replace contents of the exported array so existing references update
        products.splice(0, products.length, ...mapped)
      })
      .catch(() => { })
  } catch (e) {
    // ignore in environments without fetch
  }
}

export default products
