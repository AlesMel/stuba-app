import { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { colors, radius, spacing } from "../theme";

const TextField = forwardRef<TextInput, TextInputProps>((props, ref) => {
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

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(3),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16
  }
});

export default TextField;
