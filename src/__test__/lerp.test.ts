import { lerp, lerpArray } from "../lerp";

describe("lerp function", () => {
  it("should return v0 when t is 0 or less", () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, -1)).toBe(0);
  });

  it("should return v1 when t is 1 or more", () => {
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(0, 100, 2)).toBe(100);
  });

  it("should interpolate correctly for values of t between 0 and 1", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 110, 0.5)).toBe(60);
    expect(lerp(0, 10, 0.25)).toBe(2.5);
  });
});

describe("lerpArray function", () => {
  it("should interpolate each corresponding element from the input arrays", () => {
    expect(lerpArray([0, 10, 20], [100, 110, 120], 0.5)).toEqual([50, 60, 70]);
  });

  it("should handle arrays of different lengths, basing output on shortest array", () => {
    expect(lerpArray([0, 10, 20], [100, 110], 0.5)).toEqual([50, 60]);
    expect(lerpArray([0, 10], [100, 110, 120], 0.5)).toEqual([50, 60]);
  });

  it("should handle edge cases of t just like lerp does", () => {
    expect(lerpArray([0, 10], [100, 110], 0)).toEqual([0, 10]);
    expect(lerpArray([0, 10], [100, 110], 1)).toEqual([100, 110]);
  });

  it("should return an empty array if both input arrays are empty", () => {
    expect(lerpArray([], [], 0.5)).toEqual([]);
  });
});
