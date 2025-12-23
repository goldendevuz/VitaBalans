// Blog data for VitaBalans

const blogs = [
    {
        id: 'b1',
        title: "C vitamini qanday qabul qilish kerak?",
        subtitle: "Как Правильно Принимать Витамин C: Важные Нюансы и Рекомендации",
        image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400",
        category: "Vitaminlar",
        date: "2023-02-15",
        content: `Vitamin C, yoki askorbin kislotasi, organizmingiz salomatligini saqlashda muhim rol o'ynaydi. U nafaqat qon tomirlarini, tog'ay va suyaklardagi kollagenni shakllantrishga yordam beradi, balki erkin radikallarning zararli ta'siridan hujayralarni himoya qiluvchi kuchli antioksidant hamdir.

Ko'pchilik odamlar vitamin C ni xilma-xil va muvozanatli ovqatlanish orqali oladi, jumladan mevalar, sabzavotlar va rezavorlar. Biroq, ba'zi odamlarga vitamin C ni oziq-ovqat qo'shimchasi sifatida qo'shimcha ravishda qabul qilish kerak bo'lishi mumkin. Bu chekuvchilar, oshqozon-ichak kasalliklari yoki ayrim rak turlari bo'lgan odamlarga, shuningdek meva va sabzavotlarni yetarli miqdorda iste'mol qilmaydiganlarga tegishli.

Vitamin C ni qo'shimcha sifatida qabul qilishga qaror qilganlar uchun ma'lum tavsiyalarga amal qilish muhim. Kattalar uchun vitamin C ning tavsiya etilgan kunlik dozasi erkaklar uchun 90 milligramm va voyaga yetgan ayollar uchun 75 milligrammni tashkil etadi.`,
        recommendations: [
            "Kuniga 500-1000 mg dan oshmang",
            "Ovqat bilan birga qabul qiling",
            "Ertalab yoki tushlikda qabul qilish yaxshiroq"
        ],
        ingredients: [
            "Askorbin kislotasi",
            "Bioflavonoidlar",
            "Rozmarin ekstrakti"
        ],
        warnings: [
            "Homilador ayollar shifokor bilan maslahatlashing",
            "Oshqozon yallig'lanishi bo'lsa ehtiyot bo'ling"
        ]
    },
    {
        id: 'b2',
        title: "5 sabab, nima uchun letsitin juda foydali",
        subtitle: "Letsitin va uning organizmga ta'siri",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
        category: "Sog'liq",
        date: "2023-03-10",
        content: `Letsitin - bu organizmda muhim rol o'ynaydigan tabiiy yog' moddasidir. U hujayra membranalarining asosiy tarkibiy qismi bo'lib, miya faoliyati va jigar salomatligiga ijobiy ta'sir ko'rsatadi.

Letsitin fosfatidilxolin va boshqa fosfolipidlardan iborat bo'lib, ular xotira va diqqatni yaxshilashga yordam beradi. Bundan tashqari, u xolesterinni nazorat qilishda muhim rol o'ynaydi.`,
        recommendations: [
            "Kuniga 1-2 g qabul qiling",
            "Ovqat bilan birga qabul qilish tavsiya etiladi"
        ],
        ingredients: [
            "Fosfatidilxolin",
            "Fosfolipidlar",
            "Xolin"
        ],
        warnings: [
            "Allergiya bo'lsa shifokor bilan maslahatlang"
        ]
    },
    {
        id: 'b3',
        title: "Vitaminlar haqida 8 asosiy savol",
        subtitle: "Ko'p beriladigan savollarga javoblar",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
        category: "Vitaminlar",
        date: "2023-04-05",
        content: `Vitaminlar haqida ko'plab savollar tug'iladi. Qaysi vitamin qachon kerak? Qancha miqdorda qabul qilish kerak? Ushbu maqolada eng ko'p beriladigan savollarga javob beramiz.

1. Vitaminlarni ovqat bilan qabul qilish kerakmi?
Ha, ko'pchilik vitaminlar yog'da eriydigan (A, D, E, K) va ularni yog'li ovqat bilan qabul qilish yaxshiroq so'rilishiga yordam beradi.

2. Bir vaqtning o'zida bir necha vitamin qabul qilsa bo'ladimi?
Ha, lekin ayrim vitaminlar bir-biriga ta'sir qilishi mumkin. Masalan, kalsiy va temir birga qabul qilinmasligi kerak.`,
        recommendations: [
            "Shifokor bilan maslahatlashing",
            "Dozani oshirmang"
        ],
        ingredients: [],
        warnings: []
    },
    {
        id: 'b4',
        title: "Immunitetni mustahkamlash yo'llari",
        subtitle: "Tabiiy usullar bilan himoya tizimini kuchaytiring",
        image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400",
        category: "Immunitet",
        date: "2023-05-20",
        content: `Immunitet tizimi organizmni infeksiyalar va kasalliklardan himoya qiladi. Uni mustahkamlash uchun bir necha oddiy, lekin samarali usullar mavjud.

Yetarli uyqu, muntazam jismoniy faollik, muvozanatli ovqatlanish va stress boshqarish - bularning barchasi immunitetga ijobiy ta'sir ko'rsatadi. Bundan tashqari, vitamin C, D va sink kabi qo'shimchalar ham foydali bo'lishi mumkin.`,
        recommendations: [
            "Kuniga 7-8 soat uxlang",
            "Haftada 3-4 marta sport bilan shug'ullaning",
            "Meva va sabzavotlarni ko'proq iste'mol qiling"
        ],
        ingredients: [
            "Vitamin C",
            "Vitamin D",
            "Sink"
        ],
        warnings: []
    },
    {
        id: 'b5',
        title: "Omega-3 ning foydali xususiyatlari",
        subtitle: "Yurak va miya salomatligi uchun muhim yog' kislotasi",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        category: "Sog'liq",
        date: "2023-06-15",
        content: `Omega-3 yog' kislotalari organizmimiz uchun juda muhim bo'lib, ular tarkibida EPA va DHA mavjud. Bu moddalar yurak-qon tomir tizimi, miya faoliyati va ko'z salomatligi uchun zarur.

Omega-3 asosan yog'li baliq (losos, sardina, skumbriya), yong'oq va zig'ir urug'larida topiladi. Agar ovqatingizda yetarli miqdorda bo'lmasa, qo'shimcha sifatida qabul qilish tavsiya etiladi.`,
        recommendations: [
            "Haftada 2-3 marta baliq iste'mol qiling",
            "Qo'shimcha sifatida 1000-2000 mg kuniga"
        ],
        ingredients: [
            "EPA",
            "DHA",
            "Baliq yog'i"
        ],
        warnings: [
            "Qon suyultiradigan dorilar qabul qilayotganlar ehtiyot bo'lsin"
        ]
    },
    {
        id: 'b6',
        title: "Uyqu sifatini yaxshilash usullari",
        subtitle: "Tinch va sog'lom uyqu uchun maslahatlar",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400",
        category: "Uyqu",
        date: "2023-07-01",
        content: `Yaxshi uyqu - sog'lom hayotning asosi. Uyqu yetishmasligi stress, yurak kasalliklari va immun tizimi muammolariga olib kelishi mumkin.

Uyqu sifatini yaxshilash uchun muntazam uyqu jadvaliga amal qiling, uxlashdan oldin ekranlardan voz keching va dam olish usullarini qo'llang. Magnezig, melatonin va valerian kabi tabiiy qo'shimchalar ham yordam berishi mumkin.`,
        recommendations: [
            "Har kuni bir xil vaqtda yoting",
            "Uxlashdan 2 soat oldin ekranlarsiz",
            "Yotoq xonasini salqin va qorong'i saqlang"
        ],
        ingredients: [
            "Melatonin",
            "Magneziy",
            "Valerian"
        ],
        warnings: [
            "Melatoninni uzoq muddatga qabul qilmang"
        ]
    },
    {
        id: 'b7',
        title: "Vitamin D yetishmasligi belgilari",
        subtitle: "D vitamini va uning tanaga ta'siri",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400",
        category: "Vitaminlar",
        date: "2023-07-20",
        content: `Vitamin D - suyaklar va immunitet uchun juda muhim vitamin. U quyosh nuri ta'sirida terimizda ishlab chiqariladi, lekin ko'pchilik odamlarda yetishmaydi.

D vitamini yetishmasligi belgilari: charchoq, mushak zaifliği, suyak og'riq, tez-tez kasal bo'lish. Agar bu belgilar bo'lsa, shifokor bilan maslahatlashing va vitamin D darajangizni tekshirishing.`,
        recommendations: [
            "Kuniga 15-20 daqiqa quyoshda bo'ling",
            "Qo'shimcha sifatida 1000-4000 IU kuniga"
        ],
        ingredients: [
            "Xolekalsiferol (D3)"
        ],
        warnings: [
            "Ortiqcha qabul qilish toksik bo'lishi mumkin"
        ]
    },
    {
        id: 'b8',
        title: "Probiotiklar va ichak salomatligi",
        subtitle: "Foydali bakteriyalar va ularning roli",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
        category: "Sog'liq",
        date: "2023-08-10",
        content: `Ichak mikrobiotasi - bu ichakda yashovchi milliardlab bakteriyalar. Ular hazm qilish, immunitet va hatto kayfiyatga ta'sir qiladi.

Probiotiklar - bu foydali bakteriyalardir. Ular yoqurt, kefir, kimchi va boshqa fermentlangan mahsulotlarda topiladi. Probiotik qo'shimchalari ichak florasini tiklashga yordam beradi.`,
        recommendations: [
            "Fermentlangan mahsulotlarni muntazam iste'mol qiling",
            "Probiotikni antibiotik kursidan keyin qabul qilish foydali"
        ],
        ingredients: [
            "Lactobacillus",
            "Bifidobacterium"
        ],
        warnings: [
            "Immun tizimi zaif odamlar shifokor bilan gaplashsin"
        ]
    },
    {
        id: 'b9',
        title: "Temir va qon kamligining oldini olish",
        subtitle: "Temir yetishmasligi anemiyasi haqida",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        category: "Sog'liq",
        date: "2023-09-05",
        content: `Temir - qon yaratish uchun zarur mineral. Temir yetishmasligi anemiyasi charchoq, bosh aylanishi va zaiflikka olib keladi.

Temirga boy oziq-ovqatlar: qizil go'sht, jigar, loviya, shpinot va qoramtir shokolad. Vitamin C temir so'rilishini yaxshilaydi, shuning uchun temirli ovqatni sitrus mevalari bilan birga iste'mol qilish foydali.`,
        recommendations: [
            "Temirga boy ovqatlarni muntazam iste'mol qiling",
            "Vitamin C bilan birga qabul qiling"
        ],
        ingredients: [
            "Temir sulfat",
            "Fumarat temir"
        ],
        warnings: [
            "Ortiqcha temir zararli bo'lishi mumkin",
            "Bolalarga faqat shifokor tavsiyasi bilan"
        ]
    },
    {
        id: 'b10',
        title: "Go'zallik uchun vitaminlar",
        subtitle: "Teri, soch va tirnoqlar uchun eng yaxshi vitaminlar",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
        category: "Go'zallik",
        date: "2023-10-01",
        content: `Sog'lom teri, kuchli soch va tirnoqlar - bu ichkaridan boshlanadi. Ayrim vitaminlar va minerallar bu sohalarda alohida muhim.

Biotin (B7) - soch to'kilishiga qarshi eng mashhur vitamin. Vitamin E va C - teri antioksidantlari. Kollagen - teri elastikligini saqlaydi. Sink - tirnoq mustahkamligi uchun zarur.`,
        recommendations: [
            "Biotin kuniga 2500-5000 mkg",
            "Kollagen kuniga 5-10 g",
            "Vitamin E kuniga 15 mg"
        ],
        ingredients: [
            "Biotin",
            "Kollagen",
            "Vitamin E",
            "Sink"
        ],
        warnings: []
    }
]

export const blogCategories = [
    { id: 'all', name: 'Barcha maqolalar' },
    { id: 'Vitaminlar', name: 'Vitaminlar' },
    { id: "Sog'liq", name: "Sog'liq" },
    { id: 'Immunitet', name: 'Immunitet' },
    { id: 'Uyqu', name: 'Uyqu' },
    { id: "Go'zallik", name: "Go'zallik" }
]

export default blogs
