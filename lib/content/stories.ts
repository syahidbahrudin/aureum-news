import type { Locale } from "../i18n/config";

export type CategoryId =
  | "national"
  | "world"
  | "business"
  | "technology"
  | "sport"
  | "culture";

export type ContentType = "news" | "analysis" | "opinion" | "sponsored";

type LocalizedText = Record<Locale, { title: string; excerpt: string }>;

export type StoryComment = {
  id: string;
  postedAt: string;
  text: Record<Locale, string>;
};

export type Story = {
  id: string;
  slug: string;
  category: CategoryId;
  contentType: ContentType;
  publishedAt: string; // ISO timestamp, stored timezone-aware
  author: string; // development placeholder
  featured?: boolean;
  breaking?: boolean;
  editorPick?: boolean;
  comments: StoryComment[];
  text: LocalizedText;
};

// Order used for navigation and category blocks.
export const CATEGORY_ORDER: CategoryId[] = [
  "national",
  "world",
  "business",
  "technology",
  "sport",
  "culture",
];

export type StoryImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

// Development placeholder photographs, one per category. They are not records
// of reported events and must be replaced with licensed editorial images.
const CATEGORY_IMAGES: Record<CategoryId, StoryImage> = {
  national: {
    src: "/images/national.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "Placeholder photograph of an empty civic plaza",
      ms: "Gambar ruang letak sebuah dataran awam yang kosong",
      zh: "空旷市民广场的占位照片",
      ta: "வெற்று பொது வளாகத்தின் இடம்பிடிப் புகைப்படம்",
    },
  },
  world: {
    src: "/images/world.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "Placeholder photograph of a calm sea horizon with distant ships",
      ms: "Gambar ruang letak ufuk laut tenang dengan kapal di kejauhan",
      zh: "平静海平线与远处船只的占位照片",
      ta: "அமைதியான கடல் எல்லையும் தொலைதூரக் கப்பல்களும் கொண்ட இடம்பிடிப் புகைப்படம்",
    },
  },
  business: {
    src: "/images/business.png",
    width: 1536,
    height: 1024,
    alt: {
      en: "Placeholder photograph of a glass office building facade",
      ms: "Gambar ruang letak fasad bangunan pejabat kaca",
      zh: "玻璃办公楼外立面的占位照片",
      ta: "கண்ணாடி அலுவலகக் கட்டிட முகப்பின் இடம்பிடிப் புகைப்படம்",
    },
  },
  technology: {
    src: "/images/technology.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "Placeholder photograph of a closed laptop on an empty desk",
      ms: "Gambar ruang letak komputer riba tertutup di atas meja kosong",
      zh: "空桌上合上的笔记本电脑的占位照片",
      ta: "வெற்று மேசையில் மூடிய மடிக்கணினியின் இடம்பிடிப் புகைப்படம்",
    },
  },
  sport: {
    src: "/images/sport.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "Placeholder photograph of an empty running track",
      ms: "Gambar ruang letak landasan larian yang kosong",
      zh: "空无一人的跑道的占位照片",
      ta: "வெற்று ஓட்டப்பாதையின் இடம்பிடிப் புகைப்படம்",
    },
  },
  culture: {
    src: "/images/culture.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "Placeholder photograph of a quiet museum gallery",
      ms: "Gambar ruang letak galeri muzium yang sunyi",
      zh: "安静博物馆展厅的占位照片",
      ta: "அமைதியான அருங்காட்சியக அரங்கின் இடம்பிடிப் புகைப்படம்",
    },
  },
};

export function storyImage(story: Story): StoryImage {
  return CATEGORY_IMAGES[story.category];
}

// Development samples. They do not describe real events and must be replaced
// before launch. Authors stay as placeholders; do not treat copy as reporting.
type Draft = {
  id: string;
  slug: string;
  category: CategoryId;
  contentType: ContentType;
  publishedAt: string;
  author: string;
  featured?: boolean;
  breaking?: boolean;
  editorPick?: boolean;
  comments?: StoryComment[];
  en: [string, string];
  ms: [string, string];
  zh: [string, string];
  ta: [string, string];
};

function story(d: Draft): Story {
  const [enTitle, enExcerpt] = d.en;
  const [msTitle, msExcerpt] = d.ms;
  const [zhTitle, zhExcerpt] = d.zh;
  const [taTitle, taExcerpt] = d.ta;
  return {
    id: d.id,
    slug: d.slug,
    category: d.category,
    contentType: d.contentType,
    publishedAt: d.publishedAt,
    author: d.author,
    featured: d.featured,
    breaking: d.breaking,
    editorPick: d.editorPick,
    comments: d.comments ?? [],
    text: {
      en: { title: enTitle, excerpt: enExcerpt },
      ms: { title: msTitle, excerpt: msExcerpt },
      zh: { title: zhTitle, excerpt: zhExcerpt },
      ta: { title: taTitle, excerpt: taExcerpt },
    },
  };
}

const NEWSROOM = "Newsroom Placeholder";
const ANALYSIS = "Analysis Placeholder";
const COLUMN = "Columnist Placeholder";

