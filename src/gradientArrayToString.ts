export const gradientArrayToString = (
  gradientArray: Array<string>,
  direction = "",
  gradientType = "linear-gradient"
) => {
  return `${gradientType}(${
    direction ? `${direction}, ` : ""
  }${gradientArray.join(", ")})`;
};
