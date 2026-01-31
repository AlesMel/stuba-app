import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadows, spacing, typography } from "../theme";

type Props = {
  userName: string;
  avatarUrl?: string;
  onAvatarPress?: () => void;
  onSearchPress?: () => void;
  dateLabel?: string;
};

const formatToday = () => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { day: "numeric" });
  const month = now.toLocaleDateString("en-US", { month: "short" });
  return `Today ${day} ${month}`;
};

export default function TopBar({
  userName,
  avatarUrl,
  onAvatarPress,
  onSearchPress,
  dateLabel
}: Props) {
  const initials = userName?.[0]?.toUpperCase() ?? "?";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onAvatarPress}
        activeOpacity={0.8}
        style={[styles.avatar, !avatarUrl && styles.avatarFallback]}
      >
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarInitial}>{initials}</Text>
        )}
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.greeting} numberOfLines={1}>
          {`Hello, ${userName || "Guest"}`}
        </Text>
        <Text style={styles.date} numberOfLines={1}>
          {dateLabel ?? formatToday()}
        </Text>
      </View>

      <TouchableOpacity onPress={onSearchPress} style={styles.search} activeOpacity={0.8}>
        <Ionicons name="search" size={22} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing(4)
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: colors.surface,
    ...shadows.card,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  avatarFallback: {
    borderWidth: 1,
    borderColor: colors.border
  },
  avatarInitial: {
    ...typography.title
  },
  center: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing(2)
  },
  greeting: {
    ...typography.title,
    fontWeight: "700"
  },
  date: {
    ...typography.meta
  },
  search: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card
  }
});
