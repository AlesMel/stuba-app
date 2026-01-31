import { ReactNode } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius, shadows, spacing, typography } from "../theme";

type Props = {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
};

export default function InfoCard({ title, children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ marginTop: spacing(2) }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
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
