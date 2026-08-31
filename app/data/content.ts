export const company = {
  name: 'FLORES',
  tagline: 'Modern Yaşam, Güvenli Gelecek',
  phone: '444 0 917',
  phoneHref: 'tel:4440917',
  email: 'info@flores.com.tr',
  address: 'Kısıklı Mahallesi Hanımseti Sokak Ekşioğlu İş Merkezi, Kat: 2 Daire: 1, Üsküdar / İstanbul',
  maps: 'https://maps.app.goo.gl/5FzEoe5HFisNHJkv8',
  copyright: 'Copyright 2026 | Tüm hakları Misek İnşaat şirketine aittir.',
  legalNote:
    'Görsel materyaller tanıtım ve bilgi amaçlıdır. FLORES, projenin uygulaması sırasında teknik açıdan gerekli gördüğü değişikliği yapma hakkını saklı tutar.',
}

export const saleBadgeLabel = 'Satışta'

export const nav = [
  { label: 'Anasayfa', to: '/' },
  { label: 'Projeler', to: '/projects' },
  { label: 'Kurumsal', to: '/studio' },
  { label: 'Haberler', to: '/journal' },
  { label: 'Kariyer', to: '/kariyer' },
  { label: 'İletişim', to: '/iletisim' },
]

export const careers = [
  {
    slug: 'satis-danismani',
    title: 'Satış danışmanı',
    place: 'Satış ofisleri · İstanbul',
    cover: '/images/projects/deluxe.png',
    excerpt: 'Flores projelerinde yaşam hayalini anlatan, sahada ve ofiste güçlü bir satış ekibine katılırsın.',
  },
  {
    slug: 'musteri-deneyimi',
    title: 'Müşteri deneyimi',
    place: 'Genel merkez · Üsküdar',
    cover: '/images/projects/konaklari.png',
    excerpt: 'Ön talepten teslime kadar sakinlerle kurulan bağı net, sıcak ve takip edilebilir tutarsın.',
  },
  {
    slug: 'pazarlama',
    title: 'Pazarlama ve içerik',
    place: 'İstanbul',
    cover: '/images/projects/nova.png',
    excerpt: 'Projelerin görsel dilini, haberlerini ve kampanyalarını Flores arayüzüyle aynı hassasiyette üretirsin.',
  },
  {
    slug: 'acik-basvuru',
    title: 'Açık başvuru',
    place: 'Tüm ekipler',
    cover: '/images/hero-flores.png',
    excerpt: 'Açık ilan dışında da yeteneğini görmek isteriz. Portfolyoni veya özetini bırakman yeterli.',
  },
]

