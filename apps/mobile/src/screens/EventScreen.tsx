import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { spacing, useTheme } from "../theme";
import { useTranslation } from "../localization";

export default function EventScreen() {
  const { t } = useTranslation();
  const { colors, typography } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("screenEventTitle")}</Text>
      <Text style={styles.body}>{t("screenEventBody")}</Text>
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
    body: {
      marginTop: spacing(2),
      color: colors.text,
      ...typography.body
    }
  });
