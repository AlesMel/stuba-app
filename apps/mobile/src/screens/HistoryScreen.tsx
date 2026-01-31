import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.muted}>No items yet. Wire this up to stored queries later.</Text>
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
  muted: {
    marginTop: spacing(2),
    color: colors.muted,
    ...typography.body
  }
});
