import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { visionEnhancements, visionSections } from "../../shared/vision";
import styles from "../styles/Home.module.css";

type Widget = {
  tint: "yellow" | "blue" | "gray" | "pink";
  badge: string;
  title: string;
  items: string[];
  link: string;
  onClick?: () => void;
};

type RowProps = {
  label: string;
  detail?: string;
  action?: string;
  tone?: "alert" | "subtle";
  icon?: string;
  color?: string;
  last?: boolean;
  onClick?: () => void;
};

const heroAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60"
];

type Locale = "en" | "sk";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    greeting: "Hello, Aleš",
    homeSubtitle: "We’re borrowing the comfy card layout from mobile so the web feels like home.",
    profileTitle: "Profile",
    profileSubtitle: "Same layout as the mobile Profile screen, adapted for web cards.",
    dailyBadge: "Daily challenge",
    homeHeroTitle: "Finish your enrollment in two clean steps",
    homeHeroText: "Upload your signed form and pick a preferred slot for identity verification. We’ll notify you when it’s approved.",
    homeHeroCta: "Upload form",
    homeHeroSecondary: "Pick verification slot",
    widgetsTitle: "Widgets from mobile",
    widgetsSubtitle: "Cards, soft backgrounds, and chips match the Home screen.",
    widgetEventTitle: "FCHPT Career Meetup",
    widgetEventLoc: "Lab A, Blok B",
    widgetEventType: "Panel + Q&A",
    widgetEventCta: "Add to calendar",
    widgetEventLink: "Open details",
    widgetCanteenBadge: "Canteen",
    widgetCanteenTitle: "Daily menu",
    widgetCanteenItem1: "Roast turkey & potatoes",
    widgetCanteenItem2: "Veggie curry",
    widgetCanteenItem3: "Tomato soup",
    widgetCanteenLink: "See full menu",
    widgetIdBadge: "Student ID",
    widgetIdTitle: "Virtual ISIC",
    widgetIdMask: "**** 1234",
    widgetIdValid: "Valid thru 09/27",
    widgetIdTap: "Tap to pay",
    widgetIdLink: "Show card",
    widgetMoreBadge: "Quick links",
    widgetMoreTitle: "More on STU",
    widgetMore1: "Dormitory services",
    widgetMore2: "Library hours",
    widgetMore3: "Counselling",
    widgetMore4: "Campus map",
    widgetMoreLink: "Explore",
    identity: "Identity",
    identityTag: "Verified student profile",
    digitalCardTitle: "Digital student card",
    digitalCardHint: "Tap to view your virtual ISIC with NFC details.",
    statUpcoming: "2 upcoming events",
    statSaved: "5 saved items",
    myEvents: "My events",
    upcoming: "Upcoming",
    past: "Past",
    booked: "Booked tickets",
    bookings: "Bookings",
    tickets: "Tickets",
    reserved: "Reserved items",
    saved: "Saved",
    interested: "Interested",
    notifications: "Notifications",
    notifLead: "Based on the mobile toggles, with alert styling.",
    notifAnnouncements: "Important announcements",
    notifEvents: "Events and bookings",
    notifEmergency: "Emergencies",
    settings: "Settings",
    editProfile: "Edit profile",
    language: "Language",
    darkMode: "Dark mode",
    privacy: "Privacy",
    connections: "Connections",
    logout: "Log out",
    eventsEmpty: "No events yet.",
    bookingsEmpty: "No bookings yet.",
    savedEmpty: "Nothing saved yet.",
    back: "← Back to home",
    beta: "Beta web",
    actionView: "View",
    actionManage: "Manage",
    actionOpen: "Open",
    actionOn: "On",
    actionAlways: "Always",
    actionOff: "Off",
    languageEnglish: "English",
    languageSlovak: "Slovak",
    homeWidgetsHeader: "Shortcuts",
    answerHeader: "Answer"
  },
  sk: {
    greeting: "Ahoj, Aleš",
    homeSubtitle: "Prenášame pohodlné karty z mobilu, aby sa web cítil rovnako domácky.",
    profileTitle: "Profil",
    profileSubtitle: "Rovnaké rozloženie ako na mobile, prispôsobené pre web.",
    dailyBadge: "Denná výzva",
    homeHeroTitle: "Dokonči zápis v dvoch krokoch",
    homeHeroText: "Nahraj podpísaný formulár a vyber termín na overenie. Dáme ti vedieť, keď to schválime.",
    homeHeroCta: "Nahrať formulár",
    homeHeroSecondary: "Vybrať termín overenia",
    widgetsTitle: "Widgety z mobilu",
    widgetsSubtitle: "Karty, jemné pozadia a štítky kopírujú obrazovku Domov.",
    widgetEventTitle: "Kariérne stretnutie FCHPT",
    widgetEventLoc: "Lab A, Blok B",
    widgetEventType: "Panel + Q&A",
    widgetEventCta: "Pridať do kalendára",
    widgetEventLink: "Otvoriť detaily",
    widgetCanteenBadge: "Jedáleň",
    widgetCanteenTitle: "Denné menu",
    widgetCanteenItem1: "Pečené morčacie s zemiakmi",
    widgetCanteenItem2: "Vegánske kari",
    widgetCanteenItem3: "Paradajková polievka",
    widgetCanteenLink: "Pozrieť celé menu",
    widgetIdBadge: "ISIC",
    widgetIdTitle: "Virtuálny ISIC",
    widgetIdMask: "**** 1234",
    widgetIdValid: "Platí do 09/27",
    widgetIdTap: "Prilož na platbu",
    widgetIdLink: "Zobraziť kartu",
    widgetMoreBadge: "Rýchle odkazy",
    widgetMoreTitle: "Viac na STU",
    widgetMore1: "Služby internátov",
    widgetMore2: "Otváracie hodiny knižnice",
    widgetMore3: "Poradenstvo",
    widgetMore4: "Mapa kampusu",
    widgetMoreLink: "Preskúmať",
    identity: "Identita",
    identityTag: "Overený študentský profil",
    digitalCardTitle: "Digitálny preukaz",
    digitalCardHint: "Zobraz svoj virtuálny ISIC s NFC údajmi.",
    statUpcoming: "2 nadchádzajúce udalosti",
    statSaved: "5 uložených položiek",
    myEvents: "Moje udalosti",
    upcoming: "Nadchádzajúce",
    past: "Minulé",
    booked: "Rezervované lístky",
    bookings: "Rezervácie",
    tickets: "Lístky",
    reserved: "Rezervované položky",
    saved: "Uložené",
    interested: "Zaujímavé",
    notifications: "Notifikácie",
    notifLead: "Podľa prepínačov z mobilu, so zvýraznením varovaní.",
    notifAnnouncements: "Dôležité oznámenia",
    notifEvents: "Udalosti a rezervácie",
    notifEmergency: "Mimoriadne situácie",
    settings: "Nastavenia",
    editProfile: "Upraviť profil",
    language: "Jazyk",
    darkMode: "Tmavý režim",
    privacy: "Súkromie",
    connections: "Prepojenia",
    logout: "Odhlásiť sa",
    eventsEmpty: "Zatiaľ žiadne udalosti.",
    bookingsEmpty: "Zatiaľ žiadne rezervácie.",
    savedEmpty: "Zatiaľ nič uložené.",
    back: "← Späť domov",
    beta: "Beta web",
    actionView: "Zobraziť",
    actionManage: "Spravovať",
    actionOpen: "Otvoriť",
    actionOn: "Zap.",
    actionAlways: "Vždy",
    actionOff: "Vyp.",
    languageEnglish: "Angličtina",
    languageSlovak: "Slovenčina",
    homeWidgetsHeader: "Skratky",
    answerHeader: "Odpoveď"
  }
};

