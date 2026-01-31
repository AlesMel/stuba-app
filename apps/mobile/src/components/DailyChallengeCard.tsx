import { Image, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadows, spacing, typography } from "../theme";

type Avatar = { uri: string };

type Props = {
  title?: string;
  subtitle?: string;
  avatars?: Avatar[];
};

const defaultAvatars: Avatar[] = [
  { uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60" },
  { uri: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=200&q=60" },
  { uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60" }
];

export default function DailyChallengeCard({
  title = "Daily challenge",
  subtitle = "Do your plan before 09:00 AM",
  avatars = defaultAvatars
}: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.avatarRow}>
          {avatars.slice(0, 3).map((avatar, index) => (
            <View key={avatar.uri} style={[styles.avatarWrap, { marginLeft: index === 0 ? 0 : -10 }]}>
              <Image source={{ uri: avatar.uri }} style={styles.avatar} />
            </View>
          ))}
          {avatars.length > 3 && (
            <View style={[styles.avatarWrap, styles.more]}>
              <Text style={styles.moreText}>{`+${avatars.length - 3}`}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.shapes}>
        <View style={[styles.shape, styles.shapeDark]} />
        <View style={[styles.shape, styles.shapeMid]} />
        <View style={[styles.shape, styles.shapeLight]} />
        <View style={[styles.shape, styles.shapeAccent]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#971D32",
    borderRadius: radius.lg * 1.1,
    padding: spacing(3),
    overflow: "hidden",
    alignItems: "center",
    ...shadows.card
  },
  title: {
    ...typography.title,
    fontSize: 22,
    fontWeight: "800" as const,
    color: colors.light_text
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing(1.5),
    color: colors.light_text
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing(3)
  },
  avatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#d2c4ff",
    overflow: "hidden",
    backgroundColor: colors.surface,
    ...shadows.card
  },
  avatar: {
    width: "100%",
    height: "100%"
  },
  more: {
    backgroundColor: "#f4f3ff",
    alignItems: "center",
    justifyContent: "center"
  },
  moreText: {
    ...typography.meta,
    fontWeight: "700",
    color: colors.text
  },
  shapes: {
    width: 110,
    height: 110,
    position: "relative",
    marginLeft: spacing(2),
    justifyContent: "center",
    alignItems: "center"
  },
  shape: {
    position: "absolute",
    borderRadius: 18,
    opacity: 0.9
  },
  shapeDark: {
    width: 60,
    height: 60,
    backgroundColor: "#2f2f3a",
    transform: [{ rotate: "14deg" }],
    top: 10,
    right: 4
  },
  shapeMid: {
    width: 50,
    height: 50,
    backgroundColor: "#6e6b88",
    transform: [{ rotate: "-10deg" }],
    top: 30,
    left: 4
  },
  shapeLight: {
    width: 32,
    height: 32,
    backgroundColor: "#f8d86b",
    borderRadius: 12,
    top: 20,
    left: 40
  },
  shapeAccent: {
    width: 26,
    height: 26,
    backgroundColor: "#f6f2ff",
    borderRadius: 10,
    top: 70,
    right: 10
  }
});
