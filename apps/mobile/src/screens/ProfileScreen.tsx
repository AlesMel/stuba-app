import React, { ReactNode, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import InfoCard from "../components/InfoCard";
import PrimaryButton from "../components/PrimaryButton";
import { radius, shadows, spacing, useTheme } from "../theme";
import { Locale, useTranslation } from "../localization";

const avatarUrl = "";

type RowProps = {
  label: string;
  detail?: string;
  action?: string;
  color?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconBg?: string;
  showChevron?: boolean;
  tone?: "alert" | "subtle";
  isLast?: boolean;
  rightContent?: ReactNode;
};

const accentBlue = "#4a5bdc";
const accentAmber = "#b25b1c";
const accentPurple = "#8c3cc6";
const accentRed = "#dc2626";
const accentGray = "#6b7280";

type StatProps = { icon: string; label: string; style?: ViewStyle };

export default function ProfileScreen() {
  const { t, locale, setLocale } = useTranslation();
  const { colors, typography, isDark, mode, setMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const identity = {
    name: "Ales Melichar",
    university: t("profileUniversity"),
    faculty: t("profileFaculty"),
    year: t("profileYear")
  };

  const avatarInitial = identity.name?.trim()?.[0]?.toUpperCase() ?? "?";
  const darkEnabled = mode === "dark";

  const Row = ({
    label,
    detail,
    action,
    color = colors.primary,
    iconName,
    iconBg,
    showChevron = true,
    tone,
    isLast,
    rightContent
  }: RowProps) => (
    <View
      style={[
        styles.row,
        tone === "alert" && styles.rowAlert,
        tone === "subtle" && styles.rowSubtle,
        isLast && styles.rowLast
      ]}
    >
      <View style={styles.rowLeft}>
        <View style={[styles.iconBubble, { backgroundColor: iconBg ?? colors.primarySoft }]}>
          {iconName ? (
            <Ionicons name={iconName} size={16} color={color} />
          ) : (
            <View style={[styles.dot, { backgroundColor: color }]} />
          )}
        </View>
        <View style={styles.rowTextGroup}>
          <Text style={styles.rowLabel}>{label}</Text>
          {detail ? <Text style={styles.rowMeta}>{detail}</Text> : null}
        </View>
      </View>
      <View style={styles.rowRight}>
        {rightContent ?? (action ? <Text style={[styles.rowAction, { color }]}>{action}</Text> : null)}
        {showChevron && !rightContent ? <Ionicons name="chevron-forward" size={16} color={colors.muted} /> : null}
      </View>
    </View>
  );

  const QuickStat = ({ icon, label, style }: StatProps) => (
    <View style={[styles.statPill, style]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statText}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: spacing(8), gap: spacing(3) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.identityCard}>
          <Text style={styles.badge}>{t("profileIdentityHeader")}</Text>
          <Text style={styles.identityTag}>{t("profileIdentityTagline")}</Text>

          <View style={styles.identityRow}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Text style={styles.avatarInitial}>{avatarInitial}</Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{identity.name}</Text>
              <Text style={styles.meta}>{identity.university}</Text>
              <Text style={styles.meta}>{identity.faculty}</Text>
              <Text style={styles.meta}>{identity.year}</Text>
            </View>
          </View>

          <View style={styles.cardCta}>
            <View style={{ flex: 1, marginRight: spacing(2) }}>
              <Text style={styles.ctaTitle}>{t("profileDigitalCardTitle")}</Text>
              <Text style={styles.ctaMeta}>{t("profileDigitalCardHint")}</Text>
            </View>
            <PrimaryButton onPress={() => {}} style={styles.ctaButton}>
              {t("profileViewStudentCard")}
            </PrimaryButton>
          </View>

          <View style={styles.quickStatsRow}>
            <QuickStat icon="🌟" label={t("profileStatUpcoming")} style={{ marginRight: spacing(2) }} />
            <QuickStat icon="★" label={t("profileStatSaved")} />
          </View>
        </View>

        <InfoCard title={t("profileMyEventsTitle")}>
          <Row
            label={t("profileEventsUpcoming")}
            action={t("profileActionView")}
            iconName="calendar-outline"
            iconBg="rgba(74,91,220,0.12)"
            color={accentBlue}
          />
          <Row
            label={t("profileEventsPast")}
            action={t("profileActionView")}
            iconName="time-outline"
            iconBg="rgba(140,60,198,0.12)"
            color={accentPurple}
          />
          <Row
            label={t("profileEventsBooked")}
            action={t("profileActionManage")}
            iconName="ticket-outline"
            iconBg="rgba(178,91,28,0.12)"
            color={accentAmber}
            isLast
          />
          <Text style={styles.emptyText}>{t("profileEmptyEvents")}</Text>
        </InfoCard>

        <InfoCard title={t("profileBookingsTitle")}>
          <Row
            label={t("profileBookingsTickets")}
            action={t("profileActionOpen")}
            iconName="qr-code-outline"
            iconBg={colors.primarySoft}
            color={colors.primary}
          />
          <Row
            label={t("profileBookingsReserved")}
            action={t("profileActionManage")}
            iconName="clipboard-outline"
            iconBg="rgba(74,91,220,0.12)"
            color={accentBlue}
            isLast
          />
          <Text style={styles.emptyText}>{t("profileEmptyBookings")}</Text>
        </InfoCard>

        <InfoCard title={t("profileSavedTitle")}>
          <Row
            label={t("profileSavedInterested")}
            action={t("profileActionView")}
            iconName="star-outline"
            iconBg="rgba(140,60,198,0.12)"
            color={accentPurple}
            isLast
          />
          <Text style={styles.emptyText}>{t("profileEmptySaved")}</Text>
        </InfoCard>

        <InfoCard title={t("profileNotificationsTitle")}>
          <Text style={styles.sectionLead}>{t("profileNotificationsLead")}</Text>
          <Row
            label={t("profileNotifImportantAnnouncements")}
            action={t("profileActionOn")}
            iconName="notifications-circle-outline"
            iconBg="rgba(74,91,220,0.12)"
            color={accentBlue}
          />
          <Row
            label={t("profileNotifEvents")}
            action={t("profileActionOn")}
            iconName="calendar-clear-outline"
            iconBg={colors.primarySoft}
            color={colors.primary}
          />
          <Row
            label={t("profileNotifEmergencies")}
            action={t("profileActionAlways")}
            iconName="warning-outline"
            iconBg="rgba(220,38,38,0.12)"
            color={accentRed}
            tone="alert"
            isLast
          />
        </InfoCard>

        <InfoCard title={t("profileSettingsTitle")}>
          <Row
            label={t("profileSettingsEditProfile")}
            action={t("profileActionEdit")}
            iconName="person-circle-outline"
            iconBg={colors.primarySoft}
            color={colors.primary}
          />

          <View style={styles.languageBlock}>
            <Pressable
              style={styles.select}
              onPress={() => setShowLanguageMenu((open) => !open)}
              accessibilityRole="button"
              accessibilityLabel={t("profileSettingsLanguage")}
            >
              <Text style={styles.selectLabel}>{t("profileSettingsLanguage")}</Text>
              <View style={styles.selectValue}>
                <Text style={styles.selectValueText}>
                  {locale === "en" ? t("languageEnglish") : t("languageSlovak")}
                </Text>
                <Ionicons
                  name={showLanguageMenu ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={colors.text}
                />
              </View>
            </Pressable>
            {showLanguageMenu ? (
              <View style={styles.menu}>
                {(["en", "sk"] as Locale[]).map((code) => {
                  const isActive = locale === code;
                  const label = code === "en" ? t("languageEnglish") : t("languageSlovak");
                  return (
                    <Pressable
                      key={code}
                      style={[styles.menuItem, isActive && styles.menuItemActive]}
                      onPress={() => {
                        setLocale(code);
                        setShowLanguageMenu(false);
                      }}
                    >
                      <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>{label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
          </View>

          <Row
            label={t("profileSettingsDarkMode")}
            action={darkEnabled ? t("profileActionOn") : t("profileActionOff")}
            iconName="moon-outline"
            iconBg="rgba(140,60,198,0.12)"
            color={accentPurple}
            showChevron={false}
            rightContent={
              <Switch
                value={darkEnabled}
                onValueChange={(value) => setMode(value ? "dark" : "light")}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.surface}
                ios_backgroundColor={colors.border}
              />
            }
          />

          <Row
            label={t("profileSettingsPrivacy")}
            action={t("profileActionManage")}
            iconName="shield-checkmark-outline"
            iconBg="rgba(107,114,128,0.12)"
            color={accentGray}
          />
          <Row
            label={t("profileSettingsConnections")}
            action={t("profileActionManage")}
            iconName="link-outline"
            iconBg="rgba(178,91,28,0.12)"
            color={accentAmber}
          />
          <Row
            label={t("profileSettingsLogout")}
            action={t("profileActionLogOut")}
            iconName="log-out-outline"
            iconBg="rgba(220,38,38,0.12)"
            color={accentRed}
            isLast
          />
        </InfoCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"], typography: ReturnType<typeof useTheme>["typography"]) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background
    },
    container: {
      flex: 1,
      padding: spacing(4)
    },
    identityCard: {
      backgroundColor: colors.surface,
      borderRadius: radius.lg * 1.2,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing(3),
      ...shadows.card
    },
    badge: {
      ...typography.meta,
      fontWeight: "700",
      color: colors.primary
    },
    identityTag: {
      ...typography.meta,
      color: colors.muted,
      marginTop: spacing(1)
    },
    identityRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing(2)
    },
    avatar: {
      width: 78,
      height: 78,
      borderRadius: 39,
      backgroundColor: colors.primarySoft,
      marginRight: spacing(3)
    },
    avatarFallback: {
      alignItems: "center",
      justifyContent: "center"
    },
    avatarInitial: {
      ...typography.heading,
      color: colors.primary
    },
    name: {
      ...typography.heading,
      fontSize: 24
    },
    meta: {
      ...typography.meta,
      color: colors.muted,
      marginTop: spacing(0.25)
    },
    cardCta: {
      marginTop: spacing(3),
      padding: spacing(2.5),
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.primarySoft,
      flexDirection: "row",
      alignItems: "center"
    },
    ctaTitle: {
      ...typography.title,
      fontSize: 16
    },
    ctaMeta: {
      ...typography.meta,
      color: colors.muted,
      marginTop: spacing(0.5)
    },
    ctaButton: {
      minWidth: 140
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing(1.25),
      borderBottomWidth: 1,
      borderColor: colors.border
    },
    rowAlert: {
      backgroundColor: "rgba(220,38,38,0.05)",
      borderColor: "rgba(220,38,38,0.25)"
    },
    rowSubtle: {
      backgroundColor: colors.primarySoft
    },
    rowLast: {
      borderBottomWidth: 0
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      paddingRight: spacing(2),
      minWidth: 0
    },
    rowTextGroup: {
      flex: 1,
      minWidth: 0
    },
    rowRight: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: spacing(2),
      gap: spacing(1.25),
      flexShrink: 0
    },
    iconBubble: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing(1.5)
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: spacing(2)
    },
    rowLabel: {
      ...typography.body,
      fontWeight: "600",
      flexShrink: 1,
      flexWrap: "wrap",
      marginRight: spacing(1)
    },
    rowMeta: {
      ...typography.meta,
      color: colors.muted,
      marginTop: spacing(0.25),
      flexShrink: 1,
      flexWrap: "wrap"
    },
    rowAction: {
      ...typography.meta,
      fontWeight: "700",
      color: colors.primary,
      textAlign: "right"
    },
    quickStatsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing(2),
      justifyContent: "space-between"
    },
    statPill: {
      flex: 1,
      minWidth: "48%",
      maxWidth: "48%",
      flexShrink: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingVertical: spacing(1.5),
      paddingHorizontal: spacing(2),
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      ...shadows.card
    },
    statIcon: {
      fontSize: 16,
      marginRight: spacing(1.25)
    },
    statText: {
      ...typography.body,
      fontWeight: "700",
      color: colors.primary,
      flexShrink: 1,
      textAlign: "left",
      lineHeight: 18
    },
    emptyText: {
      ...typography.meta,
      color: colors.muted,
      marginTop: spacing(1.25)
    },
    sectionLead: {
      ...typography.meta,
      color: colors.muted,
      marginBottom: spacing(1.5)
    },
    languageBlock: {
      marginTop: spacing(1),
      marginBottom: spacing(1)
    },
    select: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing(2.5),
      paddingVertical: spacing(2),
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      ...shadows.card
    },
    selectLabel: {
      ...typography.body,
      fontWeight: "600",
      color: colors.text
    },
    selectValue: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing(1)
    },
    selectValueText: {
      ...typography.meta,
      color: colors.text
    },
    menu: {
      marginTop: spacing(1),
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      overflow: "hidden",
      ...shadows.card
    },
    menuItem: {
      paddingHorizontal: spacing(2.5),
      paddingVertical: spacing(2)
    },
    menuItemActive: {
      backgroundColor: colors.primarySoft
    },
    menuItemText: {
      ...typography.body,
      color: colors.text
    },
    menuItemTextActive: {
      color: colors.primary,
      fontWeight: "700"
    }
  });
