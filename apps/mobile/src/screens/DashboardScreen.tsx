import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.muted}>
        Drop shortcuts or widgets here to mirror the grid tab in the new bottom menu.
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
  muted: {
    marginTop: spacing(2),
    color: colors.muted,
    ...typography.body
  }
});