const tFactory = (locale: Locale) => (key: string) => translations[locale][key] ?? key;

const getWidgets = (t: (key: string) => string, dateLabel: string, onToast: (m: string) => void): Widget[] => [
  {
    tint: "yellow",
    badge: `${dateLabel} · 14:30`,
    title: t("widgetEventTitle"),
    items: [t("widgetEventLoc"), t("widgetEventType"), t("widgetEventCta")],
    link: t("widgetEventLink"),
    onClick: () => onToast(t("widgetEventLink"))
  },
  {
    tint: "blue",
    badge: t("widgetCanteenBadge"),
    title: t("widgetCanteenTitle"),
    items: [t("widgetCanteenItem1"), t("widgetCanteenItem2"), t("widgetCanteenItem3")],
    link: t("widgetCanteenLink"),
    onClick: () => onToast(t("widgetCanteenLink"))
  },
  {
    tint: "gray",
    badge: t("widgetIdBadge"),
    title: t("widgetIdTitle"),
    items: [t("widgetIdMask"), t("widgetIdValid"), t("widgetIdTap")],
    link: t("widgetIdLink"),
    onClick: () => onToast(t("widgetIdLink"))
  },
  {
    tint: "pink",
    badge: t("widgetMoreBadge"),
    title: t("widgetMoreTitle"),
    items: [t("widgetMore1"), t("widgetMore2"), t("widgetMore3"), t("widgetMore4")],
    link: t("widgetMoreLink"),
    onClick: () => onToast(t("widgetMoreLink"))
  }
];

