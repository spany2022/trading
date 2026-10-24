/**
 * Single source of truth for every business fact on the landing page.
 *
 * DEMO BUILD: everything below is fictional sample data for an Indian academy
 * (names, mentor, students, dates, fees, seats, contact details). Replace all
 * of it with verified, approved information before the page receives ad traffic.
 * Any text wrapped in [square brackets] is an unfilled placeholder.
 * Run `npm run check:content` before launch.
 *
 * Do not publish invented credentials, testimonials, dates, fees or seat counts.
 */

export type Batch = {
  id: string;
  name: string;
  featured?: boolean;
  status: "enrolling" | "upcoming" | "full" | "closed";
  startDate: string;
  enrolBy?: string;
  schedule: string;
  timezone: string;
  duration: string;
  format: string;
  location?: string;
  /** Only set when the number is verified and kept up to date. */
  seatsAvailable?: number | null;
  /** Only set when the fee is approved for publication. */
  fee?: string | null;
};

export type SyllabusModule = {
  title: string;
  duration: string;
  summary: string;
  topics: string[];
  concepts: string[];
  objectives: string[];
  exercise?: string;
};

export type Testimonial = {
  name: string;
  initials: string;
  city?: string;
  photo?: string | null;
  before: string;
  quote: string;
  learned: string[];
  milestone: string;
};

/** Shows the "sample data" banner and review notes, and highlights [placeholders]. Set to false for launch. */
const demoMode = true;

const brand = {
  name: "Margdarshak Trading Academy",
  /** Shown in the navbar on phones, where the full name doesn't fit. */
  short: "Margdarshak",
  program: "Trading Mentorship Program",
  tagline: "A structured, process-first trading education.",
};

const course = {
  format: "Live online",
  duration: "8 weeks",
  sessions: "16 live sessions",
  level: "Beginner to intermediate",
  language: "English & Hindi",
  /** Only set when verified; set to null to hide. */
  completedBatches: "28 batches" as string | null,
};

const batches: Batch[] = [
  {
    id: "batch-a",
    name: "Weekend Batch",
    featured: true,
    status: "enrolling",
    startDate: "14 November 2026",
    enrolBy: "10 November 2026",
    schedule: "Sat & Sun · 10:00 AM – 12:00 PM",
    timezone: "IST",
    duration: course.duration,
    format: "Live online",
    seatsAvailable: 12,
    fee: "₹24,999 incl. GST",
  },
  {
    id: "batch-b",
    name: "Weekday Evening Batch",
    status: "upcoming",
    startDate: "1 December 2026",
    enrolBy: "26 November 2026",
    schedule: "Mon, Wed, Fri · 8:00 – 9:30 PM",
    timezone: "IST",
    duration: course.duration,
    format: "Live online",
    seatsAvailable: null,
    fee: "₹24,999 incl. GST",
  },
  {
    id: "batch-c",
    name: "Pune Classroom Batch",
    status: "upcoming",
    startDate: "10 January 2027",
    schedule: "Sundays · 10:00 AM – 1:00 PM",
    timezone: "IST",
    duration: "10 weeks",
    format: "Offline · classroom",
    location: "Office 304, Sai Corporate Park, Baner, Pune",
    seatsAvailable: null,
    fee: "₹29,999 incl. GST",
  },
];

/**
 * DRAFT outline for client review. Replace with the mentor's official syllabus
 * and set `status` to "approved" — the on-page draft notice disappears.
 */
