import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function VirtualCardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Student Card</Text>
      <Text style={styles.body}>
        Display QR / NFC info, card number, and quick actions for campus services.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
