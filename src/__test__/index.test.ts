import * as indexExports from "../index";

describe("index.ts exports", () => {
  it("should correctly re-export getGammaGradientString", () => {
    expect(indexExports.getGammaGradientString).toBeDefined();
  });

  it("should correctly re-export calculateGammaCorrectedGradientSteps", () => {
    expect(indexExports.calculateGammaCorrectedGradientSteps).toBeDefined();
  });

  it("should correctly re-export getHSLGradientString", () => {
    expect(indexExports.getHSLGradientString).toBeDefined();
  });

  it("should correctly re-export calculateHSLGradientSteps", () => {
    expect(indexExports.calculateHSLGradientSteps).toBeDefined();
  });
});
