import { Platform } from "react-native";

const primaryFont = Platform.select({
  ios: "Avenir Next",
  android: "sans-serif-medium",
  default: "System"
});

const displayFont = Platform.select({
  ios: "SF Pro Rounded",
  android: "sans-serif",
  default: "System"
});

export const colors = {
  background: "#f5f7fb",
  surface: "#ffffff",
  primary: "#111827",
  border: "#e5e7eb",
  text: "#111827",
  light_text: "#ffffffff",
  muted: "#6b7280",
  danger: "#dc2626",
  success: "#16a34a"
};

export const spacing = (multiplier: number) => 4 * multiplier;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16
};

export const typography = {
  heading: { fontSize: 22, fontWeight: "700" as const, fontFamily: primaryFont },
  title: { fontSize: 18, fontWeight: "700" as const, fontFamily: displayFont },
  body: { fontSize: 16, fontFamily: primaryFont },
  meta: { fontSize: 14, color: colors.muted, fontFamily: displayFont }
};

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  }
};
