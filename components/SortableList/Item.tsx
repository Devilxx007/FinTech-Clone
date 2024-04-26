import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useAnimatedReaction,
  withSpring,
  withTiming,
  scrollTo,
  useSharedValue,
  runOnJS,
  SharedValue,
  AnimatedRef,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  animationConfig,
  COL,
  getOrder,
  getPosition,
  Positions,
  SIZE,
} from './Config';

interface ItemProps {
  children: ReactNode;
  positions: SharedValue<Positions>;
  id: string;
  editing: boolean;
  onDragEnd: (diffs: Positions) => void;
  scrollView: AnimatedRef<Animated.ScrollView>;
  scrollY: SharedValue<number>;
}

const Item = ({
  children,
  positions,
  id,
  onDragEnd,
  scrollView,
  scrollY,
  editing,
}: ItemProps) => {
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get('window').height;
  const containerHeight = windowHeight - insets.top - insets.bottom;

  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const isGestureActive = useSharedValue(false);

  const initialPosition = getPosition(positions.value[id]);
  const translateX = useSharedValue(initialPosition.x);
  const translateY = useSharedValue(initialPosition.y);

  useAnimatedReaction(
    () => positions.value[id],
    (newPosition) => {
      if (!isGestureActive.value) {
        const pos = getPosition(newPosition);
        translateX.value = withTiming(pos.x, animationConfig);
        translateY.value = withTiming(pos.y, animationConfig);
      }
    }
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart: (_, ctx) => {
      if (editing) {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
        isGestureActive.value = true;
      }
    },
    onActive: ({ translationX, translationY }, ctx) => {
      if (editing) {
        translateX.value = ctx.startX + translationX;
        translateY.value = ctx.startY + translationY;

        const newOrder = getOrder(
          translateX.value,
          translateY.value,
          Object.keys(positions.value).length
        );

        const currentOrder = positions.value[id];
        if (newOrder !== currentOrder) {
          const keyToSwap = Object.keys(positions.value).find(
            (key) => positions.value[key] === newOrder
          );
          if (keyToSwap) {
            const newPositions = { ...positions.value };
            newPositions[id] = newOrder;
            newPositions[keyToSwap] = currentOrder;
            positions.value = newPositions;
          }
        }

        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight - SIZE;
        const maxScroll = contentHeight - containerHeight;

        if (translateY.value < lowerBound) {
          const diff = Math.min(lowerBound - translateY.value, lowerBound);
          scrollY.value -= diff;
          scrollTo(scrollView, 0, scrollY.value, false);
          ctx.startY -= diff;
          translateY.value = ctx.startY + translationY;
        }

        if (translateY.value > upperBound) {
          const diff = Math.min(translateY.value - upperBound, maxScroll - lowerBound);
          scrollY.value += diff;
          scrollTo(scrollView, 0, scrollY.value, false);
          ctx.startY += diff;
          translateY.value = ctx.startY + translationY;
        }
      }
    },
    onEnd: () => {
      const pos = getPosition(positions.value[id]);
      translateX.value = withTiming(pos.x, animationConfig, () => {
        isGestureActive.value = false;
        runOnJS(onDragEnd)(positions.value);
      });
      translateY.value = withTiming(pos.y, animationConfig);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = withSpring(isGestureActive.value ? 1.05 : 1);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      zIndex,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler
        enabled={editing}
        onGestureEvent={onGestureEvent}
      >
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
