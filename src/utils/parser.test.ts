import { customDataParser } from "./parser";

test("Empty Object parsing", () => {
  expect(customDataParser(`{}`)).toEqual({});
});
