import React, { createContext, useContext, useMemo, useState } from "react";
import { Platform, useColorScheme } from "react-native";

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
 * These are the weights you'll actually use in a clean UI system.
 */
export const fontWeights = {
  regular: Platform.select({ ios: "400", android: "400", default: "400" }),
  medium: Platform.select({ ios: "500", android: "500", default: "500" }),
  semibold: Platform.select({ ios: "600", android: "600", default: "600" }),
  bold: Platform.select({ ios: "700", android: "700", default: "700" }),
  heavy: Platform.select({ ios: "800", android: "800", default: "800" }),
};

export const lightColors = {
  background: "#f9fafb",
  surface: "#ffffff",
  primary: "#971D32",
  primaryHover: "#7f182a",
  primarySoft: "#f7e9ec", // subtle tint for chips / highlights
  border: "#e5e7eb",
  text: "#111827",
  textMuted: "#6b7280",
  light_text: "#ffffffff",
  muted: "#6b7280",
  danger: "#dc2626",
  success: "#16a34a",
};

// Dark mode palette
export const darkColors = {
  background: "#0f0a0d", // warm near-black
  surface: "#1a1116",
  primary: "#b94b63", // lifted burgundy
  primaryHover: "#c76075",
  primarySoft: "#2d1a22",
  border: "#2a1c23",
  text: "#f5eef2",
  textMuted: "#c9aab6",
  light_text: "#f5eef2",
  muted: "#c9aab6",
  danger: "#dc2626",
  success: "#16a34a",
};

export type ColorPalette = typeof lightColors;

export const spacing = (multiplier: number) => 4 * multiplier;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const createTypography = (palette: ColorPalette) => ({
  // Big section headers (screens)
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.bold, // 700
    color: palette.text,
  },

  // Card titles / main labels
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.display,
    fontWeight: fontWeights.semibold, // 600 (cleaner than 700 for UI titles)
    color: palette.text,
  },

  // Subtitles / secondary headers
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.semibold, // 600
    color: palette.text,
  },

  // Normal content
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.regular, // 400
    color: palette.text,
  },

  // Emphasis within body (e.g., values, key phrases)
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.medium, // 500 (modern and readable)
    color: palette.text,
  },

  // Small metadata, timestamps, helper copy
  meta: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.regular, // 400
    color: palette.muted,
  },

  // Buttons / chips
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fontFamily.body,
    fontWeight: fontWeights.semibold, // 600 (feels "tap-target confident")
    color: palette.text,
  },
});

export type Typography = ReturnType<typeof createTypography>;
export type ThemeMode = "light" | "dark";

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
};

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: ColorPalette;
  typography: Typography;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Default (light) exports kept for compatibility with existing static styles
export const colors = lightColors;
export const typography = createTypography(lightColors);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === "dark" ? "dark" : "light");

  const palette = mode === "dark" ? darkColors : lightColors;
  const computedTypography = useMemo(() => createTypography(palette), [palette]);

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === "dark",
      colors: palette,
      typography: computedTypography,
      setMode,
      toggleMode: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [mode, palette, computedTypography]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
