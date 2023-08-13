import Color from "color";
import { lerpArray } from "./lerp";
import { gradientArrayToString } from "./gradientArrayToString";

const XOR = (a: boolean, b: boolean) => (a ? !b : b);

const DEFAULT_STEPS = 5;

type ColorParam =
  | Color
  | string
  | ArrayLike<number>
  | number
  | { [key: string]: any };

export const calculateHSLGradientSteps = (
  color1: ColorParam,
  color2: ColorParam,
  steps = DEFAULT_STEPS,
  reverse = false
) => {
  // CSS specifies that gradients transition linearly in RGB space.
  // This function interpolates in HSL space instead.
  const hslColor1 = Color(color1).hsl().array();
  const hslColor2 = Color(color2).hsl().array();

  // Is the path shorter by crossing through hue=360?
  const reverseIsShorter = Math.abs(hslColor1[0] - hslColor2[0]) > 180;
  const internalReverse = XOR(reverse, reverseIsShorter);

  const gradientArray: Array<string> = [];
  for (let i = 0; i < steps; i++) {
    if (internalReverse) {
      const hue1IsBigger = hslColor1[0] > hslColor2[0];
      const shiftedHslColor1 = [
        hslColor1[0] + (hue1IsBigger ? 0 : 360),
        hslColor1[1],
        hslColor1[2],
      ];
      const shiftedHslColor2 = [
        hslColor2[0] + (hue1IsBigger ? 360 : 0),
        hslColor2[1],
        hslColor2[2],
      ];
      const hslStep = lerpArray(
        shiftedHslColor1,
        shiftedHslColor2,
        i / (steps - 1)
      );
      hslStep[0] = hslStep[0] % 360;
      gradientArray.push(Color.hsl(hslStep).toString());
    } else {
      const hslStep = lerpArray(hslColor1, hslColor2, i / (steps - 1));
      gradientArray.push(Color.hsl(hslStep).toString());
    }
  }

  return gradientArray;
};

export const getHSLGradientString = (
  color1: ColorParam,
  color2: ColorParam,
  direction = "",
  steps = DEFAULT_STEPS,
  reverse = false
) => {
  const gradientArray = calculateHSLGradientSteps(
    color1,
    color2,
    steps,
    reverse
  );

  const gradientString = gradientArrayToString(gradientArray, direction);
  return gradientString;
};