export const projects = [
  {
    slug: 'flores-konaklari',
    title: 'FLORES Konakları',
    location: 'Topkapı',
    lat: 41.0218,
    lng: 28.9172,
    type: 'Konut',
    status: 'ongoing',
    onSale: true,
    year: '2025',
    cover: '/images/projects/konaklari.png',
    excerpt:
      'Flores Konakları, 7662 metrekarelik bir alanda 12 katlı 3 blok ve 13 katlı 1 bloktan oluşan; 98 adet daire, 55 adet ofis ve 3 dükkân içeren bir projedir. Yaşam alanı tasarımları, bugünün teknik ve teknolojileri ile bir bedene bürünmüş, özlenen İstanbul’un ruhu ile hayat bulmuştur.',
    tour: 'https://kuula.co/share/collection/7F9GP?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    mix: [
      '1 adet 75 m² 2+1',
      '51 adet 119 m² 3+1',
      '22 adet 125 m² 3+1',
      '1 adet 169 m² 4+1',
      '23 adet 193 m² 5+1',
      '33 adet 48 m² ofis',
      '22 adet 41 m² ofis',
    ],
    plans: [
      { label: '3+1 A Tipi', src: '/images/projects/plans/konaklari-31a.webp' },
      { label: '3+1 B Tipi', src: '/images/projects/plans/konaklari-31b.webp' },
      { label: '5+1 A Tipi', src: '/images/projects/plans/konaklari-51a.webp' },
    ],
    gallery: [
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari.png' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-1.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-2.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-3.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-4.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-5.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-6.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-7.webp' },
      { alt: 'FLORES Konakları', src: '/images/projects/konaklari-8.webp' },
    ],
  },
  {
    slug: 'flores-nova',
    title: 'FLORES Nova',
    location: 'Zeytinburnu',
    lat: 41.0052,
    lng: 28.9058,
    type: 'Konut',
    status: 'ongoing',
    year: '2025',
    cover: '/images/projects/nova.png',
    excerpt:
      'FLORES Nova, Zeytinburnu’nda şehrin merkezinde modern yaşamın kapılarını aralıyor. Estetik, konfor ve güvenliği bir araya getiren bir yaşam alanı sunar.',
    gallery: [
      { alt: 'FLORES Nova', src: '/images/projects/nova.png' },
    ],
  },
  {
    slug: 'flores-deluxe',
    title: 'FLORES Deluxe',
    location: 'Cevizlibağ',
    lat: 41.0146,
    lng: 28.9264,
    type: 'Konut',
    status: 'ongoing',
    onSale: true,
    year: '2025',
    cover: '/images/projects/deluxe.png',
    excerpt:
      'İstanbul’un merkezinde, Cevizlibağ’da yükselen Flores Deluxe, modern şehir yaşamının ayrıcalıklarını bir araya getiriyor. 200 seçkin konut ile 1+1 ve 2+1 daire seçenekleri, ticari ünitelerle yatırımcılar ve sakinler için benzersiz fırsatlar sunuyor.',
    gallery: [
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe.png' },
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe-1.webp' },
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe-2.webp' },
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe-3.webp' },
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe-4.webp' },
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe-5.webp' },
      { alt: 'FLORES Deluxe', src: '/images/projects/deluxe-6.webp' },
    ],
  },
  {
    slug: 'flores-optimist',
    title: 'FLORES Optimist',
    location: 'Fikirtepe',
    lat: 41.0009,
    lng: 29.0488,
    type: 'Konut',
    status: 'completed',
    year: '2024',
    cover: '/images/projects/optimist.png',
    excerpt:
      'FLORES Optimist, Fikirtepe’de yükselen bir konut projesidir. Modern mimari ve seçkin yaşam standartlarını bir araya getirir.',
    gallery: [
      { alt: 'FLORES Optimist', src: '/images/projects/optimist.png' },
    ],
  },
  {
    slug: 'flores-evleri',
    title: 'FLORES Evleri',
    location: 'Topkapı',
    lat: 41.0184,
    lng: 28.9116,
    type: 'Konut',
    status: 'completed',
    year: '2025',
    cover: '/images/projects/evleri.png',
    excerpt:
      'Flores Evleri, modern tasarımı ve sürdürülebilir özellikleriyle konforlu bir yaşam sunuyor. Estetik ve güvenliği ön planda tutarak, hayallerinizdeki evi inşa ediyor.',
    gallery: [
      { alt: 'FLORES Evleri', src: '/images/projects/evleri.png' },
    ],
  },
]

export const contractProjects = [
  {
    slug: 'antakya-6-etap',
    title: 'Antakya 6. Etap',
    location: 'Hatay',
    year: '2024',
    area: '142.476 m²',
    cover: 'https://flores.com.tr/wp-content/uploads/2025/01/antakya-6-etap-2-min.webp',
    href: 'https://www.misek.com.tr/Projeler/egitim-projeleri/antakya-6-etap',
    excerpt: 'Hatay Antakya 6. Etap konut ve ticaret inşaatları ile altyapı ve çevre düzenleme işi.',
  },
  {
    slug: 'arnavutkoy-3-etap',
    title: 'Arnavutköy 3. Etap 12. Kısım',
    location: 'İstanbul',
    year: '2024',
    area: '84.357 m²',
    cover: 'https://flores.com.tr/wp-content/uploads/2025/01/arnavutkoy-1.webp',
    href: 'https://www.misek.com.tr/Projeler/ustyapi-ve-altyapi-projeleri/istanbul-arnavutkoy-dursunkoy-3-etap-12-kisim-konut-ticaret-ve-sosyal-donati-insaatlari-ile-altyapi',
    excerpt: 'İstanbul Arnavutköy Dursunköy 3. Etap 12. Kısım konut, ticaret ve sosyal donatı inşaatları.',
  },
  {
    slug: 'ordu-sehir-hastanesi',
    title: 'Ordu Şehir Hastanesi',
    location: 'Ordu',
    year: '2021',
    area: '312.258 m²',
    cover: 'https://flores.com.tr/wp-content/uploads/2025/01/ordu.webp',
    href: 'https://www.misek.com.tr/Projeler/saglik-projeleri/ordu-900-yatakli-sehir-hastanesi-yapim-isi',
    excerpt: 'Ordu 900 yataklı şehir hastanesi yapım işi.',
  },
  {
    slug: 'sakarya-kocaali-toki',
    title: 'Sakarya Kocaali TOKİ',
    location: 'Sakarya',
    year: '2021',
    area: '59.434 m²',
    cover: 'https://flores.com.tr/wp-content/uploads/2025/01/sakaryaili.webp',
    href: 'https://www.misek.com.tr/Projeler/ustyapi-ve-altyapi-projeleri/sakarya-ili-kocaali-ilcesi-caferiye-mahallesi-2-etap-403-konut-ve-1-adet-ticaret-merkezi-insaati-ile',
    excerpt: 'Sakarya Kocaali Caferiye Mahallesi 2. Etap 403 konut ve ticaret merkezi inşaatı.',
  },
]

