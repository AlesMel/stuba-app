import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { spacing, useTheme } from "../theme";
import { useTranslation } from "../localization";

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { colors, typography } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("screenDashboardTitle")}</Text>
      <Text style={styles.muted}>{t("screenDashboardBody")}</Text>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"], typography: ReturnType<typeof useTheme>["typography"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing(4)
    },
    title: {
      ...typography.heading
    },
    muted: {
      marginTop: spacing(2),
      color: colors.muted,
      ...typography.body
    }
  });
