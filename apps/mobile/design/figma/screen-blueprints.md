# Mobile Screen Blueprints (Figma)

All specs below mirror current UI behavior from `apps/mobile/src/screens` and `apps/mobile/src/components`.

## 1) Home

Frame:
- `Home / Default`
- Size: `393 x 852`
- Fill: `color.background`

Layout:
1. Safe area top inset.
2. Sticky header container:
   - Horizontal padding: `16`
   - Bottom border: `1` with `color.border`
   - Child: `TopBar`
3. Content stack (vertical, gap `12`, padding horizontal `16`):
   - Language row:
     - Left label (body bold)
     - Two chips (EN/SK), active chip fill `color.primarySoft`, stroke `color.primary`
   - `DailyChallengeCard`
   - `DateStrip`
   - Section header:
     - Title: `heading`
     - Subtitle: `body`, color `color.textMuted`
   - Widgets row 1 (gap `8`):
     - `EventWidget` (`variant=full`)
     - `CantineMenuWidget` (`half`)
   - Widgets row 2 (gap `8`):
     - `VirtualCardWidget` (`half`)
     - `MoreWidget` (`half`)
4. Bottom anchored `BottomNav`.

## 2) Dashboard

Frame:
- `Dashboard / Default`
- Size: `393 x 852`
- Fill: `color.background`

Layout:
1. Padding all sides: `16`
2. Title: `heading`
3. Body paragraph below with top margin `8`, style `body`, color `color.textMuted`.
4. Bottom anchored `BottomNav`.

## 3) History

Frame:
- `History / Default`
- Size: `393 x 852`
- Fill: `color.background`

Layout:
1. Follow same shell as Dashboard.
2. Keep space for list/card content in center section.
3. Bottom anchored `BottomNav`.

## 4) Profile

Frame:
- `Profile / Default`
- Size: `393 x 852`
- Fill: `color.background`

Layout:
1. Scroll content stack with horizontal padding `16`, vertical gap `12`.
2. Identity hero card:
   - Surface fill `color.surface`, border radius `16`
   - Badge + tagline at top
   - Avatar left, identity text right
   - CTA section with `PrimaryButton`
   - Two quick stat pills
3. Repeated `InfoCard` sections:
   - My Events
   - Bookings
   - Saved
   - Notifications
   - Settings
4. In Settings card include:
   - Language selector
   - Dark mode switch row
   - Logout row (alert tone)
5. Bottom anchored `BottomNav`.

## 5) Event

Frame:
- `Event / Detail`
- Size: `393 x 852`

Layout:
1. Native stack header top.
2. Main content in cards/sections with `surface` containers.
3. Use `title`, `body`, and `meta` text styles consistently.

## 6) Cantine Menu

Frame:
- `CantineMenu / Detail`
- Size: `393 x 852`

Layout:
1. Native stack header top.
2. Date segmented control/filter near top.
3. List of food-item cards with `surface`, border `color.border`, radius `16`.

## 7) Virtual Card

Frame:
- `VirtualCard / Detail`
- Size: `393 x 852`

Layout:
1. Native stack header top.
2. Main digital card module centered.
3. Supporting rows below in `InfoCard` style.

## 8) More

Frame:
- `More / Detail`
- Size: `393 x 852`

Layout:
1. Native stack header top.
2. Sectioned menu list with icon + label + chevron rows.
3. Use `InfoCard` shells for grouped actions.

## Component Variants to Build in Figma

- `BottomNav`
  - States: default, tab active
- `PrimaryButton`
  - States: default, disabled
- `InfoCard`
  - Variants: with rows, with list text
- `WidgetCard`
  - Variants: event, cantine, virtual, more
  - Sizes: half, full
- `LanguageChip`
  - States: inactive, active
- `RowItem`
  - Variants: default, alert

## Naming Convention

- Frames: `Screen / State` (example: `Home / Default`)
- Components: `ComponentName / Variant / State`
- Text styles: `Type / Heading`, `Type / Title`, `Type / Body`, `Type / Meta`
- Colors: `Color / Primary`, `Color / Surface`, `Color / Text`
