import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, shadows, spacing } from "../theme";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Dashboard: "apps-outline",
  History: "bar-chart-outline",
  Profile: "person-outline"
};

const ACTIVE_ICONS: Partial<Record<keyof typeof ICONS, keyof typeof Ionicons.glyphMap>> = {
  Home: "home",
  Dashboard: "apps",
  History: "bar-chart",
  Profile: "person"
};

export default function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.safe}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
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

          const iconName =
            (isFocused ? ACTIVE_ICONS[route.name as keyof typeof ICONS] : undefined) ??
            ICONS[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
              testID={descriptors[route.key].options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.item, isFocused && styles.itemActive]}
              activeOpacity={0.85}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={isFocused ? colors.primary : "#e5e7eb"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    paddingHorizontal: spacing(4)
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
    ...shadows.card
  }
});
