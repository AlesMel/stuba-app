import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { radius, shadows, spacing, useTheme } from "../theme";
import { useTranslation } from "../localization";

type Props = {
  userName: string;
  avatarUrl?: string;
  onAvatarPress?: () => void;
  onSearchPress?: () => void;
  dateLabel?: string;
};

export default function TopBar({
  userName,
  avatarUrl,
  onAvatarPress,
  onSearchPress,
  dateLabel
}: Props) {
  const { t, formatDate } = useTranslation();
  const { colors, typography } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);
  const initials = userName?.[0]?.toUpperCase() ?? "?";
  const todayText = (() => {
    const now = new Date();
    const dayMonth = formatDate(now, { day: "numeric", month: "short" });
    return t("todayLabel", { date: dayMonth });
  })();
  const greeting = t("greeting", { name: userName || t("guest") });

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
          {greeting}
        </Text>
        <Text style={styles.date} numberOfLines={1}>
          {dateLabel ?? todayText}
        </Text>
      </View>

      <TouchableOpacity onPress={onSearchPress} style={styles.search} activeOpacity={0.8}>
        <Ionicons name="search" size={22} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"], typography: ReturnType<typeof useTheme>["typography"]) =>
  StyleSheet.create({
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
