import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      <Text style={styles.body}>
        Link to library, grades, timetable, parking, and other university services.
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
