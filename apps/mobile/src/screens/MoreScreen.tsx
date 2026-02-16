import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { spacing, useTheme } from "../theme";
import { useTranslation } from "../localization";
import { visionEnhancements, visionSections } from "../../shared/vision";

export default function MoreScreen() {
  const { locale } = useTranslation();
  const { colors, typography } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);

  const localizedSections = useMemo(
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

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {locale === "sk" ? "Štruktúra #somSTU pre appku aj web" : "#somSTU structure for app & web"}
      </Text>
      <Text style={styles.lead}>
        {locale === "sk"
          ? "Rovnaké moduly a funkcie na mobile aj webe, aby používatelia mali jednotný zážitok."
          : "Same modules and capabilities on mobile and web so users get a unified experience."}
      </Text>

      <View>
        {localizedSections.map((section, index) => (
          <View key={section.id} style={[styles.card, index > 0 && styles.cardSpacing]}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            {section.summary ? <Text style={styles.cardSummary}>{section.summary}</Text> : null}
            <View style={styles.bulletList}>
              {section.items.map((item) => (
                <Text key={item} style={styles.bulletItem}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{locale === "sk" ? "Doplňujúce prvky" : "Cross-cutting enhancements"}</Text>
        <Text style={styles.cardSummary}>
          {locale === "sk"
            ? "Veci, ktoré by mali fungovať rovnako na oboch platformách."
            : "Pieces that should behave the same on both platforms."}
        </Text>
        <View style={styles.bulletList}>
          {localizedEnhancements.map((item) => (
            <Text key={item} style={styles.bulletItem}>
              • {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"], typography: ReturnType<typeof useTheme>["typography"]) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: colors.background
    },
    container: {
      padding: spacing(4),
      paddingBottom: spacing(8),
      backgroundColor: colors.background,
      gap: spacing(3)
    },
    title: {
      ...typography.heading
    },
    lead: {
      marginTop: spacing(1),
      color: colors.muted,
      ...typography.body
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing(3),
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 1
    },
    cardSpacing: {
      marginTop: spacing(2)
    },
    cardTitle: {
      ...typography.title,
      marginBottom: spacing(1)
    },
    cardSummary: {
      ...typography.body,
      color: colors.muted,
      marginBottom: spacing(1)
    },
    bulletList: {
      marginTop: spacing(1)
    },
    bulletItem: {
      ...typography.body,
      color: colors.text,
      marginTop: spacing(0.5)
    }
  });