export const locations = projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  district: project.location,
  lat: project.lat,
  lng: project.lng,
  cover: project.cover,
  type: project.type,
  excerpt: project.excerpt,
}))

export const journal = [
  {
    slug: 'iki-yeni-prestijli-proje-flores-gold-ve-flores-deluxe',
    title: 'İki Yeni Prestijli Proje: Flores Gold ve Flores Deluxe',
    date: 'Ocak 2025',
    read: '2 dk okuma',
    author: 'FLORES',
    role: 'Kurumsal',
    portrait: '/images/projects/deluxe.png',
    cover: '/images/projects/deluxe.png',
    images: [
      { src: '/images/projects/deluxe.png', caption: 'Flores Deluxe, Zeytinburnu' },
      { src: '/images/projects/nova.png', caption: 'Flores Nova' },
      { src: '/images/projects/konaklari.png', caption: 'Flores Konakları' },
    ],
    body: [
      'Zeytinburnu’nun en değerli lokasyonlarında iki yeni yaşam alanı hayata geçiyor: Flores Gold ve Flores Deluxe. Modern mimari anlayışıyla tasarlanan bu projeler, kentsel dönüşüm çalışmalarının başarılı örneklerinden biri olarak dikkat çekiyor. Yıkım çalışmaları tamamlanan projelerde inşa süreci hızla devam ediyor.',
      'Flores Gold: Şehir hayatının yeni merkezi. Zeytinburnu Litros Mahallesi’nde, Baltaş 1. Sanayi Sitesi’nde konumlanan Flores Gold, merkezi lokasyonu ve yenilikçi konseptiyle şehrin yeni yaşam merkezi olmaya hazırlanıyor. Konut ve çarşı alanlarını bir araya getiren bu proje, modern şehir yaşamının tüm ihtiyaçlarına yanıt vermeyi amaçlıyor.',
      'Flores Deluxe: Lüks ve konforu buluşturuyor. Maltepe Mahallesi, Mevlevihane Yolu Caddesi üzerinde konumlanan Flores Deluxe, seçkin bir yaşam sunmayı hedefleyen modern bir projedir. Hem konut hem de ticari alanlarıyla öne çıkan proje, merkezi lokasyon avantajıyla bölgenin cazibesini artırıyor.',
      'Her iki proje de ulaşım kolaylığı ve merkezi konumlarıyla dikkat çekiyor. Şehir içindeki önemli noktalara yakınlığıyla sakinlerine hem konforlu hem de pratik bir yaşam sunmayı hedefliyor.',
      'Flores Gold ve Flores Deluxe, Zeytinburnu’nun yenilenen yüzünü temsil ederek bölgeye değer katmayı hedefliyor.',
    ],
  },
  {
    slug: 'flores-topkapi-projesi',
    title: 'FLORES’ten İstanbul’a Yeni Bir Yaşam Alanı: Flores Topkapı Projesi',
    date: 'Ocak 2025',
    read: '3 dk okuma',
    author: 'FLORES',
    role: 'Kurumsal',
    portrait: '/images/projects/konaklari.png',
    cover: '/images/projects/konaklari.png',
    images: [
      { src: '/images/projects/konaklari.png', caption: 'Flores Topkapı / Konakları' },
      { src: '/images/projects/evleri.png', caption: 'Flores Evleri' },
      { src: '/images/projects/deluxe.png', caption: 'Flores Deluxe' },
    ],
    body: [
      'MİSEK İnşaat ve iştiraki FLORES, İstanbul’un merkezi semtlerinden Topkapı’da yeni bir yaşam alanı oluşturmak üzere Flores Topkapı projesini hayata geçiriyor. Toplam 5.000 m² alan üzerinde inşa edilecek olan proje, 2 bloktan oluşacak ve 156 daire ile 11 ticari üniteyi bünyesinde barındıracak.',
      'Flores Topkapı, 1+1’den 4+1’e kadar farklı daire seçenekleri sunarak çeşitli yaşam ihtiyaçlarına yanıt vermeyi hedefliyor. Proje, toplu taşıma araçlarına yakınlığıyla dikkat çekiyor; özellikle metro istasyonuna yürüme mesafesinde bulunması, şehir içi ulaşımı kolaylaştırıyor.',
      'Projede 2.000 m²’lik ekolojik bahçe, kapalı yüzme havuzları, fitness merkezi, sauna, Türk hamamı, çocuk oyun alanları, sinema odası ve basketbol sahası gibi sosyal donatılar yer alacak. Bu olanaklar, sakinlerine doğayla iç içe, sağlıklı ve konforlu bir yaşam sunmayı amaçlıyor.',
      'Flores Topkapı, modern mimarisi ve kaliteli inşaat standartlarıyla depreme dayanıklı, güvenli ve konforlu yaşam alanları sunmayı hedefliyor. Proje, İstanbul’un kalbinde, tarihi ve kültürel zenginliklere yakın bir konumda yer alarak sakinlerine hem şehir hayatının dinamizmini hem de huzurlu bir yaşamı bir arada sunuyor.',
      'Bu proje, MİSEK İnşaat ve FLORES’in İstanbul’a kazandırdığı nitelikli yaşam alanlarından biri olarak öne çıkıyor.',
    ],
  },
  {
    slug: 'floresin-turkiyenin-gelecegine-katkisi',
    title: 'FLORES’in Türkiye’nin Geleceğine Katkısı ve Önemi',
    date: 'Aralık 2024',
    read: '2 dk okuma',
    author: 'FLORES',
    role: 'Kurumsal',
    portrait: '/images/hero-flores.png',
    cover: '/images/hero-flores.png',
    images: [
      { src: '/images/hero-flores.png', caption: 'FLORES ve MİSEK İnşaat' },
      { src: '/images/projects/optimist.png', caption: 'Flores Optimist' },
      { src: '/images/projects/nova.png', caption: 'Flores Nova' },
    ],
    body: [
      'MİSEK İnşaat, altyapı, üstyapı, endüstriyel ve sağlık alanlarında gerçekleştirdiği projelerle Türkiye’nin geleceğine yön veren önemli bir aktör olarak öne çıkmaktadır. Toplamda 1,5 milyon m² inşaat alanı ve 16 tamamlanmış veya devam eden projeye imza atan şirket, ülkemizin ekonomik ve sosyal kalkınmasında önemli bir rol oynamaktadır.',
      'Özellikle sağlık sektöründe hayata geçirilen Ordu Şehir Hastanesi, modern sağlık hizmetlerine erişimi kolaylaştıran bir örnek niteliğindedir.',
      'MİSEK İnşaat’ın iştiraki olan FLORES, mimari mükemmeliyet ve insan odaklı tasarımları bir araya getirerek konut ve ticari alan projelerinde fark yaratmaktadır. FLORES markası, şehirlere değer katan projeleriyle yaşam kalitesini artırmayı hedeflerken, modern mimariyi çevreye duyarlı çözümlerle birleştiriyor.',
      'FLORES projelerinde kullanılan yenilikçi yöntemler ve kaliteli malzemeler, uzun ömürlü ve sürdürülebilir yaşam alanları sunmaktadır.',
      'MİSEK İnşaat ve FLORES, birlikte hayata geçirdikleri projelerle şehirlerin mimarisini dönüştürürken, insanların hayatlarına değer katmaya devam etmektedir.',
    ],
  },
  {
    slug: 'misek-insaat-ve-floresin-istihdama-katkisi',
    title: 'MİSEK İnşaat ve FLORES’in İstihdama ve Ekonomiye Katkısı',
    date: 'Aralık 2024',
    read: '2 dk okuma',
    author: 'FLORES',
    role: 'Kurumsal',
    portrait: '/images/projects/nova.png',
    cover: '/images/projects/nova.png',
    images: [
      { src: '/images/projects/nova.png', caption: 'Flores Nova' },
      { src: '/images/projects/deluxe.png', caption: 'Flores Deluxe' },
      { src: '/images/projects/evleri.png', caption: 'Flores Evleri' },
    ],
    body: [
      'MİSEK İnşaat, sektördeki güçlü konumunu nitelikli iş gücüyle desteklemekte ve 2.000’den fazla çalışanıyla ekonomiye önemli bir katkı sağlamaktadır. Şirket, farklı disiplinlerden profesyonelleri bir araya getirerek her projede yüksek kalite standartlarını yakalamaktadır.',
      'Bunun yanı sıra, çalışanlarına sunduğu eğitim ve gelişim olanakları, sektör genelinde nitelikli iş gücünün artmasına da öncülük etmektedir.',
      'MİSEK İnşaat’ın iştiraki olan FLORES, yalnızca projeleriyle değil, sağladığı istihdam olanaklarıyla da dikkat çekmektedir. FLORES, modern mimari ve yenilikçi tasarım anlayışıyla sektöre yeni bir soluk getirirken, genç ve dinamik yetenekleri bünyesine kazandırmaktadır.',
      'MİSEK İnşaat ve FLORES’in sağladığı ekonomik katkılar, yalnızca inşaat sektörünü değil, yan sektörleri ve yerel ekonomileri de olumlu yönde etkilemektedir.',
    ],
  },
]

