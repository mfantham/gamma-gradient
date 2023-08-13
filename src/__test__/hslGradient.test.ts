import Color from "color";
import {
  calculateHSLGradientSteps,
  getHSLGradientString,
} from "../hslGradient";

describe("calculateHSLGradientSteps function", () => {
  it("should interpolate between two colors in HSL space", () => {
    const gradientSteps = calculateHSLGradientSteps("#FF0000", "#00FF00");
    expect(gradientSteps[0]).toBe("hsl(0, 100%, 50%)");
    expect(gradientSteps[4]).toBe("hsl(120, 100%, 50%)");
    expect(gradientSteps[1]).toBe("hsl(30, 100%, 50%)");
    expect(gradientSteps[2]).toBe("hsl(60, 100%, 50%)");
    expect(gradientSteps[3]).toBe("hsl(90, 100%, 50%)");
  });

  it("should handle the reverse parameter", () => {
    const gradientSteps = calculateHSLGradientSteps(
      "#FF0000",
      "#00FF00",
      5,
      true
    );
    expect(gradientSteps[0]).toBe("hsl(0, 100%, 50%)");
    expect(gradientSteps[4]).toBe("hsl(120, 100%, 50%)");
    expect(gradientSteps[1]).toBe("hsl(300, 100%, 50%)");
    expect(gradientSteps[2]).toBe("hsl(240, 100%, 50%)");
    expect(gradientSteps[3]).toBe("hsl(180, 100%, 50%)");
  });

  it("should handle a custom number of steps", () => {
    const gradientSteps = calculateHSLGradientSteps("#FF0000", "#00FF00", 3);
    expect(gradientSteps[0]).toBe("hsl(0, 100%, 50%)");
    expect(gradientSteps[2]).toBe("hsl(120, 100%, 50%)");
    expect(gradientSteps[1]).toBe("hsl(60, 100%, 50%)");
  });

  it("should handle color instances as input", () => {
    const color1 = new Color("#FF0000");
    const color2 = new Color("#00FF00");
    const gradientSteps = calculateHSLGradientSteps(color1, color2);
    expect(gradientSteps[0]).toBe("hsl(0, 100%, 50%)");
    expect(gradientSteps[4]).toBe("hsl(120, 100%, 50%)");
    expect(gradientSteps[1]).toBe("hsl(30, 100%, 50%)");
    expect(gradientSteps[2]).toBe("hsl(60, 100%, 50%)");
    expect(gradientSteps[3]).toBe("hsl(90, 100%, 50%)");
  });

  it("should handle array-like color representation as input", () => {
    const gradientSteps = calculateHSLGradientSteps([255, 0, 0], [0, 255, 0]);
    expect(gradientSteps[0]).toBe("hsl(0, 100%, 50%)");
    expect(gradientSteps[4]).toBe("hsl(120, 100%, 50%)");
    expect(gradientSteps[1]).toBe("hsl(30, 100%, 50%)");
    expect(gradientSteps[2]).toBe("hsl(60, 100%, 50%)");
    expect(gradientSteps[3]).toBe("hsl(90, 100%, 50%)");
  });
});

describe("getHSLGradientString function", () => {
  it("should return a CSS gradient string for the HSL gradient between two colors", () => {
    const gradient = getHSLGradientString("#FF0000", "#00FF00");
    expect(gradient).toBe(
      "linear-gradient(hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%))"
    );
  });

  it("should incorporate the specified direction in the gradient string", () => {
    const gradient = getHSLGradientString("#FF0000", "#00FF00", "to right");
    expect(gradient).toBe(
      "linear-gradient(to right, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%))"
    );
  });

  it("should handle a different number of steps", () => {
    const gradient = getHSLGradientString("#FF0000", "#00FF00", "to right", 3);
    expect(gradient).toBe(
      "linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%))"
    );
  });

  it("should handle the reverse parameter", () => {
    const gradient = getHSLGradientString(
      "#FF0000",
      "#00FF00",
      "to right",
      5,
      true
    );
    expect(gradient).toBe(
      "linear-gradient(to right, hsl(0, 100%, 50%), hsl(300, 100%, 50%), hsl(240, 100%, 50%), hsl(180, 100%, 50%), hsl(120, 100%, 50%))"
    );
  });

  it("should handle color instances as input", () => {
    const color1 = new Color("#FF0000");
    const color2 = new Color("#00FF00");
    const gradient = getHSLGradientString(color1, color2);
    expect(gradient).toBe(
      "linear-gradient(hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%))"
    );
  });

  it("should handle array-like color representation as input", () => {
    const gradient = getHSLGradientString([255, 0, 0], [0, 255, 0]);
    expect(gradient).toBe(
      "linear-gradient(hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%))"
    );
  });
});
