import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';

// Define the interface for positions
export interface Positions {
  [id: string]: number;
}

// Retrieve the width of the window
const { width } = Dimensions.get('window');

// Define constants for margin, size, and column count
export const MARGIN = 20;
export const SIZE = width / 2 - MARGIN;
export const COL = 2;

// Define animation configuration
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

// Define function to calculate position based on index
export const getPosition = (position: number) => {
  "worklet";
  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * SIZE,
  };
};

// Define function to calculate order based on translation
export const getOrder = (tx: number, ty: number, max: number) => {
  "worklet";
  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};