export const testimonials = [
  {
    quote:
      'Hayallerinizdeki evi birlikte inşa ediyoruz. Flores, modern ve konforlu yaşam alanları sunar.',
    name: 'FLORES',
    studio: 'MİSEK İNŞAAT',
    image: '/images/projects/konaklari.png',
  },
  {
    quote:
      'Konfor, güvenlik ve estetiği bir araya getiren projelerimizle şehrin dokusuna değer katıyoruz.',
    name: 'FLORES Deluxe',
    studio: 'CEVİZLİBAĞ',
    image: '/images/projects/deluxe.png',
  },
  {
    quote:
      'Gelenekten aldığımız güçlü temel ile durmaksızın çalışıyoruz. Yaşam alanlarının ötesinde yaşam kalitesi inşa ediyoruz.',
    name: 'FLORES Konakları',
    studio: 'TOPKAPI',
    image: '/images/projects/konaklari.png',
  },
  {
    quote:
      'MİSEK İnşaat güvencesiyle kentsel dönüşüm projeleri geliştirerek İstanbul’a nitelikli yaşam alanları kazandırıyoruz.',
    name: 'FLORES Nova',
    studio: 'ZEYTİNBURNU',
    image: '/images/projects/nova.png',
  },
]

export const services = [
  {
    n: '1',
    title: 'Konforlu yaşam',
    copy: 'Modern mimari ve akıllı ev sistemleriyle donatılmış daireler; bireylerin ve ailelerin günlük ihtiyaçlarını karşılayan ferah yaşam alanları.',
    image: '/images/projects/konaklari.png',
  },
  {
    n: '2',
    title: 'Güvenlik ve huzur',
    copy: '7/24 güvenlik hizmetleri ve kontrollü giriş sistemleriyle, sakinlerine güvenli ve huzurlu bir yaşam ortamı sunuyoruz.',
    image: '/images/projects/deluxe.png',
  },
  {
    n: '3',
    title: 'Şehre değer katan projeler',
    copy: 'Şehrin dinamik yapısını ve tarihsel dokusunu gözeterek kentsel dönüşüm projeleriyle bölgelere değer katmayı hedefliyoruz.',
    image: '/images/projects/nova.png',
  },
]

