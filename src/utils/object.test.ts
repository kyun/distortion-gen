import { getCustomData } from "./object";
// ignore prettier auto-formatting
// prettier-ignore
const validJSON = '{"result":{"items":[{"customData":"{ \\"distortions\\": [ { \\"type\\": 1 } ] }","drawType":"FACE_DISTORTION"}]}}';

describe("getCustomData", () => {
  test("Empty Object parsing", () => {
    expect(getCustomData(`{}`)).toEqual({});
  });
  test("Invalid object string parsing", () => {
    expect(getCustomData("{ /")).toEqual({});
  });
  test('Has no "result" key', () => {
    expect(getCustomData(`{"key": "value"}`)).toEqual({});
  });
  test('Has no "items" key', () => {
    expect(getCustomData(`{"result": {}}`)).toEqual({});
  });
  test('Has no "drawType" key', () => {
    expect(getCustomData(`{"result": {"items": []}}`)).toEqual({});
  });
  test('Has no "customData" key', () => {
    expect(
      getCustomData(`{"result": {"items": [{"drawType": "FACE_DISTORTION"}]}}`)
    ).toEqual({});
  });
  test("Valid object string parsing", () => {
    expect(getCustomData(validJSON)).toEqual({ distortions: [{ type: 1 }] });
  });
});
