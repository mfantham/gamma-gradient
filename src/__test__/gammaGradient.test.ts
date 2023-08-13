import Color from "color";
import {
  gammaCorrect,
  calculateGammaCorrectedGradientSteps,
  getGammaGradientString,
} from "../gammaGradient";

describe("gammaCorrect function", () => {
  it("should return a gamma-corrected array for a given Color instance", () => {
    const color = Color("#FF0000"); // Red
    const corrected = gammaCorrect(color, 2.2);
    expect(corrected).toEqual([255 ** 2.2, 0, 0]);
  });

  it("should return a gamma-corrected array for a given string color representation", () => {
    const corrected = gammaCorrect("#00FF00", 2.2); // Green
    expect(corrected).toEqual([0, 255 ** 2.2, 0]);
  });

  it("should return a gamma-corrected array for a given array-like color representation", () => {
    const corrected = gammaCorrect([0, 0, 255], 2.2); // Blue
    expect(corrected).toEqual([0, 0, 255 ** 2.2]);
  });

  it("should handle different gamma values", () => {
    const corrected = gammaCorrect("#FF0000", 3); // Red with gamma 3
    expect(corrected).toEqual([255 ** 3, 0, 0]);
  });

  it("should handle the gamma inversion operation", () => {
    const color = Color("#FF0000"); // Red
    const corrected = gammaCorrect(color, 1 / 2.2); // Inversion
    expect(corrected).toEqual([255 ** (1 / 2.2), 0, 0]);
  });

  it("should handle an object with a custom structure", () => {
    const colorObject = { r: 255, g: 0, b: 0 };
    const corrected = gammaCorrect(colorObject, 2.2);
    expect(corrected).toEqual([255 ** 2.2, 0, 0]);
  });
});

const DEFAULT_STEPS = 5;

describe("calculateGammaCorrectedGradientSteps function", () => {
  it("should return an array of gamma-corrected gradient steps for two given colors", () => {
    const color1 = "#FF0000"; // Red
    const color2 = "#00FF00"; // Green
    const gradientSteps = calculateGammaCorrectedGradientSteps(color1, color2);
    expect(gradientSteps).toHaveLength(DEFAULT_STEPS);
    expect(gradientSteps[0]).toBe(color1); // Starting color
    expect(gradientSteps[DEFAULT_STEPS - 1]).toBe(color2); // Ending color

    // Placeholders for intermediate colors
    expect(gradientSteps[1]).toBe("#E08800");
    expect(gradientSteps[2]).toBe("#BABA00");
    expect(gradientSteps[3]).toBe("#88E000");
  });

  it("should return an array of gamma-corrected gradient steps for two given colors with custom steps", () => {
    const color1 = "#FF0000"; // Red
    const color2 = "#0000FF"; // Blue
    const customSteps = 3;
    const gradientSteps = calculateGammaCorrectedGradientSteps(
      color1,
      color2,
      customSteps
    );
    expect(gradientSteps).toHaveLength(customSteps);
    expect(gradientSteps[0]).toBe(color1); // Starting color
    expect(gradientSteps[customSteps - 1]).toBe(color2); // Ending color

    // Placeholder for the intermediate color
    expect(gradientSteps[1]).toBe("#BA00BA");
  });

  it("should handle different gamma values", () => {
    const color1 = "#FF0000"; // Red
    const color2 = "#0000FF"; // Blue
    const gradientSteps = calculateGammaCorrectedGradientSteps(
      color1,
      color2,
      DEFAULT_STEPS,
      3
    ); // Gamma value of 3
    expect(gradientSteps).toHaveLength(DEFAULT_STEPS);
    expect(gradientSteps[0]).toBe(color1); // Starting color
    expect(gradientSteps[DEFAULT_STEPS - 1]).toBe(color2); // Ending color

    // Placeholders for intermediate colors
    expect(gradientSteps[1]).toBe("#E800A1");
    expect(gradientSteps[2]).toBe("#CA00CA");
    expect(gradientSteps[3]).toBe("#A100E8");
  });

  it("should handle color instances as input", () => {
    const color1 = new Color("#FF0000"); // Red
    const color2 = new Color("#0000FF"); // Blue
    const gradientSteps = calculateGammaCorrectedGradientSteps(color1, color2);
    expect(gradientSteps).toHaveLength(DEFAULT_STEPS);
    expect(gradientSteps[0]).toBe(color1.hex()); // Starting color
    expect(gradientSteps[DEFAULT_STEPS - 1]).toBe(color2.hex()); // Ending color

    // Placeholders for intermediate colors
    expect(gradientSteps[1]).toBe("#E00088");
    expect(gradientSteps[2]).toBe("#BA00BA");
    expect(gradientSteps[3]).toBe("#8800E0");
  });

  it("should handle array-like color representation as input", () => {
    const color1 = [255, 0, 0]; // Red
    const color2 = [0, 0, 255]; // Blue
    const gradientSteps = calculateGammaCorrectedGradientSteps(color1, color2);
    expect(gradientSteps).toHaveLength(DEFAULT_STEPS);
    expect(gradientSteps[0]).toBe(new Color(color1).hex()); // Starting color
    expect(gradientSteps[DEFAULT_STEPS - 1]).toBe(new Color(color2).hex()); // Ending color

    // Placeholders for intermediate colors
    expect(gradientSteps[1]).toBe("#E00088");
    expect(gradientSteps[2]).toBe("#BA00BA");
    expect(gradientSteps[3]).toBe("#8800E0");
  });
});

describe("getGammaGradientString function", () => {
  it("should return a CSS gradient string for the gamma-corrected gradient between two colors", () => {
    const gradient = getGammaGradientString("#FF0000", "#0000FF");
    expect(gradient).toBe(
      "linear-gradient(#FF0000, #E00088, #BA00BA, #8800E0, #0000FF)"
    );
  });

  it("should incorporate the specified direction in the gradient string", () => {
    const gradient = getGammaGradientString("#FF0000", "#0000FF", "to right");
    expect(gradient).toBe(
      "linear-gradient(to right, #FF0000, #E00088, #BA00BA, #8800E0, #0000FF)"
    );
  });

  it("should handle a different number of steps", () => {
    const gradient = getGammaGradientString(
      "#FF0000",
      "#0000FF",
      "to right",
      3
    );
    expect(gradient).toBe(
      "linear-gradient(to right, #FF0000, #BA00BA, #0000FF)"
    );
  });

  it("should handle different gamma values", () => {
    const gradient = getGammaGradientString(
      "#FF0000",
      "#0000FF",
      "to right",
      5,
      3
    ); // Gamma value of 3
    expect(gradient).toBe(
      "linear-gradient(to right, #FF0000, #E800A1, #CA00CA, #A100E8, #0000FF)"
    );
  });

  it("should handle color instances as input", () => {
    const color1 = new Color("#FF0000");
    const color2 = new Color("#0000FF");
    const gradient = getGammaGradientString(color1, color2);
    expect(gradient).toBe(
      "linear-gradient(#FF0000, #E00088, #BA00BA, #8800E0, #0000FF)"
    );
  });

  it("should handle array-like color representation as input", () => {
    const gradient = getGammaGradientString([255, 0, 0], [0, 0, 255]);
    expect(gradient).toBe(
      "linear-gradient(#FF0000, #E00088, #BA00BA, #8800E0, #0000FF)"
    );
  });
});
