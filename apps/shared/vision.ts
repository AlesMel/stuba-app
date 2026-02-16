export type Localized = {
  sk: string;
  en: string;
};

export type VisionSection = {
  id: string;
  title: Localized;
  summary?: Localized;
  items: Localized[];
};

// Core modules mirrored between mobile app and web.
export const visionSections: VisionSection[] = [
  {
    id: "home",
    title: {
      sk: "Home / Dashboard",
      en: "Home / Dashboard"
    },
    summary: {
      sk: "Personalizovaný vstupný bod pre študentov, zamestnancov aj verejnosť.",
      en: "Personalized entry point for students, staff, and visitors."
    },
    items: [
      { sk: "odporúčané podujatia", en: "recommended events" },
      { sk: "dôležité oznamy", en: "important announcements" },
      { sk: "rýchly prístup ku karte", en: "quick access to the virtual card" },
      { sk: "„čo sa dnes deje na STU“", en: "“what’s happening at STU today”" }
    ]
  },
  {
    id: "events",
    title: {
      sk: "Eventy & popularizácia STU",
      en: "Events & outreach"
    },
    summary: {
      sk: "Kľúčový modul pre viditeľnosť univerzity.",
      en: "Key module that showcases the university."
    },
    items: [
      { sk: "kalendár podujatí (vedecké, kultúrne, športové, verejné)", en: "event calendar (research, cultural, sports, public)" },
      { sk: "dni otvorených dverí a prednášky pre verejnosť", en: "open days and public lectures" },
      { sk: "popularizačné akcie („Science for All“, exkurzie)", en: "outreach activities (“Science for All”, excursions)" },
      { sk: "študentské spolky, ombudsman", en: "student clubs, ombudsman" },
      { sk: "prihlásenie a check‑in cez virtuálnu kartu", en: "signup and check‑in via virtual card" },
      { sk: "notifikácie a prepojenie na mapu/priestor", en: "notifications and map/space linking" }
    ]
  },
  {
    id: "spaces",
    title: {
      sk: "Priestory & využitie kampusu",
      en: "Spaces & campus usage"
    },
    summary: {
      sk: "Nový silný modul – STU ako otvorený kampus, nie len súbor budov.",
      en: "New, strong module – STU as an open campus, not just buildings."
    },
    items: [
      { sk: "budovy STU, učebne, auly, laboratóriá (ak je povolené)", en: "STU buildings, classrooms, auditoriums, labs (where allowed)" },
      { sk: "knižnice, športoviská, spoločenské priestory", en: "libraries, sports grounds, social spaces" },
      { sk: "dostupnosť / obsadenosť a účel využitia", en: "availability / occupancy and intended use" },
      { sk: "rezervácie a navigácia", en: "reservations and navigation" },
      { sk: "identifikácia vstupu (karta / NFC)", en: "entry identification (card / NFC)" }
    ]
  },
  {
    id: "card",
    title: {
      sk: "Virtuálna karta (core identita)",
      en: "Virtual card (core identity)"
    },
    summary: {
      sk: "Jadro celej aplikácie – jednotná identita pre služby.",
      en: "Core of the app – unified identity for services."
    },
    items: [
      { sk: "vstupy, služby, knižnice, jedálne, eventy, rezervácie", en: "entries, services, libraries, canteens, events, reservations" },
      { sk: "NFC (ak infraštruktúra dovolí), QR fallback", en: "NFC (where infra allows), QR fallback" },
      { sk: "bezpečný token, obmedzený offline režim", en: "secure token, limited offline mode" }
    ]
  }
];

// Cross-cutting enhancements to keep both platforms aligned.
export const visionEnhancements: Localized[] = [
  { sk: "Vyhľadávanie naprieč podujatiami, priestormi a službami.", en: "Search across events, spaces, and services." },
  { sk: "Personalizácia podľa fakulty/štúdia, uložené filtre a pripomienky.", en: "Personalisation by faculty/program, saved filters, reminders." },
  { sk: "Mapy a navigácia vrátane živej obsadenosti miestností/študovní.", en: "Maps and navigation with live occupancy for rooms/study spaces." },
  { sk: "Rezervácie so stornom a úpravou termínov.", en: "Reservations with cancellation and rescheduling." },
  { sk: "Notifikácie na zmeny v eventoch, rezerváciách a uzávierky služieb.", en: "Notifications for changes to events, bookings, and service closures." },
  { sk: "Bezpečnosť: MFA pre citlivé akcie, rotácia tokenov, hlásenie strateného zariadenia.", en: "Security: MFA for sensitive actions, token rotation, lost-device reporting." },
  { sk: "Prístupnosť a lokalizácia (SK/EN), nastaviteľná veľkosť písma, kontrast.", en: "Accessibility & localisation (SK/EN), adjustable text size, contrast." },
  { sk: "Integrácie: AIS/študijný systém, knižničný systém, menza/platby.", en: "Integrations: AIS/academic system, library system, canteen/payments." },
  { sk: "Spätná väzba: hodnotenie eventov a priestorov, rýchle hlásenie problémov.", en: "Feedback: rate events/spaces, quick issue reporting." }
];
