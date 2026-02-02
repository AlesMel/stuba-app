import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, shadows, spacing, useTheme } from "../theme";
import { RootTabParamList } from "../navigation/types";

const ICONS: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Dashboard: "calendar-outline",
  History: "card-outline",
  Profile: "person-outline"
};

const ACTIVE_ICONS: Partial<Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap>> = {
  Home: "home",
  Dashboard: "calendar",
  History: "card",
  Profile: "person"
};

export default function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safe}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const routeName = route.name as keyof RootTabParamList;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            });
          };

          const iconName = (isFocused ? ACTIVE_ICONS[routeName] : undefined) ?? ICONS[routeName];
          const iconColor = isFocused ? colors.primary : colors.surface;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.item, isFocused && styles.itemActive]}
              activeOpacity={0.85}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={iconColor}
              />
              {isFocused ? <View style={styles.activeDot} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    safe: {
      paddingHorizontal: spacing(4),
      backgroundColor: colors.background
    },
    bar: {
      backgroundColor: colors.primary,
      borderRadius: radius.lg * 1.5,
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(1.5),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...shadows.card
    },
    item: {
      width: 46,
      height: 46,
      borderRadius: 46 / 2,
      alignItems: "center",
      justifyContent: "center"
    },
    itemActive: {
      backgroundColor: colors.surface,
      ...shadows.card,
      borderWidth: 1,
      borderColor: colors.surface
    },
    activeDot: {
      position: "absolute",
      bottom: spacing(0.75),
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary
    }
  });