export const STORIES: Story[] = [
  story({
    id: "s1",
    slug: "sample-flood-drain-plan",
    category: "national",
    contentType: "news",
    publishedAt: "2026-10-09T09:30:00+08:00",
    author: NEWSROOM,
    featured: true,
    en: [
      "City council tables a four-year plan to rebuild flood drains",
      "The draft names priority streets, a construction window before the monsoon, and a public comment period that closes next month.",
    ],
    ms: [
      "Majlis bandar raya membentangkan pelan empat tahun baiki longkang banjir",
      "Draf menyenaraikan jalan keutamaan, tempoh pembinaan sebelum monsun, dan tempoh maklum balas awam yang ditutup bulan depan.",
    ],
    zh: [
      "市议会提出四年计划重建排洪沟",
      "草案列出优先街道、季风前的施工窗口，以及下月截止的公众意见期。",
    ],
    ta: [
      "நகர சபை வெள்ள வடிகால்களை மீண்டும் கட்ட நான்காண்டுத் திட்டத்தை சமர்ப்பிக்கிறது",
      "வரைவு முன்னுரிமைத் தெருக்கள், பருவமழைக்கு முந்தைய கட்டுமான காலம், அடுத்த மாதம் முடியும் பொதுக் கருத்துக் காலம் ஆகியவற்றைக் குறிக்கிறது.",
    ],
    comments: [
      {
        id: "s1-c1",
        postedAt: "2026-10-09T11:05:00+08:00",
        text: {
          en: "Sample note: the construction window before the monsoon is the line I would check first.",
          ms: "Nota contoh: tempoh pembinaan sebelum monsun ialah perkara yang saya semak dahulu.",
          zh: "示例备注：季风前的施工窗口是我会先核对的一句。",
          ta: "மாதிரி குறிப்பு: பருவமழைக்கு முந்தைய கட்டுமான காலத்தை முதலில் பார்ப்பேன்.",
        },
      },
      {
        id: "s1-c2",
        postedAt: "2026-10-09T12:40:00+08:00",
        text: {
          en: "Sample note: this excerpt does not name the priority streets.",
          ms: "Nota contoh: petikan ini tidak menamakan jalan keutamaan.",
          zh: "示例备注：这段摘要没有写出优先街道的名称。",
          ta: "மாதிரி குறிப்பு: இந்தச் சுருக்கம் முன்னுரிமைத் தெருக்களின் பெயரைச் சொல்லவில்லை.",
        },
      },
      {
        id: "s1-c3",
        postedAt: "2026-10-09T14:15:00+08:00",
        text: {
          en: "Sample note: a public comment period only helps if the draft is posted.",
          ms: "Nota contoh: tempoh maklum balas awam berguna hanya jika draf dipaparkan.",
          zh: "示例备注：只有草案公开，公众意见期才有用。",
          ta: "மாதிரி குறிப்பு: வரைவு வெளியிடப்பட்டால் மட்டுமே பொதுக் கருத்துக் காலம் பயனுள்ளது.",
        },
      },
    ],
  }),
  story({
    id: "s2",
    slug: "sample-shipping-talks-pause",
    category: "world",
    contentType: "news",
    publishedAt: "2026-10-09T08:50:00+08:00",
    author: NEWSROOM,
    breaking: true,
    en: [
      "Regional talks pause after delegates miss a shipping-lane timetable",
      "Negotiators left without a date for the next session. Officials said the draft timetable will be recirculated this week.",
    ],
    comments: [
      {
        id: "s2-c1",
        postedAt: "2026-10-09T13:10:00+08:00",
        text: {
          en: "Sample note: the missing next-session date is the gap.",
          ms: "Nota contoh: tarikh sesi seterusnya yang tiada ialah jurangnya.",
          zh: "示例备注：没写下次会议日期，这是缺口。",
          ta: "மாதிரி குறிப்பு: அடுத்த அமர்வுத் தேதி இல்லாததே இடைவெளி.",
        },
      },
    ],
    ms: [
      "Rundingan serantau terhenti selepas delegasi gagal tetapkan jadual laluan kapal",
      "Perunding beredar tanpa tarikh sesi seterusnya. Pegawai berkata draf jadual akan diedarkan semula minggu ini.",
    ],
    zh: [
      "代表未能敲定航道时间表，地区会谈暂停",
      "谈判代表离场时未定下次会议日期。官员称时间表草案将于本周重新分发。",
    ],
    ta: [
      "பிரதிநிதிகள் கப்பல் பாதை அட்டவணையைத் தவறவிட்டதால் பிராந்தியப் பேச்சு நிறுத்தம்",
      "அடுத்த அமர்வுக்குத் தேதி இன்றி பேச்சாளர்கள் வெளியேறினர். வரைவு அட்டவணை இந்த வாரம் மீண்டும் அனுப்பப்படும் என்று அதிகாரிகள் கூறினர்.",
    ],
  }),
  story({
    id: "s3",
    slug: "sample-export-quarter",
    category: "business",
    contentType: "analysis",
    publishedAt: "2026-10-09T07:15:00+08:00",
    author: ANALYSIS,
    editorPick: true,
    en: [
      "A slower export quarter leaves mid-size factories with thinner order books",
      "Orders are still arriving, but the gap between quote and delivery has widened. That is the part worth watching.",
    ],
    comments: [
      {
        id: "s3-c1",
        postedAt: "2026-10-09T10:20:00+08:00",
        text: {
          en: "Sample note: the quote-to-delivery gap is the line worth keeping.",
          ms: "Nota contoh: jurang sebut harga ke penghantaran ialah baris yang patut disimpan.",
          zh: "示例备注：报价到交货的间隔才是该留下的一句。",
          ta: "மாதிரி குறிப்பு: மேற்கோளிலிருந்து விநியோகம் வரையிலான இடைவெளியே வைத்திருக்க வேண்டிய வரி.",
        },
      },
    ],
    ms: [
      "Suku eksport lebih perlahan meninggalkan kilang sederhana dengan buku pesanan lebih nipis",
      "Pesanan masih masuk, tetapi jurang antara sebut harga dan penghantaran melebar. Itulah bahagian yang perlu diperhatikan.",
    ],
    zh: [
      "出口季度放缓，中型工厂订单簿变薄",
      "订单仍在进来，但报价与交货之间的间隔拉长了。值得看的是这一段。",
    ],
    ta: [
      "மெதுவான ஏற்றுமதி காலாண்டு நடுத்தர தொழிற்சாலைகளின் ஆர்டர் புத்தகத்தை மெல்லியதாக்குகிறது",
      "ஆர்டர்கள் வந்துகொண்டே இருக்கின்றன, ஆனால் மேற்கோளுக்கும் விநியோகத்துக்கும் இடைவெளி அகன்றது. கவனிக்க வேண்டிய பகுதி அது.",
    ],
  }),
  story({
    id: "s4",
    slug: "sample-patient-records-trial",
    category: "technology",
    contentType: "news",
    publishedAt: "2026-10-08T18:40:00+08:00",
    author: NEWSROOM,
    en: [
      "Public hospitals start a limited trial of shared digital patient records",
      "Four wards can read the same admission note. Staff still keep a paper copy until the trial review in December.",
    ],
    ms: [
      "Hospital awam mulakan percubaan terhad rekod pesakit digital yang dikongsi",
      "Empat wad boleh membaca nota kemasukan yang sama. Kakitangan masih simpan salinan kertas sehingga semakan percubaan pada Disember.",
    ],
    zh: [
      "公立医院开始小范围试用共享电子病历",
      "四个病区可以读取同一份入院记录。十二月评估前，工作人员仍保留纸质副本。",
    ],
    ta: [
      "பொது மருத்துவமனைகள் பகிரப்பட்ட டிஜிட்டல் நோயாளிப் பதிவுகளின் வரையறுக்கப்பட்ட சோதனையைத் தொடங்குகின்றன",
      "நான்கு வார்டுகள் ஒரே சேர்க்கைக் குறிப்பைப் படிக்கலாம். டிசம்பர் மதிப்பாய்வு வரை ஊழியர்கள் காகித நகலை வைத்திருப்பார்கள்.",
    ],
  }),
  story({
    id: "s5",
    slug: "sample-squad-list",
    category: "sport",
    contentType: "news",
    publishedAt: "2026-10-08T15:05:00+08:00",
    author: NEWSROOM,
    editorPick: true,
    en: [
      "National squad names a provisional list ahead of the November qualifiers",
      "Twenty-three players are in camp from Monday. Two places stay open until the fitness checks on Thursday.",
    ],
    ms: [
      "Skuad kebangsaan namakan senarai sementara menjelang kelayakan November",
      "Dua puluh tiga pemain masuk kem dari Isnin. Dua tempat kekal terbuka sehingga pemeriksaan kecergasan pada Khamis.",
    ],
    zh: [
      "国家队公布十一月预选赛前的暂定名单",
      "二十三名球员周一起集训。两个名额留到周四体能检查后再定。",
    ],
    ta: [
      "நவம்பர் தகுதிச் சுற்றுக்கு முன் தேசிய அணி தற்காலிகப் பட்டியலை அறிவிக்கிறது",
      "திங்கட்கிழமை முதல் இருபத்திமூன்று வீரர்கள் முகாமில். வியாழன் உடற்தகுதிச் சோதனை வரை இரண்டு இடங்கள் திறந்துள்ளன.",
    ],
  }),
  story({
    id: "s6",
    slug: "sample-quiet-gallery-season",
    category: "culture",
    contentType: "opinion",
    publishedAt: "2026-10-08T11:20:00+08:00",
    author: COLUMN,
    editorPick: true,
    en: [
      "A quiet gallery season is a chance to look again at work we already own",
      "The new hang is mostly the permanent collection. That is a feature, if the labels finally say where each piece came from.",
    ],
    ms: [
      "Musim galeri yang sunyi peluang untuk melihat semula karya yang sudah kita miliki",
      "Gantungan baharu kebanyakannya koleksi tetap. Itu satu kelebihan, jika label akhirnya menyatakan dari mana setiap karya datang.",
    ],
    zh: [
      "冷清的展览季，正好重新看我们已经拥有的作品",
      "新的陈列大多来自常设收藏。如果标签终于写明每件作品的来处，这反而是优点。",
    ],
    ta: [
      "அமைதியான காட்சியகப் பருவம், ஏற்கெனவே நம்மிடம் உள்ள படைப்புகளை மீண்டும் பார்க்க ஒரு வாய்ப்பு",
      "புதிய தொங்கல் பெரும்பாலும் நிரந்தர சேகரிப்பு. ஒவ்வொரு படைப்பும் எங்கிருந்து வந்தது என்று சிட்டைகள் இறுதியில் சொன்னால், அது ஒரு சிறப்பு.",
    ],
  }),
  story({
    id: "s7",
    slug: "sample-early-rail-services",
    category: "national",
    contentType: "news",
    publishedAt: "2026-10-08T09:00:00+08:00",
    author: NEWSROOM,
    en: [
      "Commuter rail adds two early services on the northern line from Monday",
      "The first train leaves at 5:40am. Evening frequencies stay the same until the December timetable.",
    ],
    ms: [
      "Rel komuter tambah dua perkhidmatan awal di landasan utara mulai Isnin",
      "Kereta api pertama bertolak pukul 5:40 pagi. Kekerapan petang kekal sama sehingga jadual Disember.",
    ],
    zh: [
      "通勤铁路周一起在北线增加两班早车",
      "首班车于清晨5:40开出。晚间班次维持不变，直到十二月时刻表。",
    ],
    ta: [
      "பயணிகள் இரயில் திங்கட்கிழமை முதல் வடக்குப் பாதையில் இரண்டு அதிகாலை சேவைகளைச் சேர்க்கிறது",
      "முதல் தொடருந்து காலை 5:40க்குப் புறப்படும். டிசம்பர் அட்டவணை வரை மாலை அலைவெண் அப்படியே இருக்கும்.",
    ],
  }),
  story({
    id: "s8",
    slug: "sample-road-access-restored",
    category: "world",
    contentType: "news",
    publishedAt: "2026-10-07T20:30:00+08:00",
    author: NEWSROOM,
    en: [
      "Aid groups say road access is back in two districts after the storm",
      "Trucks reached the main clinic on Tuesday. A third district is still limited to footpaths.",
    ],
    ms: [
      "Kumpulan bantuan kata akses jalan pulih di dua daerah selepas ribut",
      "Lori tiba di klinik utama pada Selasa. Daerah ketiga masih terhad kepada denai pejalan kaki.",
    ],
    zh: [
      "援助团体称风暴后两个地区的道路已恢复通行",
      "卡车周二抵达主要诊所。第三个地区仍只能走步道。",
    ],
    ta: [
      "புயலுக்குப் பின் இரண்டு மாவட்டங்களில் சாலை அணுகல் திரும்பியது என்று உதவிக் குழுக்கள் கூறுகின்றன",
      "செவ்வாயன்று லாரிகள் முதன்மை மருத்துவமனையை அடைந்தன. மூன்றாவது மாவட்டம் இன்னும் நடைபாதைகளுக்கு மட்டுமே.",
    ],
  }),
  story({
    id: "s9",
    slug: "sample-port-volumes",
    category: "business",
    contentType: "news",
    publishedAt: "2026-10-08T19:10:00+08:00",
    author: NEWSROOM,
    en: [
      "Port operator says container volumes rose in the third quarter",
      "Imports led the gain. Export boxes were flat, and the operator kept its full-year forecast unchanged.",
    ],
    ms: [
      "Pengendali pelabuhan kata jumlah kontena naik pada suku ketiga",
      "Import mengetuai kenaikan. Kotak eksport mendatar, dan pengendali kekalkan unjuran sepanjang tahun.",
    ],
    zh: [
      "港口运营商称第三季度集装箱吞吐量上升",
      "增长主要来自进口。出口箱量持平，运营商维持全年预测不变。",
    ],
    ta: [
      "துறைமுக இயக்குநர் மூன்றாம் காலாண்டில் கொள்கலன் அளவு உயர்ந்தது என்கிறார்",
      "இறக்குமதி உயர்வுக்கு முன்னிலை. ஏற்றுமதிப் பெட்டிகள் சமமாக இருந்தன; ஆண்டு முழுக் கணிப்பும் மாறவில்லை.",
    ],
  }),
  story({
    id: "s10",
    slug: "sample-school-calendar",
    category: "national",
    contentType: "news",
    publishedAt: "2026-10-07T16:10:00+08:00",
    author: NEWSROOM,
    en: [
      "School term calendar is out, with a shorter mid-year break",
      "Term one still starts in January. The June break loses three days, which return as long weekends later in the year.",
    ],
    ms: [
      "Kalendar penggal sekolah dikeluarkan, dengan cuti pertengahan tahun lebih pendek",
      "Penggal satu masih bermula pada Januari. Cuti Jun hilang tiga hari, yang dikembalikan sebagai hujung minggu panjang kemudian.",
    ],
    zh: [
      "学期日历公布，年中假期缩短",
      "第一学期仍于一月开学。六月假期少三天，改在年内以长周末补回。",
    ],
    ta: [
      "பள்ளிக் கால அட்டவணை வெளியானது; ஆண்டு நடு விடுமுறை குறுகியது",
      "முதல் பருவம் இன்னும் ஜனவரியில் தொடங்கும். ஜூன் விடுமுறை மூன்று நாள் குறையும்; அவை ஆண்டின் பிற்பகுதியில் நீண்ட வார இறுதிகளாகத் திரும்பும்.",
    ],
  }),
  story({
    id: "s11",
    slug: "sample-land-crossing",
    category: "world",
    contentType: "news",
    publishedAt: "2026-10-07T14:20:00+08:00",
    author: NEWSROOM,
    en: [
      "Neighbours reopen a land crossing after a three-week closure",
      "Passenger buses resume at dawn. Freight lanes stay limited to daylight hours through the weekend.",
    ],
    ms: [
      "Jiran buka semula lintasan darat selepas penutupan tiga minggu",
      "Bas penumpang kembali pada subuh. Lorong kargo terhad kepada waktu siang sepanjang hujung minggu.",
    ],
    zh: [
      "邻国在关闭三周后重开一处陆路口岸",
      "客运巴士于黎明恢复。货运车道周末期间仅限白天通行。",
    ],
    ta: [
      "மூன்று வார மூடலுக்குப் பின் அண்டை நாடுகள் ஒரு தரைக் கடவையை மீண்டும் திறக்கின்றன",
      "பயணிகள் பேருந்துகள் விடியலில் மீளும். சரக்குப் பாதைகள் வார இறுதி முழுவதும் பகல் நேரத்துக்கு மட்டும்.",
    ],
  }),
  story({
    id: "s12",
    slug: "sample-rural-towers",
    category: "technology",
    contentType: "news",
    publishedAt: "2026-10-08T12:00:00+08:00",
    author: NEWSROOM,
    en: [
      "Telecoms outline where the next rural tower sites will go",
      "Twelve sites are named, all on existing public land. Construction is scheduled to start after the harvest.",
    ],
    ms: [
      "Syarikat telekomunikasi gariskan lokasi menara luar bandar seterusnya",
      "Dua belas tapak dinamakan, semuanya di tanah awam sedia ada. Pembinaan dijadualkan bermula selepas musim tuaian.",
    ],
    zh: [
      "电信公司列出下一批乡村基站的选址",
      "点名十二处，均在现有公共土地上。施工安排在收成之后开始。",
    ],
    ta: [
      "தொலைத்தொடர்பு நிறுவனங்கள் அடுத்த கிராமக் கோபுர இடங்களை வரையறுக்கின்றன",
      "பன்னிரண்டு இடங்கள் பெயரிடப்பட்டன, அனைத்தும் ஏற்கெனவே உள்ள பொது நிலத்தில். அறுவடைக்குப் பின் கட்டுமானம் தொடங்கும்.",
    ],
  }),
  story({
    id: "s13",
    slug: "sample-late-equaliser",
    category: "sport",
    contentType: "news",
    publishedAt: "2026-10-08T21:05:00+08:00",
    author: NEWSROOM,
    en: [
      "League leaders drop points after a late equaliser at home",
      "The goal came in the 88th minute. The gap at the top is now two points, with eight matches left.",
    ],
    ms: [
      "Peneraju liga gugur mata selepas penyamaan lewat di kandang",
      "Gol masuk pada minit ke-88. Jurang di tangga teratas kini dua mata, dengan lapan perlawanan lagi.",
    ],
    zh: [
      "联赛领头羊主场遭晚段扳平，丢掉分数",
      "进球出现在第88分钟。榜首差距现为两分，还剩八场。",
    ],
    ta: [
      "லீக் முன்னிலை அணி சொந்த மைதானத்தில் தாமத சமநிலை கோலுக்குப் பின் புள்ளிகளை இழக்கிறது",
      "கோல் 88ஆவது நிமிடத்தில் விழுந்தது. உச்சியில் இடைவெளி இப்போது இரண்டு புள்ளி; எட்டு ஆட்டங்கள் மீதம்.",
    ],
  }),
  story({
    id: "s14",
    slug: "sample-theatre-extension",
    category: "culture",
    contentType: "news",
    publishedAt: "2026-10-08T16:45:00+08:00",
    author: NEWSROOM,
    en: [
      "State theatre extends a sold-out run by two weekends",
      "Extra shows are Friday and Saturday only. The company said the cast stays the same.",
    ],
    ms: [
      "Teater negeri lanjutkan persembahan habis dijual selama dua hujung minggu",
      "Pertunjukan tambahan hanya pada Jumaat dan Sabtu. Syarikat berkata barisan pelakon kekal sama.",
    ],
    zh: [
      "州立剧院把售罄演出延长两个周末",
      "加场仅限周五和周六。剧团表示演员阵容不变。",
    ],
    ta: [
      "மாநில அரங்கம் விற்றுத் தீர்ந்த ஓட்டத்தை இரண்டு வார இறுதிகள் நீட்டிக்கிறது",
      "கூடுதல் நிகழ்ச்சிகள் வெள்ளி மற்றும் சனி மட்டும். நடிகர் குழு அப்படியே இருக்கும் என்று குழு கூறியது.",
    ],
  }),
  story({
    id: "s15",
    slug: "sample-weekend-trading",
    category: "business",
    contentType: "news",
    publishedAt: "2026-10-07T10:25:00+08:00",
    author: NEWSROOM,
    en: [
      "Small retailers ask for clearer rules on weekend trading hours",
      "The current notice leaves Sunday closing time to each council. Shop owners want one statewide hour.",
    ],
    ms: [
      "Peruncit kecil minta peraturan lebih jelas tentang waktu perniagaan hujung minggu",
      "Notis semasa serahkan waktu tutup Ahad kepada setiap majlis. Pemilik kedai mahu satu waktu seluruh negeri.",
    ],
    zh: [
      "小零售商要求更明确的周末营业时间规定",
      "现行通知把周日关门时间交给各市议会。店主希望全州统一一个时间。",
    ],
    ta: [
      "சிறு சில்லறை விற்பனையாளர்கள் வார இறுதி வணிக நேரத்துக்குத் தெளிவான விதிகளைக் கேட்கின்றனர்",
      "தற்போதைய அறிவிப்பு ஞாயிறு மூடும் நேரத்தை ஒவ்வொரு சபைக்கும் விடுகிறது. கடை உரிமையாளர்கள் மாநிலம் முழுவதும் ஒரே நேரத்தை விரும்புகின்றனர்.",
    ],
  }),
  story({
    id: "s16",
    slug: "sample-shared-login",
    category: "technology",
    contentType: "analysis",
    publishedAt: "2026-10-07T09:30:00+08:00",
    author: ANALYSIS,
    en: [
      "A shared government login still fails at the counter",
      "The account works on a home laptop. At the service desk, staff cannot see the same session, so people queue twice.",
    ],
    ms: [
      "Log masuk kerajaan yang dikongsi masih gagal di kaunter",
      "Akaun berfungsi pada komputer riba di rumah. Di kaunter, kakitangan tidak nampak sesi yang sama, jadi orang beratur dua kali.",
    ],
    zh: [
      "统一的政府登录在柜台仍然失败",
      "账号在家里的笔记本上能用。到服务台，工作人员看不到同一个会话，人们得排两次队。",
    ],
    ta: [
      "பகிரப்பட்ட அரசு உள்நுழைவு இன்னும் கவுண்டரில் தோல்வியடைகிறது",
      "கணக்கு வீட்டு மடிக்கணினியில் வேலை செய்கிறது. சேவை மேசையில் ஊழியர்களால் அதே அமர்வைப் பார்க்க முடியாது, எனவே மக்கள் இருமுறை வரிசையில் நிற்கின்றனர்.",
    ],
  }),
  story({
    id: "s17",
    slug: "sample-youth-meet",
    category: "sport",
    contentType: "news",
    publishedAt: "2026-10-07T17:40:00+08:00",
    author: NEWSROOM,
    en: [
      "Youth meet records fall in the 400 metres and the long jump",
      "Both marks were set in the morning session. The afternoon heats were delayed by rain for forty minutes.",
    ],
    ms: [
      "Rekod kejohanan remaja pecah dalam 400 meter dan lompat jauh",
      "Kedua-dua catatan dibuat pada sesi pagi. Acara petang ditangguhkan empat puluh minit akibat hujan.",
    ],
    zh: [
      "青年赛会纪录在400米和跳远中被打破",
      "两项成绩都在上午产生。下午预赛因雨推迟了四十分钟。",
    ],
    ta: [
      "இளைஞர் சந்திப்பில் 400 மீட்டர் மற்றும் நீளம் தாண்டலில் சாதனைகள் உடைந்தன",
      "இரண்டு குறிகளும் காலை அமர்வில் அமைந்தன. மதிய வெப்பங்கள் மழையால் நாற்பது நிமிடம் தாமதமாயின.",
    ],
  }),
  story({
    id: "s18",
    slug: "sample-waterfront-archive",
    category: "culture",
    contentType: "news",
    publishedAt: "2026-10-07T12:30:00+08:00",
    author: NEWSROOM,
    en: [
      "Archive releases newly catalogued photographs of the old waterfront",
      "The set runs from 1958 to 1974. Prints can be viewed on site; downloads stay low resolution for now.",
    ],
    ms: [
      "Arkib keluarkan gambar tepi air lama yang baru dikatalog",
      "Set ini merangkumi 1958 hingga 1974. Cetakan boleh dilihat di tapak; muat turun kekal resolusi rendah buat masa ini.",
    ],
    zh: [
      "档案馆公布新编目的旧滨水区照片",
      "这组照片从1958年到1974年。原件可到馆观看；下载暂时仍是低分辨率。",
    ],
    ta: [
      "காப்பகம் பழைய கரைப்பகுதியின் புதிதாகப் பட்டியலிடப்பட்ட புகைப்படங்களை வெளியிடுகிறது",
      "தொகுப்பு 1958 முதல் 1974 வரை. அச்சுகளை இடத்திலேயே பார்க்கலாம்; பதிவிறக்கங்கள் இப்போதைக்கு குறைந்த தெளிவில்.",
    ],
  }),
  story({
    id: "s19",
    slug: "sample-ward-boundaries",
    category: "national",
    contentType: "analysis",
    publishedAt: "2026-10-06T11:00:00+08:00",
    author: ANALYSIS,
    en: [
      "What the ward boundary review changes for next year's local polls",
      "Three wards gain a polling district and one loses two streets. The voter roll update follows in January.",
    ],
    ms: [
      "Apa yang diubah semakan sempadan wad untuk pilihan raya tempatan tahun depan",
      "Tiga wad mendapat satu daerah mengundi dan satu wad kehilangan dua jalan. Kemas kini daftar pemilih menyusul pada Januari.",
    ],
    zh: [
      "选区边界复核将如何改变明年的地方选举",
      "三个选区各增加一个投票分区，一个选区少了两条街。选民名册更新在一月跟进。",
    ],
    ta: [
      "அடுத்த ஆண்டு உள்ளாட்சித் தேர்தலுக்கு வார்டு எல்லை மதிப்பாய்வு எதை மாற்றுகிறது",
      "மூன்று வார்டுகளுக்கு ஒரு வாக்குச் சாவடி மாவட்டம் சேரும்; ஒன்று இரண்டு தெருக்களை இழக்கும். வாக்காளர் பட்டியல் புதுப்பிப்பு ஜனவரியில் தொடரும்.",
    ],
  }),
  story({
    id: "s20",
    slug: "sample-maritime-week",
    category: "world",
    contentType: "news",
    publishedAt: "2026-10-06T08:40:00+08:00",
    author: NEWSROOM,
    en: [
      "Observers note a quieter week along the disputed maritime boundary",
      "Patrol boats stayed on their own sides of the line. No new protest note was filed.",
    ],
    ms: [
      "Pemerhati catat minggu lebih tenang di sepanjang sempadan maritim yang dipertikai",
      "Bot peronda kekal di sisi masing-masing. Tiada nota bantahan baharu difailkan.",
    ],
    zh: [
      "观察员称争议海域分界线一带本周较为平静",
      "巡逻艇留在各自一侧。没有提交新的抗议照会。",
    ],
    ta: [
      "சர்ச்சைக்குரிய கடல் எல்லையில் இந்த வாரம் அமைதியாக இருந்தது என்று பார்வையாளர்கள் குறிக்கின்றனர்",
      "ரோந்துப் படகுகள் தங்கள் பக்கத்திலேயே இருந்தன. புதிய எதிர்ப்புக் குறிப்பு தாக்கல் செய்யப்படவில்லை.",
    ],
  }),
  story({
    id: "s21",
    slug: "sample-ringgit-invoices",
    category: "business",
    contentType: "opinion",
    publishedAt: "2026-10-06T15:00:00+08:00",
    author: COLUMN,
    en: [
      "A steadier ringgit only helps if invoices stay predictable",
      "The rate moved less this month. Suppliers who still reprice every week have not passed that calm on.",
    ],
    ms: [
      "Ringgit yang lebih stabil hanya membantu jika invois kekal boleh dijangka",
      "Kadar kurang bergerak bulan ini. Pembekal yang masih ubah harga setiap minggu belum menyampaikan ketenangan itu.",
    ],
    zh: [
      "令吉更稳，只有在发票可预期时才有用",
      "这个月汇率波动更小。仍每周改价的供应商并没有把这份平静传递下去。",
    ],
    ta: [
      "நிலையான ரிங்கிட், இன்வாய்ஸ்கள் கணிக்கக்கூடியவையாக இருந்தால் மட்டுமே உதவும்",
      "இந்த மாதம் விகிதம் குறைவாக நகர்ந்தது. இன்னும் ஒவ்வொரு வாரமும் விலை மாற்றும் வழங்குநர்கள் அந்த அமைதியைக் கடத்தவில்லை.",
    ],
  }),
  story({
    id: "s22",
    slug: "sample-rainfall-dataset",
    category: "technology",
    contentType: "news",
    publishedAt: "2026-10-06T18:15:00+08:00",
    author: NEWSROOM,
    en: [
      "University lab publishes an open dataset of local rainfall gauges",
      "The file covers ten years of daily totals from forty stations. Station names are included; exact coordinates are not.",
    ],
    ms: [
      "Makmal universiti terbitkan set data terbuka tolok hujan tempatan",
      "Fail merangkumi jumlah harian sepuluh tahun dari empat puluh stesen. Nama stesen disertakan; koordinat tepat tidak.",
    ],
    zh: [
      "大学实验室公布本地雨量站的开放数据集",
      "文件涵盖四十个站点十年的日累计。包含站名，不含精确坐标。",
    ],
    ta: [
      "பல்கலைக்கழக ஆய்வகம் உள்ளூர் மழை அளவிகளின் திறந்த தரவுத் தொகுப்பை வெளியிடுகிறது",
      "கோப்பு நாற்பது நிலையங்களின் பத்தாண்டு தினசரி மொத்தத்தை உள்ளடக்கியது. நிலையப் பெயர்கள் உள்ளன; துல்லிய ஆயங்கள் இல்லை.",
    ],
  }),
  story({
    id: "s23",
    slug: "sample-midfield-place",
    category: "sport",
    contentType: "analysis",
    publishedAt: "2026-10-06T13:10:00+08:00",
    author: ANALYSIS,
    en: [
      "The selection panel still has one unsettled place in midfield",
      "Two players split the minutes in the last friendly. The coach has not said which role is actually open.",
    ],
    ms: [
      "Panel pemilihan masih ada satu tempat belum selesai di tengah padang",
      "Dua pemain berkongsi minit dalam perlawanan persahabatan terakhir. Jurulatih belum menyatakan peranan mana yang sebenarnya terbuka.",
    ],
    zh: [
      "选拔小组的中场仍有一个位置没有定",
      "上一场热身赛里两名球员分摊了出场时间。教练还没说实际空出的是哪个角色。",
    ],
    ta: [
      "தேர்வுக் குழுவின் மையக்களத்தில் இன்னும் ஒரு இடம் தீர்மானமாகவில்லை",
      "கடைசி நட்பு ஆட்டத்தில் இரு வீரர்கள் நிமிடங்களைப் பகிர்ந்தனர். எந்தப் பாத்திரம் திறந்துள்ளது என்று பயிற்சியாளர் சொல்லவில்லை.",
    ],
  }),
  story({
    id: "s24",
    slug: "sample-food-festival",
    category: "culture",
    contentType: "news",
    publishedAt: "2026-10-05T10:00:00+08:00",
    author: NEWSROOM,
    en: [
      "Food festival lists stallholders and a later closing time on Saturday",
      "Gates open at 11am. Saturday service runs until 11pm; Sunday still ends at 9.",
    ],
    ms: [
      "Festival makanan senaraikan penjaja dan waktu tutup lebih lewat pada Sabtu",
      "Pintu dibuka pukul 11 pagi. Perkhidmatan Sabtu hingga 11 malam; Ahad masih tamat pukul 9.",
    ],
    zh: [
      "美食节公布摊主名单，周六关门时间延后",
      "上午11点开门。周六营业至晚11点；周日仍于9点结束。",
    ],
    ta: [
      "உணவுத் திருவிழா கடைக்காரர் பட்டியலையும் சனியன்று தாமத மூடும் நேரத்தையும் வெளியிடுகிறது",
      "வாயில்கள் காலை 11 மணிக்குத் திறக்கும். சனி சேவை இரவு 11 வரை; ஞாயிறு இன்னும் 9 மணிக்கு முடியும்.",
    ],
  }),
  story({
    id: "s25",
    slug: "sample-platform-clocks",
    category: "national",
    contentType: "opinion",
    publishedAt: "2026-10-07T16:30:00+08:00",
    author: COLUMN,
    en: [
      "A published platform clock is more useful than another delay notice",
      "Riders can plan around a time they can see. A notice that only says late does not say how late.",
    ],
    ms: [
      "Jam platform yang diterbitkan lebih berguna daripada notis kelewatan lagi",
      "Penumpang boleh rancang sekitar masa yang mereka nampak. Notis yang hanya kata lewat tidak menyatakan betapa lewat.",
    ],
    zh: [
      "公开的站台时刻比再发一则晚点通知有用",
      "乘客可以按看得到的时间安排。只写“晚点”的通知并没有写晚多久。",
    ],
    ta: [
      "வெளியிடப்பட்ட நடைமேடை நேரம், இன்னொரு தாமத அறிவிப்பை விட பயனுள்ளது",
      "பயணிகள் பார்க்கும் நேரத்தை வைத்துத் திட்டமிடலாம். “தாமதம்” என்று மட்டும் சொல்லும் அறிவிப்பு எவ்வளவு தாமதம் என்று சொல்லாது.",
    ],
  }),
  story({
    id: "s26",
    slug: "sample-shared-ward-notes",
    category: "technology",
    contentType: "opinion",
    publishedAt: "2026-10-07T09:00:00+08:00",
    author: COLUMN,
    en: [
      "A shared ward note only works if the paper copy has an end date",
      "Four wards can read the same admission line. Staff will keep both until someone says when the paper copy stops.",
    ],
    ms: [
      "Nota wad dikongsi hanya berfungsi jika salinan kertas ada tarikh tamat",
      "Empat wad boleh baca baris kemasukan yang sama. Kakitangan akan simpan kedua-duanya sehingga seseorang menyatakan bila salinan kertas berhenti.",
    ],
    zh: [
      "共享病区记录要有用，纸质副本就得有停用日期",
      "四个病区能读到同一行入院记录。在有人说清纸质副本何时停用之前，两边都会留着。",
    ],
    ta: [
      "பகிரப்பட்ட வார்டுக் குறிப்பு, காகித நகலுக்கு முடிவுத் தேதி இருந்தால் மட்டுமே வேலை செய்யும்",
      "நான்கு வார்டுகள் ஒரே சேர்க்கை வரியைப் படிக்கலாம். காகித நகல் எப்போது நிற்கும் என்று யாராவது சொல்லும் வரை ஊழியர்கள் இரண்டையும் வைத்திருப்பார்கள்.",
    ],
  }),
  story({
    id: "s27",
    slug: "sample-open-midfield",
    category: "sport",
    contentType: "opinion",
    publishedAt: "2026-10-05T18:20:00+08:00",
    author: COLUMN,
    en: [
      "An open midfield place should be named before the camp starts",
      "Two players split the minutes. The list is clearer if the vacant role is written down, not left as a hint.",
    ],
    ms: [
      "Tempat tengah padang yang terbuka patut dinamakan sebelum kem bermula",
      "Dua pemain berkongsi minit. Senarai lebih jelas jika peranan kosong ditulis, bukan dibiarkan sebagai petunjuk.",
    ],
    zh: [
      "空出的中场位置应该在集训开始前写明",
      "两名球员分摊了出场时间。空缺角色写下来，名单才清楚，而不是留成暗示。",
    ],
    ta: [
      "திறந்த மையக்கள இடம் முகாம் தொடங்கும் முன் பெயரிடப்பட வேண்டும்",
      "இரு வீரர்கள் நிமிடங்களைப் பகிர்ந்தனர். காலியான பாத்திரம் எழுதப்பட்டால் பட்டியல் தெளிவு; குறிப்பாக விடப்படக்கூடாது.",
    ],
  }),
];

