# Gamma Gradients

CSS gradients are lacklusture.

<img src="readme/css.svg" width="100%" height="50" alt="CSS gradients" />

Notice how transitioning from red to green leaves a dull greyish-brown color in the middle.

That's because these gradients are calculated using linear interpolation in the RGB space, leading to unnatural blending that doesn't model how colors blur in the real world.

This Gamma Gradients library provides two methods to produce vivid gradients in CSS.

**Gamma-Correction:** This method involves linear interpolation subsequent to gamma correction. The result is a gradient that aligns more closely with human visual perception in the real world.
<img src="readme/gamma.svg" width="100%" height="50" alt="Gamma-corrected gradients" />

**HSL-Correction**: By interpolating across the HSL color space, this method maintains richer hues than RGB interpolation.
<img src="readme/hsl.svg" width="100%" height="50" alt="HSL-interpolated gradients" />

## Installation

```bash
npm install gamma-gradients
```

or

```bash
yarn add gamma-gradients
```

## Usage

### Importing the Library

To start using the library, import the functions you need:

```typescript
import {
  getGammaGradientString,
  calculateGammaCorrectedGradientSteps,
  getHSLGradientString,
  calculateHSLGradientSteps,
} from "gamma-gradients";
```

### Gamma Corrected Gradient

Generate a gradient that transitions linearly in perceived brightness. This is achieved by gamma correcting the gradient stops, then linearly interpolating between them, and finally undoing the gamma correction.

#### Functions:

- `calculateGammaCorrectedGradientSteps(color1, color2, steps?, gamma?)`: Calculates the steps for a gamma-corrected gradient.
- `getGammaGradientString(color1, color2, direction?, steps?, gamma?)`: Generates a CSS gradient string for a gamma-corrected gradient.

Example:

```typescript
const gradient = getGammaGradientString("#FF0000", "#0000FF");
console.log(gradient);
```

<img src="readme/gamma-compare.svg" width="100%" height="100" alt="CSS vs gamma gradients" />

### HSL Gradient

Generate a gradient that transitions linearly in the HSL color space.

#### Functions:

- `calculateHSLGradientSteps(color1, color2, steps?, reverse?)`: Calculates the steps for an HSL gradient. The `reverse` parameter helps determine the shortest path of transition.
- `getHSLGradientString(color1, color2, direction?, steps?, reverse?)`: Generates a CSS gradient string for an HSL gradient.

Example:

```typescript
const hslGradient = getHSLGradientString("#FF0000", "#00FF00");
console.log(hslGradient);
```

<img src="readme/hsl-compare.svg" width="100%" height="100" alt="CSS vs HSL gradients" />

## Inspiration, maths, and playground

This library was inspried by a video from [Henry Reich at MinutePhysics](https://www.youtube.com/watch?v=LKnqECcg6Gw), which provides an explanation of gamma-corrected color blending.

Visit https://gradients.fnt.hm for a playground to explore the different parameters offered by these functions.

---

## Coming soon

1. Gradient corrections with more than 2 starting colors
2. SASS plugin

## Contributing

If you're interested in contributing, feel free to open a pull request or raise issues on the GitHub repository.

## License

This project is licensed under the MIT License.
