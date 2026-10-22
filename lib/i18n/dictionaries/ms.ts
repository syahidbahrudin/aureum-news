import type { Dictionary } from "@/lib/i18n/dictionaries";

// Bahasa Melayu UI copy.
const ms: Dictionary = {
  meta: {
    title: "Aureum — Berita",
    description:
      "Aureum ialah laman berita pembangunan. Semua berita yang dipapar ialah contoh yang ditanda dengan jelas.",
  },
  tagline: "Laporan jelas, dalam bahasa anda.",
  a11y: {
    skipToContent: "Langkau ke kandungan utama",
    primaryNav: "Utama",
    sectionNav: "Bahagian",
    language: "Bahasa",
    chooseLanguage: "Pilih bahasa",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    menu: "Menu",
    search: "Carian laman",
  },
  nav: {
    home: "Laman utama",
  },
  sections: {
    latest: "Terkini",
    editorsPicks: "Pilihan editor",
    categoryCoverage: "Liputan kategori",
    viewCategory: "Lihat bahagian",
    readMore: "baca lagi",
    opinion: "Pendapat",
    topComments: "Komen teratas",
    topOpinion: "Pendapat teratas",
    related: "Berita berkaitan",
  },
  search: {
    label: "Cari Aureum",
    placeholder: "Cari berita",
    button: "Cari",
    resultsFor: 'Keputusan untuk "{q}"',
    count: "{count} ditemui",
    noResultsTitle: "Tiada berita sepadan dengan carian anda",
    noResultsBody: 'Tiada yang sepadan dengan "{q}". Cuba perkataan lain.',
    emptyHint: "Taip kata kunci untuk mencari berita contoh.",
  },
  labels: {
    breaking: "Tergempar",
    byline: "Oleh",
    updated: "Dikemas kini",
    noImage: "Imej belum ada",
    imageCaption:
      "Gambar ruang letak pembangunan. Bukan rekod peristiwa yang dilaporkan.",
    imageCredit: "Ruang letak pembangunan",
    readingTime: "{min} min bacaan (anggaran)",
    commentCount: "{count} komen",
    commentOne: "1 komen",
    sampleReader: "Pembaca contoh",
    shareOn: "Kongsi di {network}",
  },
  contentType: {
    news: "Berita",
    analysis: "Analisis",
    opinion: "Pendapat",
    sponsored: "Tajaan",
  },
  categories: {
    national: "Nasional",
    world: "Dunia",
    business: "Perniagaan",
    technology: "Teknologi",
    sport: "Sukan",
    culture: "Budaya",
  },
  footer: {
    description:
      "Laman berita pembangunan. Butiran penerbit ialah ruang letak.",
    note: "Semua berita ditanda sebagai contoh. Tiada laporan sebenar diterbitkan di sini lagi.",
    rights: "2026 © Aureum (M) Bhd (Co. No. 196101000449 / 4485 H). A part of Media Prima Group.",
    sectionsHeading: "Bahagian",
    companyHeading: "Aureum",
    contactHeading: "Hubungi",
    contactBody:
      "Bilik berita Aureum\nAras 12, Menara Aureum\nJalan Ampang, 50450 Kuala Lumpur\nnewsroom@aureum.example\n+60 3 2181 4400",
    socialPlaceholder: "{network} — ruang letak, belum ada akaun sebenar",
    links: {
      about: "Mengenai",
      contact: "Hubungi",
      editorialPolicy: "Dasar editorial",
      privacy: "Privasi",
      terms: "Terma",
    },
  },
  pages: {
    placeholder: "Ruang letak pembangunan — teks akhir menunggu semakan pemilik.",
    draftDate: "Draf contoh · 9 Oktober 2026",
    about: {
      title: "Mengenai Aureum",
      sections: [
        {
          heading: "Apa laman ini",
          paragraphs: [
            "Aureum ialah laman berita contoh untuk mencuba susun atur bacaan, navigasi dan penukar bahasa. Ia bukan penerbitan sebenar, dan tiada kandungan di sini laporan berita.",
            "Berita, gambar dan nama penulis di tempat lain ditanda sebagai contoh. Halaman ini sama: meja berita, alamat dan tujuan di bawah ialah gantian supaya halaman boleh disemak.",
          ],
        },
        {
          heading: "Bilik berita contoh",
          paragraphs: [
            "Masthead contoh ini di Kuala Lumpur dan diterbitkan dalam bahasa Inggeris, Melayu, Cina dan Tamil. Tiada nama wartawan disenaraikan. Nama, jawatan dan foto sebenar hanya diletakkan selepas penerbit menyediakannya.",
            "Bidang liputan dalam set contoh ialah Nasional, Dunia, Perniagaan, Teknologi, Sukan dan Budaya. Sesuatu bahagian muncul dalam navigasi hanya apabila ada sekurang-kurangnya satu berita contoh.",
          ],
        },
        {
          heading: "Siapa yang mengendalikannya",
          paragraphs: [
            "Pemilikan, editor dan pendaftaran syarikat kosong dalam binaan ini. Gantikan blok ini dengan penerbit sebenar sebelum pelancaran.",
          ],
        },
      ],
    },
    contact: {
      title: "Hubungi",
      sections: [
        {
          heading: "Bilik berita",
          paragraphs: [
            "Bilik berita Aureum\nAras 12, Menara Aureum\nJalan Ampang, 50450 Kuala Lumpur",
            "Baris ini alamat contoh. Ia bukan pejabat yang beroperasi.",
          ],
        },
        {
          heading: "Saluran contoh",
          paragraphs: [
            "Meja umum: newsroom@aureum.example",
            "Pembetulan: corrections@aureum.example",
            "Telefon: +60 3 2181 4400",
            "Waktu contoh: Isnin hingga Jumaat, 9:00–18:00, Asia/Kuala Lumpur.",
          ],
        },
        {
          heading: "Pembetulan",
          paragraphs: [
            "Permintaan pembetulan perlu namakan berita, ayat yang salah dan sumber perubahan. Binaan ini tiada borang dan tidak menghantar e-mel. Alamat di atas ialah ruang letak.",
          ],
        },
      ],
    },
    editorialPolicy: {
      title: "Dasar editorial",
      sections: [
        {
          heading: "Sumber",
          paragraphs: [
            "Berita yang diterbitkan menamakan asal fakta. Sumber tanpa nama dibenarkan hanya apabila editor merekodkan sebab nama dirahsiakan. Laman contoh ini tidak menggunakan peraturan itu pada berita ruang letak.",
          ],
        },
        {
          heading: "Semakan",
          paragraphs: [
            "Fakta yang boleh disemak dengan dokumen, rakaman atau orang yang dinamakan disemak sebelum diterbitkan. Ruangan pendapat dilabel Pendapat dan tidak dipaparkan sebagai laporan berita.",
          ],
        },
        {
          heading: "Pembetulan",
          paragraphs: [
            "Pembetulan fakta kekal pada berita, dengan tarikh dan apa yang berubah. Suntingan kosmetik tidak mendapat masa kemas kini editorial baharu. Berita yang ditarik balik meninggalkan halaman awam.",
          ],
        },
        {
          heading: "Kandungan tajaan",
          paragraphs: [
            "Bahan berbayar dilabel Tajaan pada berita dan dalam senarai. Ia tidak dicampur ke dalam ruangan berita tanpa label itu.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privasi",
      sections: [
        {
          heading: "Apa yang disimpan binaan ini",
          paragraphs: [
            "Memilih bahasa menulis kuki bernama NEXT_LOCALE di laman ini supaya lawatan seterusnya dibuka dalam bahasa itu. Kuki itu kekal setahun.",
            "Kata kunci carian kekal dalam alamat halaman. Binaan ini tidak menyimpan sejarah carian, akaun pembaca atau profil analitik.",
          ],
        },
        {
          heading: "Apa yang tidak dilakukan",
          paragraphs: [
            "Tiada surat berita, log masuk komen atau pembayaran. Nama komen contoh pada berita ditulis ke dalam halaman. Ia tidak dikumpul daripada pembaca.",
            "Gantikan notis ini dengan penyedia, log dan tempoh simpanan sebenar sebelum pelancaran. Pemilik menyemak draf itu.",
          ],
        },
      ],
    },
    terms: {
      title: "Terma",
      sections: [
        {
          heading: "Menggunakan laman ini",
          paragraphs: [
            "Aureum dalam binaan ini ialah pratonton pembangunan. Anda boleh membuka halaman untuk menyemak susun atur. Jangan anggap berita contoh sebagai berita sebenar, terbitkan semula sebagai laporan, atau bergantung pada alamat dan nombor telefon contoh.",
          ],
        },
        {
          heading: "Akaun dan pembayaran",
          paragraphs: [
            "Tiada akaun pembaca, langganan atau bahagian berbayar. Tiada apa di laman ini meminta kata laluan atau nombor kad.",
          ],
        },
        {
          heading: "Perubahan",
          paragraphs: [
            "Terma ini menerangkan laman contoh sahaja. Pemilik menggantikannya dengan terma perkhidmatan sebenar sebelum pelancaran.",
          ],
        },
      ],
    },
  },
};

export default ms;