export function storyTitle(story: Story, locale: Locale): string {
  return story.text[locale].title;
}

export function storyExcerpt(story: Story, locale: Locale): string {
  return story.text[locale].excerpt;
}

function byNewest(a: Story, b: Story): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getLeadStory(): Story | undefined {
  return STORIES.find((s) => s.featured) ?? [...STORIES].sort(byNewest)[0];
}

export function getSupportingStories(limit = 3): Story[] {
  const lead = getLeadStory();
  return [...STORIES]
    .filter((s) => s.id !== lead?.id)
    .sort(byNewest)
    .slice(0, limit);
}

export function getLatestStories(limit = 6): Story[] {
  return [...STORIES].sort(byNewest).slice(0, limit);
}

export function getStoriesByCategory(category: CategoryId): Story[] {
  return STORIES.filter((s) => s.category === category).sort(byNewest);
}

export function getCategoriesWithStories(): CategoryId[] {
  return CATEGORY_ORDER.filter((id) => getStoriesByCategory(id).length > 0);
}

export function getEditorsPicks(limit = 3): Story[] {
  return STORIES.filter((s) => s.editorPick).sort(byNewest).slice(0, limit);
}

export function getBreakingStory(): Story | undefined {
  return [...STORIES].filter((s) => s.breaking).sort(byNewest)[0];
}

