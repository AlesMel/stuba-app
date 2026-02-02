import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { radius, shadows, spacing, useTheme } from "../theme";

type Props = {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
};

export default function InfoCard({ title, children, style }: Props) {
  const { colors, typography } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ marginTop: spacing(2) }}>{children}</View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"], typography: ReturnType<typeof useTheme>["typography"]) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing(3),
      ...shadows.card
    },
    title: {
      ...typography.title
    }
  });
