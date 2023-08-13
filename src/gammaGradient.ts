import Color from "color";
import { lerpArray } from "./lerp";
import { gradientArrayToString } from "./gradientArrayToString";

const DEFAULT_GAMMA = 2.2;
const DEFAULT_STEPS = 5;

type ColorParam =
  | Color
  | string
  | ArrayLike<number>
  | number
  | { [key: string]: any };

export const gammaCorrect = (
  value: ColorParam,
  gamma: number
): Array<number> => {
  const colorArray = Array.isArray(value) ? value : Color(value).array();
  const gammaCorrectedArray = colorArray.map((v) => v ** gamma);
  return gammaCorrectedArray;
};

export const calculateGammaCorrectedGradientSteps = (
  color1: ColorParam,
  color2: ColorParam,
  steps = DEFAULT_STEPS,
  gamma = DEFAULT_GAMMA
) => {
  // CSS specifies that gradients transition linearly in RGB space.
  // To make a gradient that transitions linearly in perceived brightness,
  // we need to gamma correct the gradient stops, then linearly interpolate, then undo gamma corrected colors.
  const gammaColor1 = gammaCorrect(color1, gamma);
  const gammaColor2 = gammaCorrect(color2, gamma);

  const gradientArray: Array<string> = [];
  for (let i = 0; i < steps; i++) {
    const rgbStep = lerpArray(gammaColor1, gammaColor2, i / (steps - 1));
    const gammaRemovedStep = gammaCorrect(rgbStep, 1 / gamma);
    gradientArray.push(new Color(gammaRemovedStep).hex());
  }

  return gradientArray;
};

export const getGammaGradientString = (
  color1: ColorParam,
  color2: ColorParam,
  direction = "",
  steps = DEFAULT_STEPS,
  gamma = DEFAULT_GAMMA
) => {
  const gradientArray = calculateGammaCorrectedGradientSteps(
    color1,
    color2,
    steps,
    gamma
  );

  const gradientString = gradientArrayToString(gradientArray, direction);
  return gradientString;
};
