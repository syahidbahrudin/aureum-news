import type { Dictionary } from "@/lib/i18n/dictionaries";

// Simplified Chinese UI copy.
const zh: Dictionary = {
  meta: {
    title: "Aureum — 新闻",
    description: "Aureum 是一个开发阶段的新闻网站。所有显示的报道均为明确标注的示例。",
  },
  tagline: "清晰的报道，用你的语言。",
  a11y: {
    skipToContent: "跳到主要内容",
    primaryNav: "主导航",
    sectionNav: "栏目",
    language: "语言",
    chooseLanguage: "选择语言",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    menu: "菜单",
    search: "站内搜索",
  },
  nav: {
    home: "首页",
  },
  sections: {
    latest: "最新",
    editorsPicks: "编辑精选",
    categoryCoverage: "栏目报道",
    viewCategory: "查看栏目",
    readMore: "继续阅读",
    opinion: "评论",
    topComments: "热门评论",
    topOpinion: "热门观点",
    related: "相关报道",
  },
  search: {
    label: "搜索 Aureum",
    placeholder: "搜索报道",
    button: "搜索",
    resultsFor: "“{q}”的搜索结果",
    count: "找到 {count} 条",
    noResultsTitle: "没有与搜索匹配的报道",
    noResultsBody: "没有与“{q}”匹配的内容。请换个词试试。",
    emptyHint: "输入关键词以搜索示例报道。",
  },
  labels: {
    breaking: "快讯",
    byline: "作者",
    updated: "更新于",
    noImage: "图片待定",
    imageCaption: "开发占位照片。并非已报道事件的记录。",
    imageCredit: "开发占位",
    readingTime: "约 {min} 分钟阅读（估计）",
    commentCount: "{count} 条评论",
    commentOne: "1 条评论",
    sampleReader: "示例读者",
    shareOn: "分享到 {network}",
  },
  contentType: {
    news: "新闻",
    analysis: "分析",
    opinion: "评论",
    sponsored: "赞助",
  },
  categories: {
    national: "国内",
    world: "国际",
    business: "商业",
    technology: "科技",
    sport: "体育",
    culture: "文化",
  },
  footer: {
    description: "开发阶段的新闻网站。发布者信息为占位内容。",
    note: "所有报道均标注为示例。这里尚未发布真实报道。",
    rights: "2026 © Aureum (M) Bhd (Co. No. 196101000449 / 4485 H). A part of Media Prima Group.",
    sectionsHeading: "栏目",
    companyHeading: "Aureum",
    contactHeading: "联系",
    contactBody:
      "Aureum 新闻编辑部\nAureum 大厦 12 层\nJalan Ampang, 50450 Kuala Lumpur\nnewsroom@aureum.example\n+60 3 2181 4400",
    socialPlaceholder: "{network} — 占位，尚无真实账号",
    links: {
      about: "关于",
      contact: "联系",
      editorialPolicy: "编辑方针",
      privacy: "隐私",
      terms: "条款",
    },
  },
  pages: {
    placeholder: "开发占位内容 — 最终文案待发布者审核。",
    draftDate: "示例草稿 · 2026年10月9日",
    about: {
      title: "关于 Aureum",
      sections: [
        {
          heading: "这个网站是什么",
          paragraphs: [
            "Aureum 是用来试阅读版式、导航和语言切换的示例新闻站。它不是正式出版物，站上的内容也不是报道。",
            "其他页面的稿件、照片和署名都标为示例。本页同样：下面的编辑部、地址和宗旨都是占位，方便查看版式。",
          ],
        },
        {
          heading: "示例编辑部",
          paragraphs: [
            "示例报头设在吉隆坡，以英语、马来语、华语和泰米尔语发布。这里不列记者姓名。真实姓名、职务和照片只在发布者提供后放上。",
            "示例栏目为国内、国际、商业、科技、体育和文化。某个栏目至少有一篇已发布的示例稿，才会出现在导航里。",
          ],
        },
        {
          heading: "谁在运营",
          paragraphs: [
            "本版本的所有权、主编和公司登记都空着。上线前用真实发布者替换这一段。",
          ],
        },
      ],
    },
    contact: {
      title: "联系",
      sections: [
        {
          heading: "编辑部",
          paragraphs: [
            "Aureum 编辑部\nAureum 大厦 12 层\n安邦路，50450 吉隆坡",
            "这是示例地址，不是在运营的办公室。",
          ],
        },
        {
          heading: "示例渠道",
          paragraphs: [
            "总台：newsroom@aureum.example",
            "更正：corrections@aureum.example",
            "电话：+60 3 2181 4400",
            "示例时间：周一至周五 9:00–18:00，亚洲/吉隆坡。",
          ],
        },
        {
          heading: "更正",
          paragraphs: [
            "更正请求应写明稿件、有误的句子，以及修改所依据的来源。本版本没有表单，也不会发送邮件。上面的地址是占位。",
          ],
        },
      ],
    },
    editorialPolicy: {
      title: "编辑方针",
      sections: [
        {
          heading: "来源",
          paragraphs: [
            "已发布的稿件写明事实出自何处。匿名来源只有在编辑记录了隐去姓名的理由时才允许。本示例站的占位稿不执行这条规则。",
          ],
        },
        {
          heading: "核查",
          paragraphs: [
            "能对照文件、录音或具名人士核对的事实，在发布前核对。评论栏标为评论，不当作新闻报道。",
          ],
        },
        {
          heading: "更正",
          paragraphs: [
            "事实更正留在稿件上，并写明日期和改了什么。版面修饰不更新编辑时间。撤回的稿件离开公开页面。",
          ],
        },
        {
          heading: "赞助内容",
          paragraphs: [
            "付费材料在稿件和列表上标为赞助。没有这个标签，就不放进新闻栏目。",
          ],
        },
      ],
    },
    privacy: {
      title: "隐私",
      sections: [
        {
          heading: "本版本保存什么",
          paragraphs: [
            "选择语言会在本站写入名为 NEXT_LOCALE 的 cookie，下次访问用该语言打开。cookie 保留一年。",
            "搜索词留在页面地址里。本版本不保存搜索记录、读者账号或分析档案。",
          ],
        },
        {
          heading: "本版本不做什么",
          paragraphs: [
            "没有通讯、评论登录或付款。稿件上的示例评论名写在页面里，不是从读者收集的。",
            "上线前用真实的服务商、日志和保存期限替换本声明。发布者审核那份草稿。",
          ],
        },
      ],
    },
    terms: {
      title: "条款",
      sections: [
        {
          heading: "使用本站",
          paragraphs: [
            "本版本的 Aureum 是开发预览。你可以打开页面查看版式。不要把示例稿当作新闻，不要当作报道转载，也不要依赖示例地址和电话。",
          ],
        },
        {
          heading: "账号与付款",
          paragraphs: [
            "没有读者账号、订阅或付费栏目。站上没有任何地方索取密码或卡号。",
          ],
        },
        {
          heading: "变更",
          paragraphs: [
            "这些条款只描述示例站。发布者在上线前换成正式服务的条款。",
          ],
        },
      ],
    },
  },
};

export default zh;