export type RankedComment = { comment: StoryComment; story: Story };

// ponytail: newest-first until a real ranking signal exists.
export function getTopComments(limit = 5): RankedComment[] {
  return STORIES.flatMap((story) =>
    story.comments.map((comment) => ({ comment, story })),
  )
    .sort(
      (a, b) =>
        new Date(b.comment.postedAt).getTime() -
        new Date(a.comment.postedAt).getTime(),
    )
    .slice(0, limit);
}

export function getOpinionStories(limit = 5): Story[] {
  return STORIES.filter((s) => s.contentType === "opinion")
    .sort(byNewest)
    .slice(0, limit);
}

// Opinion columns live under /opinion; all other content types under /article.
export type Section = "article" | "opinion";

export function storySection(story: Story): Section {
  return story.contentType === "opinion" ? "opinion" : "article";
}

export function storyHref(locale: Locale, story: Story): string {
  return `/${locale}/${storySection(story)}/${story.slug}`;
}

// ponytail: slug from the display name. Split into a real author id if two names collide.
export function authorSlug(name: string): string {
  const slug = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "author";
}

export function authorHref(locale: Locale, name: string): string {
  return `/${locale}/author/${authorSlug(name)}`;
}

export function authorSlugs(): string[] {
  return [...new Set(STORIES.map((s) => authorSlug(s.author)))];
}