export const studioAbout = {
  heroExcerpt:
    'En iyi projelerin içinde hayaller, arkasında Flores var. Konfor, güvenlik ve estetiği bir araya getiren kentsel dönüşüm projeleri geliştiriyoruz.',
  intro: {
    title: 'Hakkımızda',
    lead:
      'Flores, modern yaşamın ihtiyaçlarını karşılamak için yenilikçi projeler geliştiren ve MİSEK İnşaat’ın gücünü arkasına alan bir marka olarak, konfor, güvenlik ve estetiği bir araya getiren projeleriyle öne çıkmaktadır.',
    body: 'Şehrin dinamik yapısını ve tarihsel dokusunu göz önünde bulundurarak, kentsel dönüşüm projeleriyle bölgelere değer katmayı hedefliyoruz.',
  },
  flagship: {
    title: 'Flores Gold ve Flores Deluxe',
    body: 'Zeytinburnu’nda hayata geçirdiğimiz Flores Gold ve Flores Deluxe projeleri, yalnızca konut alanları değil, aynı zamanda ticari ve sosyal yaşamın yeni merkezlerini oluşturmayı amaçlamaktadır. Bu projelerle yüksek kalite standartlarımızı ve sürdürülebilir yaklaşımlarımızı bir araya getirerek, insanların daha iyi bir yaşam sürmesi için güvenli, modern ve estetik yaşam alanları tasarlıyoruz.',
  },
  mission: {
    title: 'Misyonumuz',
    body: 'Flores olarak, bireylerin ve ailelerin ihtiyaçlarını ön planda tutuyor; teknolojiyi ve çağdaş mimariyi birleştirerek benzersiz çözümler sunuyoruz. Yaşam alanları inşa etmenin ötesinde, yaşam kalitesini artırmayı ve topluma sosyal fayda sağlamayı misyon ediniyoruz.',
  },
  values: {
    title: 'Değerlerimiz',
    body: 'Flores; köklü geçmişinden aldığı güçle, değerlerini tüm çalışanlarına, tedarikçilerine ve projelerine yansıtarak faaliyetlerini sürdürmektedir. Sosyal paydaşları bilir ki, Flores İnşaat adil, güvenilir, vicdanlı, çalışkan, köklü ve duyarlıdır. Geçmişin değerleriyle bugün ve gelecek için bulunduğu her ortama katkı sağlar.',
    items: [
      {
        title: 'Değer Katar',
        body: 'FLORES İnşaat, altyapı, üstyapı, endüstriyel ve sağlık alanlarında marka değeri taşıyan projelere imza atarak, Türkiye’nin geleceğine kaliteli ve sürdürülebilir bir katkıda bulunmaktadır.',
      },
      {
        title: 'Güven',
        body: 'Güven odaklı bir çalışma anlayışı benimseyen FLORES İnşaat, uzman yaklaşımı, profesyonel duruşu ve güvenilir çalışanlarıyla değer üretir.',
      },
      {
        title: 'Vicdanlı',
        body: 'FLORES İnşaat, faaliyet gösterdiği tüm alanlarda değer katan sonuçlar elde etmek amacıyla kendini ve paydaşlarını sürekli geliştirir, çalışır ve mükemmeli arar. İşini en iyi şekilde icra ederken, kurucu ailenin köklerinden gelen vicdani sorumluluğunu her zaman ön planda tutar.',
      },
      {
        title: 'Adil',
        body: 'FLORES İnşaat için adil olmak ve hesap verebilirlik, şirketin değerlerinin temel yapı taşlarındandır.',
      },
      {
        title: 'Sosyal Fayda Odaklı',
        body: 'Finansal sağlamlığını çevreye ve topluma duyarlı bir yaklaşımla ele alarak, sosyal fayda sağlamaya odaklı iş stratejileri geliştirir.',
      },
      {
        title: 'Sürdürülebilir',
        body: 'FLORES İnşaat, sürdürülebilir bir gelecek için sorumluluk alır; öncü uygulamalarıyla yol gösterici bir konumda faaliyet gösterir.',
      },
      {
        title: 'İnovasyon',
        body: 'FLORES İnşaat, sektörde yenilikçi çözümler geliştirerek, projelerinde modern teknolojileri ve yöntemleri kullanır. Bu sayede, inşaat sektöründe yeni bir soluk olarak faaliyet göstermektedir.',
      },
      {
        title: 'Toplumsal Sorumluluk',
        body: 'FLORES İnşaat, toplumun ihtiyaçlarına duyarlıdır ve sosyal sorumluluk projeleriyle topluma katkı sağlamayı hedefler.',
      },
    ],
    closing:
      'Özetle, FLORES İnşaat hem çalışanları, hem müşterileri, hem tedarikçileri hem de şehirler için bir değer kaynağıdır.',
  },
  misek: {
    title: 'MİSEK İnşaat',
    lead:
      'Bugüne kadar toplamda 1,5 milyon m² inşaat alanına sahip 16 projeyi başarıyla tamamlayan MİSEK İnşaat, sektörde öncü bir role sahiptir.',
    body: 'Bu projeler arasında 150 bin m² konut alanı yer almakta olup, Ordu Şehir Hastanesi, Arnavutköy Konut ve Ticaret Projeleri ve Vadi Bahçeşehir Projeleri öne çıkan çalışmalar arasındadır.',
  },
  hr: {
    title: 'İnsan Kaynakları Politikamız',
    body: 'Flores olarak, işe alım ve kariyer planlama süreçlerinde fırsat eşitliğine önem veriyor ve çalışanlarımız için güvenli, destekleyici ve gelişime açık bir iş ortamı sunuyoruz. Ekibimize katılan her bireyin profesyonel ve kişisel gelişimini destekleyerek, geleceği inşa eden güçlü bir kadro oluşturuyoruz.',
  },
  occupationalSafety: {
    title: 'FLORES İş Sağlığı ve Güvenliği Politikası',
    body: 'MİSEK İnşaat iştiraki olan FLORES, sıfır risk mottosuyla güvenli ve sağlıklı çalışma ortamı oluşturmayı hedeflemekte; bu doğrultuda en uygun çalışma yöntemlerini belirleyerek ve sürdürerek, ulusal ve uluslararası mevzuat ve yönetmeliklere uygun şekilde faaliyetlerini sürdürmektedir. İş sağlığı ve güvenliği politikamız, çalışanlarımızın sağlığını ve güvenliğini en üst düzeyde koruma amacına odaklanmaktadır.',
    image: '/images/studio/isguvenligi.png',
    componentsTitle: 'İş Sağlığı ve Güvenliği Politikamızın Bileşenleri',
    components: [
      {
        title: 'Sıfır İş Kazası ve Meslek Hastalığı Yaklaşımı',
        body: 'Sağlıklı ve güvenli çalışma koşulları oluşturmak amacıyla, sıfır iş kazası ve sıfır meslek hastalığı ilkesi doğrultusunda tüm faaliyetlerimizi şekillendirmek.',
      },
      {
        title: 'Mevzuata Uyum',
        body: 'Ulusal ve uluslararası iş sağlığı ve güvenliği mevzuatına ve yönetmeliklere tam uyum sağlamak.',
      },
      {
        title: 'Eğitim ve Farkındalık',
        body: 'Çalışanlarımıza iş sağlığı ve güvenliği konusunda kapsamlı eğitimler vererek yetkinlik kazanmalarını sağlamak ve kişisel farkındalıklarını artırmak.',
      },
      {
        title: 'Tehlikelere Karşı Önlem',
        body: 'Elektrik, yangın, yaralanma, meslek hastalıkları gibi tehlikelere karşı tüm tedbirleri almak, denetimlerle uygulama etkinliğini sağlamak ve gerekli güncellemeleri düzenli olarak yapmak.',
      },
      {
        title: 'Yatırımlarda Güvenlik Önceliği',
        body: 'Yeni yatırımları gerçekleştirirken iş sağlığı ve güvenliği standartlarını ve ilgili yasal düzenlemeleri dikkate almak.',
      },
      {
        title: 'Güvenli ve Ergonomik Ortamlar',
        body: 'Çalışanlar için iş kazası ve meslek hastalıkları riskini ortadan kaldıracak güvenli, sağlıklı ve ergonomik iş yeri ortamları oluşturmak.',
      },
      {
        title: 'Mevcut Sistemlerin İyileştirilmesi',
        body: 'İş sağlığı ve güvenliği risklerini en aza indirmek amacıyla mevcut yatırımları ve çalışma ortamlarını sürekli olarak iyileştirmek.',
      },
      {
        title: 'Sürekli İyileştirme ve Katılım',
        body: 'Şirketin tüm kademelerinin ve paydaşların aktif katılımını sağlayarak iş sağlığı ve güvenliği faaliyetlerimizde sürekli iyileştirme anlayışını benimsemek.',
      },
      {
        title: 'Teknolojik Ekipman Kullanımı',
        body: 'İş sağlığı ve güvenliğini destekleyen uygun teknolojik ekipmanları ve yöntemleri kullanmak.',
      },
      {
        title: 'Acil Durum Yönetimi',
        body: 'Acil durumlara hazırlıklı olmak için tüm çalışanlarımıza düzenli tatbikatlar düzenlemek ve bu durumlara müdahale için gerekli ekipman ve kaynakları hazır bulundurmak.',
      },
      {
        title: 'Çevre ve Sağlık Odaklı Yaklaşım',
        body: 'Çalışma ortamlarında çevre dostu yöntemleri kullanarak hem çalışan sağlığını hem de çevresel etkileri gözetmek.',
      },
    ],
    closing:
      'FLORES olarak, iş sağlığı ve güvenliği politikamızla çalışanlarımızın ve iş ortaklarımızın sağlığını ve güvenliğini teminat altına almayı taahhüt ediyoruz.',
  },
  sustainability: {
    title: 'Sürdürülebilirlik ve Sosyal Sorumluluk',
    body: 'Modern şehir hayatına değer katmak ve çevresel duyarlılığı en üst düzeyde tutarak sürdürülebilir bir gelecek için çalışıyoruz. Teknolojik yeniliklerle donatılmış, doğayla uyumlu projelerimizle yalnızca bugünün değil, yarının şehirlerini ve yaşam alanlarını tasarlıyoruz. Flores, sadece projeleriyle değil, aynı zamanda topluma sağladığı katkılarla ve yaşam alanlarına kattığı değerle her zaman bir adım önde olmayı hedeflemektedir.',
  },
}

