import { gradientArrayToString } from "../gradientArrayToString"; // Adjust the import path as required

describe("gradientArrayToString function", () => {
  it("should convert an array of color strings to a linear gradient string", () => {
    const gradient = gradientArrayToString(["#FF0000", "#00FF00"]);
    expect(gradient).toBe("linear-gradient(#FF0000, #00FF00)");
  });

  it("should handle the inclusion of a direction", () => {
    const gradient = gradientArrayToString(["#FF0000", "#00FF00"], "to right");
    expect(gradient).toBe("linear-gradient(to right, #FF0000, #00FF00)");
  });

  it("should handle a different gradient type", () => {
    const gradient = gradientArrayToString(
      ["#FF0000", "#00FF00"],
      "to right",
      "radial-gradient"
    );
    expect(gradient).toBe("radial-gradient(to right, #FF0000, #00FF00)");
  });

  it("should handle an empty direction but a custom gradient type", () => {
    const gradient = gradientArrayToString(
      ["#FF0000", "#00FF00"],
      "",
      "radial-gradient"
    );
    expect(gradient).toBe("radial-gradient(#FF0000, #00FF00)");
  });

  it("should handle an array of multiple color strings", () => {
    const gradient = gradientArrayToString(["#FF0000", "#FFFF00", "#00FF00"]);
    expect(gradient).toBe("linear-gradient(#FF0000, #FFFF00, #00FF00)");
  });
});
