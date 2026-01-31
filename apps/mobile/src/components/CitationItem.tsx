import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";

type Props = {
  title: string;
  snippet: string;
  score?: number;
};

export default function CitationItem({ title, snippet, score }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.snippet}>{snippet}</Text>
      {typeof score === "number" && <Text style={styles.meta}>Score: {score.toFixed(3)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing(2),
    padding: spacing(2.5),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#fafafa"
  },
  title: {
    ...typography.body,
    fontWeight: "700"
  },
  snippet: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing(1.5)
  },
  meta: {
    ...typography.meta,
    marginTop: spacing(1.5)
  }
});
