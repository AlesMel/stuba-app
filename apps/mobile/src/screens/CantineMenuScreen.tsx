import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function CantineMenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cantine Menu</Text>
      <Text style={styles.body}>
        List today's meals, allergens, and prices. Hook this up to the campus menu feed.
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
