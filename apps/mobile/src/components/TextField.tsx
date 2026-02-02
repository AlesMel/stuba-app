import React, { forwardRef, useMemo } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { radius, spacing, useTheme } from "../theme";

const TextField = forwardRef<TextInput, TextInputProps>((props, ref) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TextInput
      ref={ref}
      placeholderTextColor={colors.muted}
      {...props}
      style={[styles.input, props.style]}
    />
  );
});

TextField.displayName = "TextField";

const createStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    input: {
      flex: 1,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing(3),
      paddingVertical: spacing(3),
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      fontSize: 16,
      color: colors.text
    }
  });

export default TextField;
