# Gamma Gradients

CSS gradients are lacklusture.

<img src="readme/css.svg" width="100%" height="50" alt="CSS gradients" />

Notice how transitioning from red to green leaves a dull greyish-brown color in the middle.

That's because these gradients are calculated using linear interpolation in the RGB space, leading to unnatural blending that doesn't model how colors blur in the real world.

This Gamma Gradients library provides two methods to produce vivid gradients in CSS.

<div style="display: flex; color: white">
  <div style="flex-grow: 1; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, #FF0000, #E08800, #BABA00, #88E000, #00FF00);">gamma correction</div>
  <div style="flex-grow: 1; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, #0000FF, #8800E0, #BA00BA, #E00088, #FF0000);">gamma correction</div>
</div>

**Gamma-Correction:** This method involves linear interpolation subsequent to gamma correction. The result is a gradient that aligns more closely with human visual perception in the real world.

<div style="display: flex; color: white">
  <div style="flex-grow: 1; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(24, 100%, 50%), hsl(48, 100%, 50%), hsl(72, 100%, 50%), hsl(96, 100%, 50%), hsl(120, 100%, 50%));">hsl correction</div>
  <div style="flex-grow: 1; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, rgb(0, 0, 255), rgb(102, 0, 255), rgb(204, 0, 255), rgb(255, 0, 204), rgb(255, 0, 102), rgb(255, 0, 0))">hsl correction</div>
</div>

**HSL-Correction**: By interpolating across the HSL color space, this method maintains richer hues than RGB interpolation.

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

<div style="width: 300px; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, red, blue); color: white">basic css linear-gradient</div>
<div style="width: 300px; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, rgb(255, 0, 0), rgb(224, 0, 136), rgb(186, 0, 186), rgb(136, 0, 224), rgb(0, 0, 255)); color: white">gamma correction default settings</div>

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

<div style="width: 300px; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, red, green); color: white">basic css linear-gradient</div>
<div style="width: 300px; height: 50px;  line-height: 50px; text-align: center;background: linear-gradient(to right, rgb(255, 0, 0), rgb(255, 102, 0), rgb(255, 204, 0), rgb(204, 255, 0), rgb(102, 255, 0), rgb(0, 255, 0)); color: white">hsl 6 steps</div>

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
