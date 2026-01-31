import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function EventScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event details</Text>
      <Text style={styles.body}>
        Show the selected university event here. Add agenda, speakers, and registration links.
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
