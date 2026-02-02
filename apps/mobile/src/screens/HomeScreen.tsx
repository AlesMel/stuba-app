import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import DailyChallengeCard from "../components/DailyChallengeCard";
import { EventWidget, CantineMenuWidget, VirtualCardWidget, MoreWidget } from "../components/HomeScreenWidgets";
import DateStrip from "../components/DateStrip";
import { spacing, useTheme } from "../theme";
import { HomeStackParamList, RootTabParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Locale, useTranslation } from "../localization";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { colors, typography, isDark } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);
  const navigation = useNavigation<
    CompositeNavigationProp<
      NativeStackNavigationProp<HomeStackParamList>,
      BottomTabNavigationProp<RootTabParamList>
    >
  >();
  const { t, formatDate, locale, setLocale } = useTranslation();

  const todayLabel = useMemo(() => {
    const now = new Date();
    const dayMonth = formatDate(now, { day: "numeric", month: "short" });
    return t("todayLabel", { date: dayMonth });
  }, [formatDate, t]);

  const selectedLabel = useMemo(() => {
    return formatDate(selectedDate, { weekday: "long", month: "short", day: "numeric" });
  }, [formatDate, selectedDate]);

  const changeLocale = (next: Locale) => setLocale(next);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[0]}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.stickyHeader}>
          <TopBar userName="Aleš" dateLabel={todayLabel} onAvatarPress={() => navigation.navigate("Profile")} />
        </View>

        <View style={styles.langRow}>
          <Text style={styles.langLabel}>{t("languageLabel")}</Text>
          <View style={styles.langChips}>
            {([
              ["en", t("languageEnglish")],
              ["sk", t("languageSlovak")]
            ] as const).map(([code, label], index) => {
              const isActive = locale === code;
              return (
                <Pressable
                  key={code}
                  style={[
                    styles.langChip,
                    index > 0 && { marginLeft: spacing(1) },
                    isActive && styles.langChipActive
                  ]}
                  onPress={() => changeLocale(code as Locale)}
                >
                  <Text style={[styles.langChipText, isActive && styles.langChipTextActive]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <DailyChallengeCard />

        <View style={{ marginTop: spacing(1) }}>
          <DateStrip selectedDate={selectedDate} onChange={setSelectedDate} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.title}>{t("homeWidgetsTitle")}</Text>
          <Text style={styles.subtitle}>{t("homeWidgetsSubtitle")}</Text>
        </View>

        <View style={styles.widgetsRow}>
          <EventWidget variant="full" onPress={() => navigation.navigate("Event")} />
          <View style={{ width: spacing(2) }} />
          <CantineMenuWidget onPress={() => navigation.navigate("CantineMenu")} />
        </View>

        <View style={[styles.widgetsRow, { marginTop: spacing(2) }]}>
          <VirtualCardWidget onPress={() => navigation.navigate("VirtualCard")} />
          <View style={{ width: spacing(2) }} />
          <MoreWidget onPress={() => navigation.navigate("More")} />
        </View>
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
    scroll: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      paddingBottom: spacing(8),
      paddingHorizontal: spacing(4),
      gap: spacing(3)
    },
    stickyHeader: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing(4),
      marginHorizontal: -spacing(4), // let the header background span full width
      paddingTop: spacing(0.5),
      paddingBottom: spacing(1.5),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      zIndex: 1
    },
    title: {
      ...typography.heading
    },
    subtitle: {
      color: colors.muted,
      marginTop: spacing(1),
      ...typography.body
    },
    sectionHeader: {
      marginTop: spacing(1)
    },
    widgetsRow: {
      flexDirection: "row",
      alignItems: "stretch"
    },
    langRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing(2)
    },
    langLabel: {
      ...typography.body,
      fontWeight: "700"
    },
    langChips: {
      flexDirection: "row"
    },
    langChip: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(0.75),
      backgroundColor: colors.surface
    },
    langChipActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft
    },
    langChipText: {
      ...typography.meta,
      color: colors.text
    },
    langChipTextActive: {
      color: colors.primary,
      fontWeight: "700"
    },
    paragraph: {
      ...typography.body,
      color: colors.text
    },
    listItem: {
      ...typography.body,
      color: colors.text,
      marginTop: spacing(1)
    }
  });
