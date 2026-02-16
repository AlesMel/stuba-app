# Apply Checklist for Figma File

Target file:
- `https://www.figma.com/design/zwZo2kRBuxDL3gmElq4llI/Untitled`

## 1. Import Tokens

1. Open Figma plugin `Tokens Studio for Figma`.
2. In Tokens Studio, create a new local set named `global`.
3. Import JSON from `apps/mobile/design/figma/tokens-studio.json`.
4. Create two themes (or modes):
   - `Light`
   - `Dark`
5. Map color mode usage:
   - Light uses all `.light` values
   - Dark uses all `.dark` values

## 2. Create Base Frames

1. Create page `Mobile`.
2. Add frames (393x852):
   - `Home / Default`
   - `Dashboard / Default`
   - `History / Default`
   - `Profile / Default`
   - `Event / Detail`
   - `CantineMenu / Detail`
   - `VirtualCard / Detail`
   - `More / Detail`

## 3. Build Core Components

1. `BottomNav / Default`
   - Bar radius `24`
   - Item size `46`
   - Icon size `22`
2. `PrimaryButton / Default`
   - Height `48`
   - Radius `12`
3. `InfoCard / Default`
   - Radius `16`, border `1`
4. `WidgetCard`
   - Variants: `event`, `cantine`, `virtual`, `more`
   - Sizes: `half`, `full`
5. `LanguageChip`
   - States: `inactive`, `active`

## 4. Lay Out Screens

Use `apps/mobile/design/figma/screen-blueprints.md` for exact structure and spacing.

## 5. Verify Against Code

Reference implementation:
- `apps/mobile/src/theme.tsx`
- `apps/mobile/src/screens/HomeScreen.tsx`
- `apps/mobile/src/components/BottomNav.tsx`
- `apps/mobile/src/components/HomeScreenWidgets.tsx`
- `apps/mobile/src/screens/ProfileScreen.tsx`