export function getAuthor(
  slug: string,
): { name: string; stories: Story[] } | undefined {
  const stories = STORIES.filter((s) => authorSlug(s.author) === slug).sort(
    byNewest,
  );
  const name = stories[0]?.author;
  if (!name) return undefined;
  return { name, stories };
}

// Public lookup: the slug must exist and sit under the requested section.
export function getStory(slug: string, section: Section): Story | undefined {
  const found = STORIES.find((s) => s.slug === slug);
  if (!found || storySection(found) !== section) return undefined;
  return found;
}

// Development placeholder article body in Markdown. Clearly not reporting;
// replace with the edited story before launch.
// ponytail: one shared sample body until stories carry real per-article copy.
const SAMPLE_BODY: Record<Locale, string> = {
  en: `## About this sample\n\nThis is **placeholder body text** for a development build — not reporting. Replace it before launch.\n\n- Markdown renders headings, paragraphs and lists\n- Inline links work, like the [editorial policy](/en/editorial-policy)`,
  ms: `## Mengenai contoh ini\n\nIni ialah **teks badan ruang letak** untuk binaan pembangunan — bukan laporan. Gantikannya sebelum pelancaran.\n\n- Markdown memaparkan tajuk, perenggan dan senarai\n- Pautan sebaris berfungsi, seperti [dasar editorial](/ms/editorial-policy)`,
  zh: `## 关于此示例\n\n这是开发版本的**占位正文**，并非报道。上线前请替换。\n\n- Markdown 可渲染标题、段落和列表\n- 行内链接有效，例如[编辑政策](/zh/editorial-policy)`,
  ta: `## இந்த மாதிரி பற்றி\n\nஇது உருவாக்க கட்டத்திற்கான **இடம்பிடி உரை** — செய்தி அல்ல. வெளியீட்டுக்கு முன் மாற்றவும்.\n\n- Markdown தலைப்புகள், பத்திகள் மற்றும் பட்டியல்களைக் காட்டும்\n- வரிக்குள் இணைப்புகள் செயல்படும், எடுத்துக்காட்டாக [ஆசிரியக் கொள்கை](/ta/editorial-policy)`,
};