function WidgetCard({ tint, badge, title, items, link, onClick }: Widget) {
  const tintClass =
    tint === "yellow"
      ? styles.widgetTintYellow
      : tint === "blue"
        ? styles.widgetTintBlue
        : tint === "pink"
          ? styles.widgetTintPink
          : styles.widgetTintGray;

  return (
    <article
      className={`${styles.widget} ${tintClass} ${onClick ? styles.widgetClickable : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      <span className={styles.widgetBadge}>{badge}</span>
      <h3 className={styles.widgetTitle}>{title}</h3>
      <ul className={styles.widgetList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a className={styles.widgetLink} href="#" onClick={(e) => e.preventDefault()}>
        {link} →
      </a>
    </article>
  );
}

function Row({ label, detail, action, tone, icon, color = "#971d32", last, onClick }: RowProps) {
  return (
    <div
      className={`${styles.row} ${tone === "alert" ? styles.rowAlert : ""} ${tone === "subtle" ? styles.rowSubtle : ""} ${last ? styles.rowLast : ""} ${
        onClick ? styles.rowClickable : ""
      }`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={styles.rowLeft}>
        <span className={styles.iconBubble} style={{ background: "rgba(151,29,50,0.08)" }}>
          {icon ?? "•"}
        </span>
        <div className={styles.rowTextGroup}>
          <p className={styles.rowLabel}>{label}</p>
          {detail ? <p className={styles.rowMeta}>{detail}</p> : null}
        </div>
      </div>
      <div className={styles.rowRight}>
        {action ? (
          <span className={styles.rowAction} style={{ color }}>
            {action}
          </span>
        ) : null}
        <span className={styles.rowChevron}>›</span>
      </div>
    </div>
  );
}

function StatPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className={styles.statPill}>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statText}>{label}</span>
    </div>
  );
}

function VisionCard({ title, summary, items }: { title: string; summary?: string; items: string[] }) {
  return (
    <article className={styles.visionCard}>
      <p className={styles.eyebrow}>{title}</p>
      {summary ? <p className={styles.visionSummary}>{summary}</p> : null}
      <ul className={styles.visionList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Home() {
  const [view, setView] = useState<"home" | "profile">("home");
  const [locale, setLocale] = useState<Locale>("en");
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const t = useMemo(() => tFactory(locale), [locale]);

  const triggerToast = useCallback(
    (message: string) => {
      setToast(message);
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
      toastTimer.current = window.setTimeout(() => setToast(null), 2000);
    },
    []
  );

  const formattedDate = useMemo(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-US", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });
    return formatter.format(now);
  }, [locale]);
  const widgets = useMemo(() => getWidgets(t, formattedDate, triggerToast), [formattedDate, t, triggerToast]);
  const localizedVision = useMemo(
    () =>
      visionSections.map((section) => ({
        id: section.id,
        title: section.title[locale],
        summary: section.summary?.[locale],
        items: section.items.map((item) => item[locale])
      })),
    [locale]
  );
  const localizedEnhancements = useMemo(
    () => visionEnhancements.map((item) => item[locale]),
    [locale]
  );
  const visionHeading =
    locale === "sk" ? "Štruktúra #somSTU pre appku aj web" : "#somSTU structure for app & web";
  const visionIntro =
    locale === "sk"
      ? "Rovnaké moduly a funkcie, aby mali používatelia rovnaký zážitok na mobile aj webe."
      : "Same modules and capabilities so the mobile and web experiences stay aligned.";

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const identity = {
    name: "Ales Melichar",
    university: "Slovak University of Technology",
    faculty: "Faculty of Materials Science and Technology",
    year: "Year 3"
  };
  const avatarInitial = identity.name?.trim()?.[0]?.toUpperCase() ?? "A";

  return (
    <>
      <Head>
        <title>STU Web</title>
      </Head>

      <main className={styles.page}>
        <div className={styles.shell}>
          {toast ? <div className={styles.toast}>{toast}</div> : null}

          <header className={styles.topBar}>
            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>{formattedDate}</p>
              <h1 className={styles.title}>{view === "profile" ? t("profileTitle") : t("greeting")}</h1>
              <p className={styles.subtitle}>
                {view === "profile" ? t("profileSubtitle") : t("homeSubtitle")}
              </p>
            </div>
            <div className={styles.topActions}>
              {view === "profile" ? (
                <button className={styles.pill} onClick={() => setView("home")} type="button">
                  {t("back")}
                </button>
              ) : (
                <span className={styles.pill}>{t("beta")}</span>
              )}
              <button className={styles.avatar} onClick={() => setView("profile")} aria-label="Open profile">
                {avatarInitial}
              </button>
            </div>
          </header>

          {view === "home" ? (
            <>
              <section className={styles.heroGrid}>
                <article className={`${styles.card} ${styles.heroCard}`}>
                  <div className={styles.heroHeaderRow}>
                    <span className={styles.heroBadge}>{t("dailyBadge")}</span>
                    <span className={styles.heroPill}>{t("homeHeroSecondary")}</span>
                  </div>
                  <div className={styles.heroContent}>
                    <div>
                      <h2 className={styles.heroTitle}>{t("homeHeroTitle")}</h2>
                      <p className={styles.heroText}>{t("homeHeroText")}</p>
                    </div>
                    <div className={styles.heroActions}>
                      <button className={styles.heroButton} type="button" onClick={() => triggerToast(t("homeHeroCta"))}>
                        {t("homeHeroCta")}
                      </button>
                      <div className={styles.heroAvatarRow}>
                        {heroAvatars.map((src) => (
                          <span key={src} className={styles.heroAvatar}>
                            <img src={src} alt="Student avatar" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>

                <article className={`${styles.card} ${styles.cardTight}`}>
                  <div className={styles.sectionHeading}>
                    <p className={styles.eyebrow}>{t("homeWidgetsHeader")}</p>
                    <h2 className={styles.cardTitle}>{t("widgetsTitle")}</h2>
                    <p className={styles.cardHint}>{t("widgetsSubtitle")}</p>
                  </div>
                  <div className={styles.widgetsGrid}>
                    {widgets.map((widget) => (
                      <WidgetCard key={widget.title} {...widget} />
                    ))}
                  </div>
                </article>
              </section>

              <section className={styles.visionSection}>
                <div className={styles.sectionHeaderRow}>
                  <div>
                    <p className={styles.eyebrow}>{locale === "sk" ? "Vízia produktu" : "Product vision"}</p>
                    <h2 className={styles.sectionTitle}>{visionHeading}</h2>
                    <p className={styles.sectionSubtitle}>{visionIntro}</p>
                  </div>
                </div>

                <div className={styles.visionGrid}>
                  {localizedVision.map((section) => (
                    <VisionCard
                      key={section.id}
                      title={section.title}
                      summary={section.summary}
                      items={section.items}
                    />
                  ))}
                </div>

                <div className={styles.cardTight + " " + styles.visionExtras}>
                  <p className={styles.sectionTitle}>
                    {locale === "sk" ? "Doplňujúce prvky" : "Cross-cutting enhancements"}
                  </p>
                  <p className={styles.sectionSubtitle}>
                    {locale === "sk"
                      ? "Čo by malo fungovať rovnako na oboch platformách."
                      : "Pieces that should behave the same on both platforms."}
                  </p>
                  <div className={styles.visionChips}>
                    {localizedEnhancements.map((item) => (
                      <span key={item} className={styles.visionChip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className={styles.profileGrid}>
              <article className={`${styles.card} ${styles.profileCard}`}>
                <p className={styles.badge}>{t("identity")}</p>
                <p className={styles.identityTag}>{t("identityTag")}</p>
                <div className={styles.identityRow}>
                  <div className={styles.avatarLarge}>{avatarInitial}</div>
                  <div className={styles.identityText}>
                    <p className={styles.name}>{identity.name}</p>
                    <p className={styles.meta}>{identity.university}</p>
                    <p className={styles.meta}>{identity.faculty}</p>
                    <p className={styles.meta}>{identity.year}</p>
                  </div>
                </div>
                <div className={styles.cardCta}>
                  <div>
                    <p className={styles.ctaTitle}>{t("digitalCardTitle")}</p>
                    <p className={styles.ctaMeta}>{t("digitalCardHint")}</p>
                  </div>
                  <button className={styles.primaryButton} type="button" onClick={() => triggerToast(t("digitalCardTitle"))}>
                    {t("digitalCardTitle")}
                  </button>
                </div>
                <div className={styles.quickStatsRow}>
                  <StatPill icon="🌟" label={t("statUpcoming")} />
                  <StatPill icon="✦" label={t("statSaved")} />
                </div>
              </article>

              <article className={`${styles.card} ${styles.infoCard}`}>
                <h3 className={styles.sectionTitle}>{t("myEvents")}</h3>
                <Row label={t("upcoming")} action={t("actionView")} icon="📅" color="#4a5bdc" onClick={() => triggerToast(t("upcoming"))} />
                <Row label={t("past")} action={t("actionView")} icon="⏱" color="#8c3cc6" onClick={() => triggerToast(t("past"))} />
                <Row label={t("booked")} action={t("actionManage")} icon="🎟" color="#b25b1c" last onClick={() => triggerToast(t("booked"))} />
                <p className={styles.emptyText}>{t("eventsEmpty")}</p>
              </article>

              <article className={`${styles.card} ${styles.infoCard}`}>
                <h3 className={styles.sectionTitle}>{t("bookings")}</h3>
                <Row label={t("tickets")} action={t("actionOpen")} icon="🔗" color="#971d32" onClick={() => triggerToast(t("tickets"))} />
                <Row label={t("reserved")} action={t("actionManage")} icon="🗒" color="#4a5bdc" last onClick={() => triggerToast(t("reserved"))} />
                <p className={styles.emptyText}>{t("bookingsEmpty")}</p>
              </article>

              <article className={`${styles.card} ${styles.infoCard}`}>
                <h3 className={styles.sectionTitle}>{t("saved")}</h3>
                <Row label={t("interested")} action={t("actionView")} icon="⭐" color="#8c3cc6" last onClick={() => triggerToast(t("interested"))} />
                <p className={styles.emptyText}>{t("savedEmpty")}</p>
              </article>

              <article className={`${styles.card} ${styles.infoCard}`}>
                <h3 className={styles.sectionTitle}>{t("notifications")}</h3>
                <p className={styles.sectionSubtitle}>{t("notifLead")}</p>
                <Row label={t("notifAnnouncements")} action={t("actionOn")} icon="🔔" color="#4a5bdc" onClick={() => triggerToast(t("notifAnnouncements"))} />
                <Row label={t("notifEvents")} action={t("actionOn")} icon="📆" color="#971d32" onClick={() => triggerToast(t("notifEvents"))} />
                <Row label={t("notifEmergency")} action={t("actionAlways")} icon="⚠️" color="#dc2626" tone="alert" last onClick={() => triggerToast(t("notifEmergency"))} />
              </article>

              <article className={`${styles.card} ${styles.infoCard}`}>
                <h3 className={styles.sectionTitle}>{t("settings")}</h3>
                <Row label={t("editProfile")} action={t("actionManage")} icon="👤" color="#971d32" onClick={() => triggerToast(t("editProfile"))} />
                <Row
                  label={t("language")}
                  action={locale === "en" ? t("languageEnglish") : t("languageSlovak")}
                  icon="🌐"
                  color="#4a5bdc"
                  tone="subtle"
                  onClick={() => {
                    setLocale((prev) => (prev === "en" ? "sk" : "en"));
                    triggerToast(locale === "en" ? t("languageSlovak") : t("languageEnglish"));
                  }}
                />
                <Row
                  label={t("darkMode")}
                  action={darkMode ? t("actionOn") : t("actionOff")}
                  icon="🌙"
                  color="#8c3cc6"
                  onClick={() => {
                    setDarkMode((prev) => !prev);
                    triggerToast(!darkMode ? t("actionOn") : t("actionOff"));
                  }}
                />
                <Row label={t("privacy")} action={t("actionManage")} icon="🛡" color="#6b7280" onClick={() => triggerToast(t("privacy"))} />
                <Row label={t("connections")} action={t("actionManage")} icon="🔗" color="#b25b1c" onClick={() => triggerToast(t("connections"))} />
                <Row label={t("logout")} action={t("logout")} icon="⏻" color="#dc2626" last onClick={() => triggerToast(t("logout"))} />
              </article>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
