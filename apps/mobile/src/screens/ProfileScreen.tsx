import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.muted}>Connect account settings, avatars, and preferences here.</Text>
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