export function storyBody(_story: Story, locale: Locale): string {
  return SAMPLE_BODY[locale];
}

export function getRelated(story: Story, limit = 3): Story[] {
  return STORIES.filter(
    (s) => s.id !== story.id && s.category === story.category,
  )
    .sort(byNewest)
    .slice(0, limit);
}

function selfCheck() {
  const opinion = STORIES.find((s) => s.contentType === "opinion");
  const news = STORIES.find((s) => s.contentType === "news");
  if (!opinion || !news) throw new Error("sample set needs opinion and news");
  if (getStory(opinion.slug, "article")) throw new Error("opinion leaked into article");
  if (!getStory(opinion.slug, "opinion")) throw new Error("opinion slug not found");
  if (getStory(news.slug, "opinion")) throw new Error("news leaked into opinion");
  if (!getStory(news.slug, "article")) throw new Error("news slug not found");
  if (getStory("does-not-exist", "article")) throw new Error("unknown slug resolved");
  if (getRelated(news).some((s) => s.id === news.id)) throw new Error("related includes self");
  const desk = getAuthor("analysis-placeholder");
  if (!desk || desk.stories.some((s) => s.author !== desk.name)) {
    throw new Error("author lookup missed");
  }
  if (getAuthor("no-such-author")) throw new Error("unknown author resolved");
  if (authorHref("en", desk.name) !== "/en/author/analysis-placeholder") {
    throw new Error("author href");
  }
}

if (process.argv[1]?.endsWith("stories.ts")) selfCheck();

// In-memory search across titles and excerpts for the active locale.
// Prototype-only: suitable for this small sample set.
export function searchStories(query: string, locale: Locale): Story[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return [...STORIES]
    .filter((s) => {
      const t = s.text[locale];
      return (
        t.title.toLowerCase().includes(q) ||
        t.excerpt.toLowerCase().includes(q)
      );
    })
    .sort(byNewest);
}
