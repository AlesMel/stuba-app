import { Platform } from "react-native";

/**
 * Fully native font families
 * - iOS: SF Pro via "System" (built-in)
 * - iOS display: SF Pro Rounded (built-in on modern iOS)
 * - Android: Roboto via "sans-serif" families
 */
const fontFamily = {
  body: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: "System",
  }),
  display: Platform.select({
    ios: "SF Pro Rounded",
    android: "sans-serif", // keep native; use weight for emphasis
    default: "System",
  }),
};

/**
 * Weight scale (modern, minimal, predictable)
 * These are the weights you’ll actually use in a clean UI system.
 */
export const fontWeights = {
  regular: Platform.select({ ios: "400", android: "400", default: "400" }),
  medium: Platform.select({ ios: "500", android: "500", default: "500" }),
  semibold: Platform.select({ ios: "600", android: "600", default: "600" }),
  bold: Platform.select({ ios: "700", android: "700", default: "700" }),
  heavy: Platform.select({ ios: "800", android: "800", default: "800" }),
};

export const colors = {
  background: "#f9fafb",
  surface: "#ffffff",
  primary: "#971D32",
  primaryHover: "#7f182a",
  primarySoft: "#f7e9ec",  // subtle tint for chips / highlights
  border: "#e5e7eb",  
  text: "#111827",
  textMuted: "#6b7280",
  light_text: "#ffffffff",
  muted: "#6b7280",
  danger: "#dc2626",
  success: "#16a34a",
};

export const spacing = (multiplier: number) => 4 * multiplier;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const typography = {
  // Big section headers (screens)
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.bold, // 700
    color: colors.text,
  },

  // Card titles / main labels
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.display,
    fontWeight: fontWeights.semibold, // 600 (cleaner than 700 for UI titles)
    color: colors.text,
  },

  // Subtitles / secondary headers
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.semibold, // 600
    color: colors.text,
  },

  // Normal content
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.regular, // 400
    color: colors.text,
  },

  // Emphasis within body (e.g., values, key phrases)
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.medium, // 500 (modern and readable)
    color: colors.text,
  },

  // Small metadata, timestamps, helper copy
  meta: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.regular, // 400
    color: colors.muted,
  },

  // Buttons / chips
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.semibold, // 600 (feels “tap-target confident”)
    color: colors.text,
  },
};

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
};
