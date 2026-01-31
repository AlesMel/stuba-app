import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCard from "../components/InfoCard";
import TopBar from "../components/TopBar";
import DailyChallengeCard from "../components/DailyChallengeCard";
import { EventWidget, CantineMenuWidget, VirtualCardWidget, MoreWidget } from "../components/HomeScreenWidgets";
import DateStrip from "../components/DateStrip";
import { colors, spacing, typography } from "../theme";
import { HomeStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const todayLabel = useMemo(() => {
    const now = new Date();
    const day = now.toLocaleDateString("en-US", { day: "numeric" });
    const month = now.toLocaleDateString("en-US", { month: "short" });
    return `Today ${day} ${month}`;
  }, []);

  const selectedLabel = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: spacing(8), gap: spacing(3) }}
        keyboardShouldPersistTaps="handled"
      >
        <TopBar userName="Sandra" dateLabel={todayLabel} />

        <DailyChallengeCard />

        <View style={{ marginTop: spacing(1) }}>
          <DateStrip selectedDate={selectedDate} onChange={setSelectedDate} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Home widgets</Text>
          <Text style={styles.subtitle}>Tap any card to open a dedicated screen.</Text>
        </View>

        <View style={styles.widgetsRow}>
          <EventWidget onPress={() => navigation.navigate("Event")} />
          <View style={{ width: spacing(2) }} />
          <CantineMenuWidget onPress={() => navigation.navigate("CantineMenu")} />
        </View>

        <View style={[styles.widgetsRow, { marginTop: spacing(2) }]}>
          <VirtualCardWidget onPress={() => navigation.navigate("VirtualCard")} />
          <View style={{ width: spacing(2) }} />
          <MoreWidget onPress={() => navigation.navigate("More")} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    padding: spacing(4)
  },
  title: {
    ...typography.heading
  },
  subtitle: {
    color: colors.muted,
    marginTop: spacing(1),
    ...typography.body
  },
  sectionHeader: {
    marginTop: spacing(1)
  },
  widgetsRow: {
    flexDirection: "row",
    alignItems: "stretch"
  },
  paragraph: {
    ...typography.body,
    color: colors.text
  },
  listItem: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing(1)
  }
});
