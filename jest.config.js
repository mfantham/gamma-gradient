/** @type {import('ts-jest').JestConfigWithTsJest} */
/** @type {import('@types/color')} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: { esModuleInterop: true },
    },
  },
};