export const team = [
  { name: '1992', role: 'MİSEK İnşaat’ın kuruluşu', image: '/images/hero-flores.png' },
  { name: '1,5M m²', role: 'Tamamlanan inşaat alanı', image: '/images/projects/konaklari.png' },
  { name: '16 proje', role: 'Tamamlanan ve devam eden işler', image: '/images/projects/deluxe.png' },
  { name: '150 bin m²', role: 'Konut alanı', image: '/images/projects/evleri.png' },
  { name: '2.000+', role: 'İstihdam', image: '/images/projects/nova.png' },
  { name: '444 0 917', role: 'FLORES destek hattı', image: '/images/projects/optimist.png' },
]

export const principles = [
  {
    n: '1',
    title: 'Güven',
    copy: 'Güven odaklı bir çalışma anlayışı benimseyen FLORES, uzman yaklaşımı, profesyonel duruşu ve güvenilir ekipleriyle değer üretir.',
  },
  {
    n: '2',
    title: 'Adalet',
    copy: 'Adil olmak ve hesap verebilirlik, şirket değerlerimizin temel yapı taşlarındandır. Paydaşlarımız için şeffaf ve tutarlı bir duruş sergileriz.',
  },
  {
    n: '3',
    title: 'Sürdürülebilirlik',
    copy: 'Sürdürülebilir bir gelecek için sorumluluk alırız. Doğayla uyumlu, enerji verimliliği sağlayan ve yarının şehirlerini düşünen projeler geliştiririz.',
  },
  {
    n: '4',
    title: 'İnovasyon',
    copy: 'Sektörde yenilikçi çözümler geliştirerek projelerimizde modern teknolojileri ve yöntemleri kullanırız. Flores, inşaat sektörüne yeni bir soluk getirir.',
  },
]

