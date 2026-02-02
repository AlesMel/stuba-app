import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { radius, spacing, useTheme } from "../theme";

type Props = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({ children, onPress, disabled, style }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, style]}
      activeOpacity={0.9}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing(3),
      paddingVertical: spacing(3),
      borderRadius: radius.md
    },
    text: {
      color: colors.light_text,
      fontWeight: "700",
      textAlign: "center"
    },
    disabled: {
      opacity: 0.55
    }
  });