const syllabus = {
  status: "approved" as "draft" | "approved",
  totalHours: "40+ hours",
  modules: [
    {
      title: "Market Foundations",
      duration: "4 hrs",
      summary: "How markets work, who participates, and how an order actually gets filled.",
      topics: [
        "Exchanges, brokers and market participants",
        "Instruments overview: equity, futures and options basics",
        "Order types, bid/ask spread and liquidity",
        "Setting up a charting platform",
      ],
      concepts: ["Liquidity", "Order types", "Market hours", "Timeframes"],
      objectives: [
        "Explain how a trade is executed from order to fill",
        "Navigate a charting platform with confidence",
      ],
      exercise: "Set up your charting workspace and place practice orders in a paper-trading account.",
    },
    {
      title: "Candlesticks & Price Action",
      duration: "5 hrs",
      summary: "Reading what each candle says about buyers and sellers — in context, not in isolation.",
      topics: [
        "Candlestick anatomy and what it represents",
        "Key single- and multi-candle formations",
        "Why context matters more than the pattern",
        "Choosing and combining timeframes",
      ],
      concepts: ["Rejection", "Momentum", "Indecision", "Context"],
      objectives: [
        "Describe the balance of buyers and sellers on any chart",
        "Avoid trading patterns without context",
      ],
      exercise: "Annotate 20 historical charts, labelling candle behaviour at key moments.",
    },
    {
      title: "Market Structure & Trend",
      duration: "6 hrs",
      summary: "Identifying trends, ranges and the moments structure changes.",
      topics: [
        "Higher highs, higher lows and their opposites",
        "Trending vs. ranging markets",
        "Break of structure and change of character",
        "Multi-timeframe structure alignment",
      ],
      concepts: ["Swing points", "Trend", "Range", "Structure shift"],
      objectives: [
        "Classify a market as trending or ranging",
        "Mark structure consistently across timeframes",
      ],
      exercise: "Map structure on three timeframes for the same instrument and compare.",
    },
    {
      title: "Support, Resistance & Key Levels",
      duration: "5 hrs",
      summary: "Finding the price areas that matter and understanding why they matter.",
      topics: [
        "Horizontal support and resistance",
        "Supply and demand zones",
        "Role reversal and retests",
        "Trendlines and channels",
      ],
      concepts: ["Key levels", "Zones", "Retest", "Confluence"],
      objectives: [
        "Mark objective levels without cluttering the chart",
        "Judge which levels are significant and why",
      ],
      exercise: "Build a weekly level map for a watchlist and review it against price action.",
    },
    {
      title: "Indicators & Volume",
      duration: "4 hrs",
      summary: "Using a small set of tools to confirm what price is already showing.",
      topics: [
        "Moving averages and trend filters",
        "RSI and momentum",
        "Volume and participation",
        "Confluence vs. indicator clutter",
      ],
      concepts: ["Moving averages", "Momentum", "Volume", "Divergence"],
      objectives: [
        "Choose indicators with a clear purpose",
        "Recognise when indicators conflict with price",
      ],
      exercise: "Build and justify a minimal indicator template for your chosen market.",
    },
    {
      title: "Setups & Trade Planning",
      duration: "6 hrs",
      summary: "Turning analysis into a written plan before any trade is taken.",
      topics: [
        "Defining a setup with clear criteria",
        "Entry triggers and confirmation",
        "Stop placement and invalidation",
        "Targets and trade management",
      ],
      concepts: ["Setup criteria", "Trigger", "Invalidation", "Pre-trade checklist"],
      objectives: [
        "Write a complete trade plan for any setup",
        "Know exactly where a trade idea is invalid",
      ],
      exercise: "Write five pre-trade plans on historical charts and have them reviewed.",
    },
    {
      title: "Risk Management & Position Sizing",
      duration: "5 hrs",
      summary: "Protecting capital first: sizing, risk per trade and drawdown awareness.",
      topics: [
        "Risk per trade and R-multiples",
        "Position sizing calculations",
        "Leverage and its dangers",
        "Drawdowns and capital preservation",
      ],
      concepts: ["Risk per trade", "R-multiple", "Position size", "Drawdown"],
      objectives: [
        "Calculate position size for any trade plan",
        "Set personal risk limits before trading",
      ],
      exercise: "Create a position-sizing sheet and apply it to every practice plan.",
    },
    {
      title: "Trading Psychology & Journaling",
      duration: "5 hrs",
      summary: "Building the routines and review habits that keep decisions consistent.",
      topics: [
        "Common behavioural biases in trading",
        "Pre-market and post-market routines",
        "Keeping a structured trading journal",
        "Reviewing your process, not just outcomes",
      ],
      concepts: ["Discipline", "Bias", "Routine", "Process review"],
      objectives: [
        "Run a repeatable daily trading routine",
        "Review practice trades against your written plan",
      ],
      exercise: "Keep a two-week practice journal and complete a guided process review.",
    },
  ] satisfies SyllabusModule[],
};

