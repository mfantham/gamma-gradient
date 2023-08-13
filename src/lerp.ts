export const lerp = (v0: number, v1: number, t: number) => {
  // Handle edge cases
  if (t <= 0) return v0;
  if (t >= 1) return v1;
  // Do the linear interpolation
  return v0 * (1 - t) + v1 * t;
};

export const lerpArray = (a1: Array<number>, a2: Array<number>, t: number) => {
  const length = Math.min(a1.length, a2.length);
  const out = new Array(length);
  for (let i = 0; i < length; i++) {
    out[i] = lerp(a1[i], a2[i], t);
  }
  return out;
};
