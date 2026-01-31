import React from "react";
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius, shadows, spacing, typography } from "../theme";

type BaseProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

type EventWidgetProps = BaseProps & {
  badge?: string;
  title?: string;
  details?: string[];
};

type CantineWidgetProps = BaseProps & {
  badge?: string;
  title?: string;
  items?: string[];
};

type VirtualCardWidgetProps = BaseProps & {
  badge?: string;
  cardHolder?: string;
  cardId?: string;
  expires?: string;
};

type MoreWidgetProps = BaseProps & {
  badge?: string;
  links?: string[];
};

const heroImage =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=320&q=60";

const bullet = "\u2022";

export function EventWidget({
  badge = "Event",
  title = "AI Research Seminar",
  details = ["Tue 4 Feb - 14:00-15:30", "Room B201 - Faculty of Informatics"],
  onPress,
  style
}: EventWidgetProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        styles.softYellow,
        style,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.badgeRow}>
        <Text style={[styles.badge, { color: "#b25b1c" }]}>{badge}</Text>
        <View style={[styles.chip, { backgroundColor: "rgba(178,91,28,0.12)" }]}>
          <Text style={styles.chipText}>Upcoming</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      {details.map((line) => (
        <Text key={line} style={styles.detail}>
          {bullet} {line}
        </Text>
      ))}
      <View style={styles.footerRow}>
        <Text style={styles.linkText}>Open details</Text>
      </View>
    </Pressable>
  );
}

export function CantineMenuWidget({
  badge = "Cantine",
  title = "Today's Menu",
  items = ["Chicken bowl", "Veggie pasta", "Tomato soup"],
  onPress,
  style
}: CantineWidgetProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        styles.softBlue,
        style,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.badgeRow}>
        <Text style={[styles.badge, { color: "#4a5bdc" }]}>{badge}</Text>
        <View style={[styles.chip, { backgroundColor: "rgba(74,91,220,0.12)" }]}>
          <Text style={styles.chipText}>Today</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      {items.slice(0, 3).map((item) => (
        <Text key={item} style={styles.detail}>
          {bullet} {item}
        </Text>
      ))}
      <View style={[styles.footerRow, { marginTop: spacing(2) }]}>
        <Text style={styles.linkText}>See full menu</Text>
      </View>
    </Pressable>
  );
}

export function VirtualCardWidget({
  badge = "Student ID",
  cardHolder = "Sandra Novak",
  cardId = "ISIC - 23 456 789",
  expires = "Valid thru 09/27",
  onPress,
  style
}: VirtualCardWidgetProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        styles.softGray,
        style,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.badgeRow}>
        <Text style={[styles.badge, { color: colors.muted }]}>{badge}</Text>
        <View style={[styles.chip, { backgroundColor: "rgba(17,24,39,0.08)" }]}>
          <Text style={styles.chipText}>Tap to show</Text>
        </View>
      </View>
      <Text style={styles.title}>{cardHolder}</Text>
      <Text style={styles.detail}>{cardId}</Text>
      <Text style={styles.detail}>{expires}</Text>
      <View style={[styles.virtualCard, shadows.card]}>
        <View>
          <Text style={styles.cardLabel}>Campus Card</Text>
          <Text style={styles.cardNumber}>**** 1234</Text>
        </View>
        <Text style={styles.tapText}>Tap</Text>
      </View>
    </Pressable>
  );
}

export function MoreWidget({
  badge = "More",
  links = ["Library", "Grades", "Timetable", "Parking"],
  onPress,
  style
}: MoreWidgetProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        styles.softPink,
        style,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.badgeRow}>
        <Text style={[styles.badge, { color: "#8c3cc6" }]}>{badge}</Text>
        <View style={[styles.chip, { backgroundColor: "rgba(140,60,198,0.12)" }]}>
          <Text style={styles.chipText}>4 shortcuts</Text>
        </View>
      </View>
      <Text style={styles.title}>Quick links</Text>
      {links.slice(0, 4).map((link) => (
        <Text key={link} style={styles.detail}>
          {bullet} {link}
        </Text>
      ))}
      <View style={styles.moreRow}>
        <Text style={styles.linkText}>Open hub</Text>
        <Image source={{ uri: heroImage }} style={styles.thumb} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 170,
    borderRadius: radius.lg * 1.3,
    paddingHorizontal: spacing(3.5),
    paddingVertical: spacing(3.25),
    backgroundColor: colors.surface,
    overflow: "hidden",
    ...shadows.card
  },
  softYellow: {
    backgroundColor: "#fff8eb"
  },
  softBlue: {
    backgroundColor: "#f4f6ff"
  },
  softGray: {
    backgroundColor: "#f7f7f8"
  },
  softPink: {
    backgroundColor: "#fff5ff"
  },
  pressed: {
    opacity: 0.9
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badge: {
    ...typography.meta,
    fontWeight: "700",
    marginBottom: spacing(1)
  },
  chip: {
    paddingHorizontal: spacing(1.5),
    paddingVertical: spacing(0.5),
    borderRadius: radius.md
  },
  chipText: {
    ...typography.meta,
    fontWeight: "700",
    color: colors.text
  },
  title: {
    ...typography.title,
    fontSize: 20,
    marginBottom: spacing(1.25)
  },
  detail: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing(0.5),
    lineHeight: 20
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing(1.25)
  },
  linkText: {
    ...typography.body,
    fontWeight: "700",
    color: colors.primary
  },
  virtualCard: {
    marginTop: spacing(2),
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardLabel: {
    ...typography.meta,
    color: colors.surface
  },
  cardNumber: {
    ...typography.title,
    color: colors.surface,
    marginTop: spacing(0.5)
  },
  tapText: {
    ...typography.meta,
    color: colors.surface,
    fontWeight: "700"
  },
  moreRow: {
    marginTop: spacing(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    marginLeft: spacing(2)
  }
});
