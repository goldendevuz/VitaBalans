const logo = '/src/assets/images/VitaBalansLogo.jpg'

const products = [
  {
    id: 'p1',
    title: 'Energy Booster',
    price: 19.99,
    description: 'Tabiiy ekstraktlar bilan energiyangizni oshiring. Kun davomida kuch va tetiklikni ta\'minlaydi.',
    image: logo,
    category: 'Energiya',
    rating: 4.8
  },
  {
    id: 'p2',
    title: 'Mood Support',
    price: 24.99,
    description: 'Kayfiyat muvozanatini tiklash uchun o\'simlik tarkibli qo\'shimcha. Stress va tashvishni kamaytiradi.',
    image: logo,
    category: 'Kayfiyat',
    rating: 4.9
  },
  {
    id: 'p3',
    title: 'Daily Vitamins',
    price: 14.99,
    description: 'Umumiy salomatlik uchun kundalik multivitaminlar. Immunitetni mustahkamlaydi.',
    image: logo,
    category: 'Vitaminlar',
    rating: 4.7
  },
  {
    id: 'p4',
    title: 'Sleep Aid',
    price: 12.99,
    description: 'Tinch uyqu uchun yumshoq o\'simliklar. Uxlashni osonlashtiradi va uyqu sifatini yaxshilaydi.',
    image: logo,
    category: 'Uyqu',
    rating: 4.6
  },
  {
    id: 'p5',
    title: 'Omega-3 Plus',
    price: 29.99,
    description: 'Yurak va miya salomatligi uchun omega-3 yog\' kislotalari. Xotira va diqqatni yaxshilaydi.',
    image: logo,
    category: 'Vitaminlar',
    rating: 4.8
  },
  {
    id: 'p6',
    title: 'Immune Shield',
    price: 22.99,
    description: 'Immunitet tizimini mustahkamlovchi kompleks. Vitamin C, D va Zinc kombinatsiyasi.',
    image: logo,
    category: 'Immunitet',
    rating: 4.9
  },
  {
    id: 'p7',
    title: 'Joint Flex',
    price: 34.99,
    description: 'Bo\'g\'imlar va tog\'aylar uchun glukozamin va xondroitin. Harakatchanlikni yaxshilaydi.',
    image: logo,
    category: 'Bo\'g\'imlar',
    rating: 4.5
  },
  {
    id: 'p8',
    title: 'Beauty Complex',
    price: 27.99,
    description: 'Teri, soch va tirnoqlar uchun biotin va kollagen. Ichkaridan go\'zallik.',
    image: logo,
    category: 'Go\'zallik',
    rating: 4.7
  }
]

export const categories = [
  { id: 'all', name: 'Barcha mahsulotlar' },
  { id: 'Energiya', name: 'Energiya' },
  { id: 'Kayfiyat', name: 'Kayfiyat' },
  { id: 'Vitaminlar', name: 'Vitaminlar' },
  { id: 'Uyqu', name: 'Uyqu' },
  { id: 'Immunitet', name: 'Immunitet' },
  { id: "Bo'g'imlar", name: "Bo'g'imlar" },
  { id: "Go'zallik", name: "Go'zallik" },
]

export default products
