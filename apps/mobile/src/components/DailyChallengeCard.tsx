import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { radius, shadows, spacing, useTheme } from "../theme";
import { useTranslation } from "../localization";

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
  title,
  subtitle,
  avatars = defaultAvatars
}: Props) {
  const { t } = useTranslation();
  const { colors, typography } = useTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);
  const heading = title ?? t("dailyChallengeTitle");
  const description = subtitle ?? t("dailyChallengeSubtitle");

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{heading}</Text>
        <Text style={styles.subtitle}>{description}</Text>

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

    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"], typography: ReturnType<typeof useTheme>["typography"]) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: colors.primary,
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
    }
  });