export const process = [
  'İlk adımda ihtiyaçları, lokasyonu ve yaşam alışkanlıklarını dinleriz. Ön talep ve randevu sürecinde proje seçeneklerini, daire tiplerini ve ödeme planlarını netleştiririz.',
  'Tasarım, şehrin dinamik yapısını ve tarihsel dokusunu gözeterek şekillenir. Konut, ticari ünite ve sosyal donatıları bir arada düşünen bütüncül bir yaşam alanı kurgularız.',
  'İnşa sürecinde MİSEK İnşaat’ın kalite standartları, deprem yönetmeliği ve malzeme seçimi ön plandadır. Her aşamada güvenlik ve işçilik kalitesi takip edilir.',
  'Teslimde yalnızca bir daire değil; güvenlik, sosyal alanlar ve günlük konforu içeren bir yaşam merkezi sunmayı hedefleriz.',
  'Satış sonrası destek hattımız 444 0 917 üzerinden sakinlerimizle iletişimde kalırız. Hayallerinizdeki ev, Flores’te yaşamaya devam eder.',
]

export const areas = [
  {
    title: 'Konforlu yaşam alanları',
    copy: [
      'Modern mimari ve akıllı ev sistemleri ile donatılmış daireler.',
      'Ferah planlar ve çağdaş detaylarla günlük yaşamı kolaylaştıran iç mekânlar.',
    ],
    image: '/images/projects/konaklari.png',
  },
  {
    title: 'Güvenlik ve huzur',
    copy: [
      '7/24 güvenlik hizmetleri ve kontrollü giriş sistemleri.',
      'Ailelerin huzur içinde yaşayabileceği güvenli, modern bir ortam.',
    ],
    image: '/images/projects/evleri.png',
  },
  {
    title: 'Sosyal ve ticari merkezler',
    copy: [
      'Alışveriş, eğlence ve sosyalleşme olanakları sunan projeler.',
      'Konut ve çarşı alanlarını bir araya getirerek şehrin yeni yaşam merkezlerini kuruyoruz.',
    ],
    image: '/images/projects/deluxe.png',
  },
  {
    title: 'Çevreye duyarlı tasarımlar',
    copy: [
      'Doğayla uyumlu, sürdürülebilir ve enerji verimliliği sağlayan yapılar.',
      'Teknolojik yeniliklerle donatılmış, yarının şehirlerini düşünen kentsel dönüşüm.',
    ],
    image: '/images/projects/nova.png',
  },
]

export const heroSlides = [
  '/images/hero/nova.png',
  '/images/hero/konaklari.png',
  '/images/hero/deluxe.png',
]

export const heroCaptions = [
  'FLORES Nova, Zeytinburnu’nda şehrin merkezinde modern yaşamın kapılarını aralıyor.',
  'FLORES Konakları, tarihi Topkapı dokusuyla çağdaş konforu bir araya getirir.',
  'FLORES Deluxe, Cevizlibağ’da seçkin konut ve ticari üniteleriyle yükseliyor.',
]