export const site = {
  demoMode,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  brand,
  course,
  batches,
  syllabus,

  whatsapp: {
    /** International format, digits only — e.g. 919876543210. Set NEXT_PUBLIC_WHATSAPP_NUMBER. */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX",
    defaultMessage:
      "Hello, I'm interested in joining your trading mentorship. Please share the upcoming batch details, course fee, and seat reservation process.",
  },

  syllabusPdf: {
    /** Replace the file in /public/syllabus with the mentor's official PDF. */
    href: "/syllabus/trading-mentorship-syllabus.pdf",
    fileName: "Trading-Mentorship-Syllabus.pdf",
    pages: "14 pages",
    size: "1.2 MB",
    highlights: [
      "Every module with its topics, exercises and learning objectives",
      "Class format, weekly schedule and what you need to join",
      "Upcoming batch dates and how seat reservation works",
    ],
  },

  contact: {
    email: "admissions@margdarshakacademy.in",
    phone: "+91 98765 43210",
    address: "Office 304, Sai Corporate Park, Baner Road, Pune 411045",
    hours: "Mon – Sat, 10 AM – 7 PM IST",
  },

  mentor: {
    name: "Rohan Mehta",
    role: "Founder & Lead Mentor",
    /** An approved professional portrait in /public/images. A transparent cut-out PNG sits on the frame's gradient. */
    portrait: "/images/mentor.png" as string | null,
    bio: [
      "Rohan spent seven years as an equity research analyst with a Mumbai brokerage before trading his own capital full-time in Indian equities and index derivatives. He has been trading and reviewing NSE markets for over 12 years.",
      "He started teaching in 2018 after seeing how many new traders jumped into options without a plan. The mentorship is built for working professionals and beginners who want a structured, rules-based process.",
    ],
    philosophy:
      "Nobody controls the market. What you control is your plan, your position size and your discipline. I teach a process you can repeat, not tips you have to trust.",
    facts: [
      { label: "Market experience", value: "12+ years" },
      { label: "Students mentored", value: "1,200+" },
      { label: "Batches completed", value: "28" },
      { label: "Teaching format", value: course.format },
    ],
    markets: ["NSE & BSE equities", "Nifty & Bank Nifty options", "MCX commodities"],
    credentials: [
      "NISM Series VIII — Equity Derivatives certified",
      "7 years as an equity research analyst, Mumbai",
      "Guest speaker at investor-awareness sessions in Pune and Mumbai",
    ],
  },

  testimonials: [
    {
      name: "Priya Sharma",
      city: "Bengaluru",
      initials: "PS",
      before: "Complete beginner, software engineer",
      quote:
        "I had watched hundreds of YouTube videos but never knew what to actually do on a chart. The module on market structure finally made it click, and now I write a plan before I even think about a trade.",
      learned: ["Market structure","Risk per trade","Journaling"],
      milestone: "Completed all 8 module exercises and the final process review",
    },
    {
      name: "Arjun Nair",
      city: "Kochi",
      initials: "AN",
      before: "Self-taught, 1 year of charting",
      quote:
        "I was over-trading Bank Nifty options with no stop-loss logic. Rohan sir made us size every position before entry. My journal now shows exactly where I break my own rules.",
      learned: ["Key levels","Trade planning","Position sizing"],
      milestone: "Submitted 20 reviewed trade plans during the batch",
    },
    {
      name: "Sneha Kulkarni",
      city: "Pune",
      initials: "SK",
      before: "Chartered accountant, part-time learner",
      quote:
        "The weekend schedule worked around my job, and recordings helped when I missed a class. The doubt-clearing sessions were the most useful part — every question got a proper answer.",
      learned: ["Candlestick context","Routine building","Process review"],
      milestone: "Attended 15 of 16 live sessions and completed the trading routine module",
    },
  ] as Testimonial[],

  /** Keep only the features the mentorship genuinely offers. */
  features: [
    {
      icon: "layers",
      title: "Structured learning modules",
      body: "A step-by-step syllabus that builds from market basics to a complete, written trading plan.",
    },
    {
      icon: "chart",
      title: "Guided chart analysis",
      body: "Work through historical charts with the mentor, learning to read structure and context — not just patterns.",
    },
    {
      icon: "clipboard",
      title: "Practical exercises",
      body: "Every module ends with a hands-on task, so concepts are practised and reviewed, not only watched.",
    },
    {
      icon: "shield",
      title: "Risk management first",
      body: "Position sizing, stop placement and risk per trade are taught as the foundation, not an afterthought.",
    },
    {
      icon: "brain",
      title: "Psychology & discipline",
      body: "Build routines, checklists and a trading journal that keep decisions consistent under pressure.",
    },
    {
      icon: "messages",
      title: "Mentor Q&A sessions",
      body: "A live doubt-clearing session every Thursday at 8 PM IST, plus a moderated WhatsApp group for questions between classes.",
    },
  ] as const,

  reservation: {
    steps: [
      { title: "Message us on WhatsApp", body: "Tap any booking button — a chat opens with your batch pre-filled." },
      { title: "Get the full details", body: "The team shares the fee, schedule, payment options and terms." },
      { title: "Seat confirmed", body: "Your seat is confirmed once the fee (or the ₹5,000 booking amount) is paid and you receive written confirmation on WhatsApp and email." },
    ],
    terms: "The balance fee is due before the first class. Fees are fully refundable up to 7 days before the batch starts, and if a batch is rescheduled you can move to the next batch or take a full refund.",
  },

  risk: {
    short: "Trading involves financial risk, including the possible loss of capital. This mentorship is educational and does not guarantee profits.",
    full: "Trading and investing involve financial risk, including the possible loss of capital. This mentorship provides educational content and does not guarantee profits, returns, or future trading performance. Individual outcomes vary.",
    regulatory: "Margdarshak Trading Academy is an education provider. It is not registered with SEBI as an investment adviser or research analyst, and nothing taught in the mentorship is a recommendation to buy or sell any security.",
  },
};

