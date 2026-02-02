import React, { createContext, useContext, useMemo, useState } from "react";

export type Locale = "en" | "sk";

const translations = {
  en: {
    greeting: "Hello, {name}",
    guest: "Guest",
    todayLabel: "Today {date}",
    languageLabel: "Language",
    languageEnglish: "English",
    languageSlovak: "Slovak",

    homeWidgetsTitle: "Home widgets",
    homeWidgetsSubtitle: "Tap any card to open a dedicated screen.",

    dailyChallengeTitle: "Daily challenge",
    dailyChallengeSubtitle: "Do your plan before 09:00 AM",

    eventBadge: "Event",
    eventChip: "Upcoming",
    eventTitle: "AI Research Seminar",
    eventDetail1: "Tue 4 Feb - 14:00-15:30",
    eventDetail2: "Room B201 - Faculty of Informatics",
    eventLink: "Open details",

    cantineBadge: "Cantine",
    cantineChip: "Today",
    cantineTitle: "Today's Menu",
    cantineItem1: "Chicken bowl",
    cantineItem2: "Veggie pasta",
    cantineItem3: "Tomato soup",
    cantineLink: "See full menu",

    studentIdBadge: "Student ID",
    virtualChip: "Tap to show",
    virtualCardLabel: "Campus Card",
    virtualTap: "Tap",

    moreBadge: "More",
    moreChip: "4 shortcuts",
    moreTitle: "Quick links",
    moreLink: "Open hub",
    moreItem1: "Library",
    moreItem2: "Grades",
    moreItem3: "Timetable",
    moreItem4: "Parking",

    tabHome: "Home",
    tabDashboard: "Dashboard",
    tabHistory: "History",
    tabProfile: "Profile",

    screenEventTitle: "Event details",
    screenEventBody: "Show the selected university event here. Add agenda, speakers, and registration links.",

    screenCantineTitle: "Cantine Menu",
    screenCantineBody: "List today's meals, allergens, and prices. Hook this up to the campus menu feed.",

    screenVirtualCardTitle: "Virtual Student Card",
    screenVirtualCardBody: "Display QR / NFC info, card number, and quick actions for campus services.",

    screenMoreTitle: "More",
    screenMoreBody: "Link to library, grades, timetable, parking, and other university services.",

    screenDashboardTitle: "Dashboard",
    screenDashboardBody: "Drop shortcuts or widgets here to mirror the grid tab in the new bottom menu.",

    screenHistoryTitle: "History",
    screenHistoryBody: "No items yet. Wire this up to stored queries later.",

    screenProfileTitle: "Profile",
    screenProfileBody: "Connect account settings, avatars, and preferences here.",

    profileIdentityHeader: "Student Identity",
    profileIdentityTagline: "Verified profile for campus services.",
    profileUniversity: "Slovak University of Technology",
    profileFaculty: "Faculty of Informatics",
    profileYear: "Year 3 • Bc. programme",
    profileDigitalCardTitle: "Digital Student Card",
    profileDigitalCardHint: "Show QR/NFC when entering services.",
    profileViewStudentCard: "View Student Card",
    profileStatUpcoming: "2 upcoming events",
    profileStatSaved: "5 saved events",

    profileMyEventsTitle: "My Events",
    profileEventsUpcoming: "Upcoming events",
    profileEventsPast: "Past events",
    profileEventsBooked: "Booked / Registered events",

    profileBookingsTitle: "My Bookings",
    profileBookingsTickets: "Event tickets",
    profileBookingsReserved: "Reserved seats / workshops",

    profileSavedTitle: "Saved Events",
    profileSavedInterested: "\"Interested\" or bookmarked events",

    profileNotificationsTitle: "Notification preferences",
    profileNotificationsLead: "Pick what you want to be interrupted by.",
    profileNotifImportantAnnouncements: "Important announcements",
    profileNotifEvents: "Event reminders",
    profileNotifEmergencies: "Emergency alerts",

    profileSettingsTitle: "Settings & Account",
    profileSettingsEditProfile: "Edit Profile",
    profileSettingsLanguage: "Language",
    profileSettingsDarkMode: "Dark mode",
    profileSettingsPrivacy: "Privacy & data",
    profileSettingsConnections: "Connected accounts",
    profileSettingsLogout: "Log out",

    profileActionView: "View",
    profileActionManage: "Manage",
    profileActionOpen: "Open",
    profileActionOn: "On",
    profileActionOff: "Off",
    profileActionAlways: "Always on",
    profileActionEdit: "Edit",
    profileActionLogOut: "Log out",
    profileEmptyEvents: "No events yet — new ones will appear here.",
    profileEmptyBookings: "No reservations. Grab a seat once registrations open.",
    profileEmptySaved: "No saved items. Tap ⭐ on events to keep them handy."
  },
  sk: {
    greeting: "Ahoj, {name}",
    guest: "Hosť",
    todayLabel: "Dnes {date}",
    languageLabel: "Jazyk",
    languageEnglish: "Angličtina",
    languageSlovak: "Slovenčina",

    homeWidgetsTitle: "Hlavné widgety",
    homeWidgetsSubtitle: "Ťukni na kartu a otvor príslušnú obrazovku.",

    dailyChallengeTitle: "Denná výzva",
    dailyChallengeSubtitle: "Splň plán do 09:00",

    eventBadge: "Podujatie",
    eventChip: "Čoskoro",
    eventTitle: "Seminár AI výskum",
    eventDetail1: "Ut 4. feb - 14:00-15:30",
    eventDetail2: "Miestnosť B201 - Fakulta informatiky",
    eventLink: "Otvoriť detail",

    cantineBadge: "Jedáleň",
    cantineChip: "Dnes",
    cantineTitle: "Dnešné menu",
    cantineItem1: "Kurací bowl",
    cantineItem2: "Vegetariánske cestoviny",
    cantineItem3: "Paradajková polievka",
    cantineLink: "Zobraziť celé menu",

    studentIdBadge: "Študentský preukaz",
    virtualChip: "Zobraziť",
    virtualCardLabel: "Karta kampusu",
    virtualTap: "Klepni",

    moreBadge: "Viac",
    moreChip: "4 skratky",
    moreTitle: "Rýchle odkazy",
    moreLink: "Otvoriť hub",
    moreItem1: "Knižnica",
    moreItem2: "Známky",
    moreItem3: "Rozvrh",
    moreItem4: "Parkovanie",

    tabHome: "Domov",
    tabDashboard: "Prehľad",
    tabHistory: "História",
    tabProfile: "Profil",

    screenEventTitle: "Podrobnosti podujatia",
    screenEventBody: "Zobraz tu vybrané univerzitné podujatie. Dopln program, rečníkov a registráciu.",

    screenCantineTitle: "Menu jedálne",
    screenCantineBody: "Vypíš dnešné jedlá, alergény a ceny. Prepoj to s feedom jedálne.",

    screenVirtualCardTitle: "Virtuálny študentský preukaz",
    screenVirtualCardBody: "Zobraz QR / NFC údaje, číslo karty a rýchle akcie pre služby kampusu.",

    screenMoreTitle: "Viac",
    screenMoreBody: "Prepoj knižnicu, známky, rozvrh, parkovanie a ďalšie univerzitné služby.",

    screenDashboardTitle: "Panel",
    screenDashboardBody: "Pridaj sem skratky alebo widgety, ktoré zodpovedajú mriežke v novom dolnom menu.",

    screenHistoryTitle: "História",
    screenHistoryBody: "Zatiaľ žiadne položky. Neskôr pripoj uložené dotazy.",

    screenProfileTitle: "Profil",
    screenProfileBody: "Prepoj nastavenia účtu, avatary a preferencie.",

    profileIdentityHeader: "Študentská identita",
    profileIdentityTagline: "Overený profil pre služby kampusu.",
    profileUniversity: "Slovenská technická univerzita",
    profileFaculty: "Fakulta elektrotechniky a informatiky",
    profileYear: "2. ročník • PhD. program",
    profileDigitalCardTitle: "Digitálny študentský preukaz",
    profileDigitalCardHint: "Ukáž QR/NFC pri vstupe do služieb.",
    profileViewStudentCard: "Zobraziť preukaz",
    profileStatUpcoming: "2 nadchádzajúce podujatia",
    profileStatSaved: "5 uložených udalostí",

    profileMyEventsTitle: "Moje podujatia",
    profileEventsUpcoming: "Nadchádzajúce podujatia",
    profileEventsPast: "Minulé podujatia",
    profileEventsBooked: "Registrované / prihlásené",

    profileBookingsTitle: "Moje rezervácie",
    profileBookingsTickets: "Vstupenky",
    profileBookingsReserved: "Rezervované miesta / workshopy",

    profileSavedTitle: "Uložené udalosti",
    profileSavedInterested: "Označené ako „Mám záujem“ alebo uložené",

    profileNotificationsTitle: "Notifikácie",
    profileNotificationsLead: "Vyber, čo ťa môže vyrušiť.",
    profileNotifImportantAnnouncements: "Dôležité oznamy",
    profileNotifEvents: "Pripomienky podujatí",
    profileNotifEmergencies: "Mimoriadne správy",

    profileSettingsTitle: "Nastavenia a účet",
    profileSettingsEditProfile: "Upraviť profil",
    profileSettingsLanguage: "Jazyk",
    profileSettingsDarkMode: "Tmavý režim",
    profileSettingsPrivacy: "Súkromie a dáta",
    profileSettingsConnections: "Prepojené účty",
    profileSettingsLogout: "Odhlásiť sa",

    profileActionView: "Zobraziť",
    profileActionManage: "Spravovať",
    profileActionOpen: "Otvoriť",
    profileActionOn: "Zap.",
    profileActionOff: "Vyp.",
    profileActionAlways: "Vždy zap.",
    profileActionEdit: "Upraviť",
    profileActionLogOut: "Odhlásiť",
    profileEmptyEvents: "Žiadne podujatia — nové sa ukážu hneď po zverejnení.",
    profileEmptyBookings: "Žiadne rezervácie. Zabezpeč si miesto, keď sa otvorí registrácia.",
    profileEmptySaved: "Žiadne uložené položky. Ťukni na ⭐ pri podujatí a nechaj si ho tu."
  }
} as const;

type TranslationKey = keyof typeof translations.en;

type LocalizationContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  formatDate: (date: Date, options: Intl.DateTimeFormatOptions) => string;
};

const localeToIntl: Record<Locale, string> = {
  en: "en-US",
  sk: "sk-SK"
};

const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

const replaceParams = (
  template: string,
  params: Record<string, string | number> = {}
): string => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), String(value));
  }, template);
};

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("sk");

  const t = useMemo(
    () => (key: TranslationKey, params?: Record<string, string | number>) => {
      const fallback = translations.en[key] ?? key;
      const template = translations[locale][key] ?? fallback;
      return replaceParams(template, params);
    },
    [locale]
  );

  const formatDate = useMemo(
    () => (date: Date, options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(localeToIntl[locale], options).format(date),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, formatDate }),
    [locale, t, formatDate]
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useTranslation(): LocalizationContextValue {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LocalizationProvider");
  }
  return ctx;
}
