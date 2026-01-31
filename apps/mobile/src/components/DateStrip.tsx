import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { colors, radius, spacing, typography } from "../theme";

type Props = {
  selectedDate: Date;
  onChange: (date: Date) => void;
};

// DST-safe: compare days using UTC midnight
const toUtcMidnight = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
const diffDays = (a: Date, b: Date) => Math.round((toUtcMidnight(a) - toUtcMidnight(b)) / 86400000);

const addDays = (date: Date, delta: number) => {
  // Use local date constructor (y,m,d) then add days to avoid time creeping
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + delta);
  return d;
};

const ITEM_WIDTH = 68;
const GAP = spacing(1);
const ITEM_FULL = ITEM_WIDTH + GAP;

const TOTAL_ITEMS = 4000;
const MID_INDEX = Math.floor(TOTAL_ITEMS / 2);

const SCREEN_W = Dimensions.get("window").width;
// Pad so the first item can sit centered; uses full item (width + gap)
const SIDE_PAD = (SCREEN_W - ITEM_FULL) / 2;

export default function DateStrip({ selectedDate, onChange }: Props) {
  const listRef = useRef<FlatList<number>>(null);

  // indices array should be stable (don’t recreate on every render)
  const data = useMemo(() => Array.from({ length: TOTAL_ITEMS }, (_, i) => i), []);

  const anchorDate = useMemo(() => {
    // Anchor is "today" at local day boundary
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  }, []);

  const clampIndex = useCallback((i: number) => Math.max(0, Math.min(TOTAL_ITEMS - 1, i)), []);

  const dateToIndex = useCallback(
    (date: Date) => clampIndex(MID_INDEX + diffDays(date, anchorDate)),
    [anchorDate, clampIndex]
  );

  const indexToDate = useCallback(
    (index: number) => addDays(anchorDate, index - MID_INDEX),
    [anchorDate]
  );

  const scrollToIndexCentered = useCallback(
    (index: number, animated: boolean) => {
      const safe = clampIndex(index);
      listRef.current?.scrollToIndex({
        index: safe,
        animated,
        viewPosition: 0.5
      });
    },
    [clampIndex]
  );

  // ✅ Auto-center on mount + whenever selectedDate changes from outside
  useEffect(() => {
    const idx = dateToIndex(selectedDate);
    // first time can be non-animated to avoid visible jump
    scrollToIndexCentered(idx, false);
  }, [dateToIndex, scrollToIndexCentered, selectedDate]);

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const raw = Math.round(x / ITEM_FULL);
      const index = clampIndex(raw);

      onChange(indexToDate(index));
    },
    [clampIndex, indexToDate, onChange]
  );

  const onPressDate = useCallback(
    (date: Date) => {
      const idx = dateToIndex(date);
      onChange(date);
      scrollToIndexCentered(idx, true);
    },
    [dateToIndex, onChange, scrollToIndexCentered]
  );

  const renderItem = useCallback(
    ({ item: index }: { item: number }) => {
      const date = indexToDate(index);
      const isActive = date.toDateString() === selectedDate.toDateString();
      const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.getDate();

      return (
        <Pressable
          onPress={() => onPressDate(date)}
          style={[
            styles.pill,
            isActive ? styles.pillActive : styles.pillInactive,
            { marginHorizontal: GAP / 2 }
          ]}
        >
          <View style={[styles.dot, isActive ? styles.dotActive : styles.dotInactive]} />
          <Text style={[styles.dayLabel, isActive && styles.dayLabelActive]}>{dayLabel}</Text>
          <Text style={[styles.dayNumber, isActive && styles.dayNumberActive]}>{dayNumber}</Text>
        </Pressable>
      );
    },
    [indexToDate, onPressDate, selectedDate]
  );

  return (
    <FlatList
      ref={listRef}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(i) => String(i)}
      contentContainerStyle={styles.content}
      getItemLayout={(_, index) => ({
        length: ITEM_FULL,
        offset: SIDE_PAD + ITEM_FULL * index,
        index
      })}
      snapToInterval={ITEM_FULL}
      snapToAlignment="center"
      decelerationRate="fast"
      onMomentumScrollEnd={handleMomentumEnd}
      onScrollToIndexFailed={(info) => {
        // ✅ Prevent "jump to end" when layout isn't ready
        // Retry after a frame using the best guess offset
        requestAnimationFrame(() => {
          listRef.current?.scrollToOffset({
            offset: Math.max(0, info.index * ITEM_FULL),
            animated: false
          });
          requestAnimationFrame(() => scrollToIndexCentered(info.index, false));
        });
      }}
      initialNumToRender={20}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SIDE_PAD
  },
  pill: {
    width: ITEM_WIDTH,
    paddingVertical: spacing(2),
    borderRadius: radius.lg * 1.1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  pillInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: spacing(1)
  },
  dotInactive: {
    backgroundColor: colors.border
  },
  dotActive: {
    backgroundColor: colors.surface
  },
  dayLabel: {
    ...typography.meta,
    fontWeight: "700" as const,
    color: colors.text
  },
  dayLabelActive: {
    color: colors.surface
  },
  dayNumber: {
    marginTop: spacing(0.5),
    ...typography.title,
    fontSize: 16,
    fontWeight: "800" as const,
    color: colors.text
  },
  dayNumberActive: {
    color: colors.surface
  }
});