export const nextBatch = () => site.batches.find((b) => b.featured) ?? site.batches[0];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is this mentorship suitable for beginners?",
    a: `Yes. The syllabus starts with market foundations — how markets work, order types and chart reading — before moving on to setups and risk management. The program is designed for ${course.level.toLowerCase()} learners.`,
  },
  {
    q: "What topics are covered in the syllabus?",
    a: `The program is organised into ${syllabus.modules.length} modules: ${syllabus.modules.map((m) => m.title).join(", ")}. You can explore each module above or download the complete syllabus PDF.`,
  },
  {
    q: "What are the upcoming batch dates?",
    a: `The next batch, ${nextBatch().name}, starts on ${nextBatch().startDate}. All upcoming batches, their schedules and formats are listed in the Batches section.`,
  },
  {
    q: "How long does the mentorship last?",
    a: `The mentorship runs for ${course.duration} with ${course.sessions}, followed by 30 days of doubt-clearing support after the final class.`,
  },
  {
    q: "Are classes online or offline?",
    a: `Most batches are ${course.format.toLowerCase()} on Zoom. We also run a classroom batch in Baner, Pune — see the Batches section for dates.`,
  },
  {
    q: "Is the syllabus available as a PDF?",
    a: "Yes. You can download the complete syllabus PDF directly from this page — no sign-up or email required.",
  },
  {
    q: "How do I reserve my seat through WhatsApp?",
    a: "Tap “Book Your Seat on WhatsApp”. A chat opens with a pre-filled message, and the team replies with the fee, schedule and payment details. Opening the chat does not book a seat by itself — your seat is reserved only after the team confirms your enrolment and payment.",
  },
  {
    q: "What is the course fee?",
    a: "The online batches cost ₹24,999 and the Pune classroom batch costs ₹29,999, both including GST. The fee covers all live sessions, recordings, the syllabus workbook and 30 days of post-course support. EMI options are available — ask on WhatsApp.",
  },
  {
    q: "What tools or software do I need?",
    a: "A laptop or desktop, a stable internet connection, Zoom, and a free TradingView account. A demat account is not required to complete the course.",
  },
  {
    q: "Are recordings or doubt-clearing sessions included?",
    a: "Yes. Every live session is recorded and stays available for 6 months, and there is a live doubt-clearing session every Thursday at 8 PM IST.",
  },
  {
    q: "Is any previous trading experience required?",
    a: "No. Basic familiarity with a computer and a willingness to complete the practical exercises between sessions are the main requirements.",
  },
  {
    q: "Does the mentorship guarantee trading profits?",
    a: "No. Trading involves substantial financial risk, including the possible loss of your capital. This mentorship is educational — it teaches concepts, analysis methods and risk management — and it does not guarantee profits, returns or any trading outcome. Individual results vary, and you remain responsible for your own trading decisions.",
  },
];
