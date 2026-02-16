# Figma Handoff for Mobile App

This folder contains design artifacts generated from the current React Native UI in `apps/mobile/src`.

## Files

- `variables.json`: Color, radius, spacing, shadow, and typography tokens for Figma Variables/Styles.
- `screen-blueprints.md`: Frame-by-frame layout specs for key mobile screens.

## Suggested Figma Setup

1. Create two variable collections:
   - `Color` with modes: `Light`, `Dark`
   - `Primitives` with mode: `Default`
2. Add values from `variables.json`.
3. Create text styles from `typography`.
4. Build the first page using `screen-blueprints.md` with an iPhone frame width of `393`.

## Base Frame

- Device frame: `393 x 852` (iPhone 15/16 size class)
- Content horizontal padding: `16`
- Vertical spacing unit: `4` (all spacing values are multiples of this unit)
