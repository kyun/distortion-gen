import { getCustomData } from "./object";

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
    expect(
      getCustomData(
        `{
  "result" : {
    "filterResourceName" : "light_natural.dat",
    "noFilterOnSticker" : true,
    "skinSmoothIntensity" : 100,
    "soundItems" : [ ],
    "sceneConfig" : {
      "usePerspective" : false
    },
    "stickerId" : 66458,
    "items" : [ {
      "tabIndex" : 0,
      "customData" : "{\n  \"distortions\": [\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"lefteye\",\n      \"scale\": 2,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 2.8,\n      \"radiusY\": 2.8\n    },\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"righteye\",\n      \"scale\": 2,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 2.8,\n      \"radiusY\": 2.8\n    },\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"mouth\",\n      \"scale\": -1.13,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0.04,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 6.42,\n      \"radiusY\": 6.42\n    },\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"nose\",\n      \"scale\": -2,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 1.38,\n      \"radiusY\": 1.38\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"brow\",\n      \"scale\": 0.1,\n      \"angle\": 90,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 4.42,\n      \"radiusY\": 4.42\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"rightcheek\",\n      \"scale\": 0.01,\n      \"angle\": 225,\n      \"offsetX\": 0,\n      \"offsetY\": 0.35,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 4,\n      \"radiusY\": 4\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"leftcheek\",\n      \"scale\": 0.01,\n      \"angle\": 315,\n      \"offsetX\": 0,\n      \"offsetY\": 0.35,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 4,\n      \"radiusY\": 4\n    },\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"lefteye\",\n      \"scale\": 3.5,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 1.04,\n      \"radiusY\": 1.04\n    },\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"righteye\",\n      \"scale\": 3.5,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 1.04,\n      \"radiusY\": 1.04\n    },\n    {\n      \"type\": \"bulge\",\n      \"faceAnchor\": \"mouth\",\n      \"scale\": 2.65,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": 0,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 2.55,\n      \"radiusY\": 2.55\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"leftcheek\",\n      \"scale\": 0.2,\n      \"angle\": 0,\n      \"offsetX\": 0,\n      \"offsetY\": -1,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 2.5,\n      \"radiusY\": 2.5\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"rightcheek\",\n      \"scale\": 0.2,\n      \"angle\": 180,\n      \"offsetX\": 0,\n      \"offsetY\": -1,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 2.5,\n      \"radiusY\": 2.5\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"jaw\",\n      \"scale\": 0.1,\n      \"angle\": 270,\n      \"offsetX\": 0,\n      \"offsetY\": -0.11,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 6.2,\n      \"radiusY\": 6.2\n    },\n    {\n      \"type\": \"shift\",\n      \"faceAnchor\": \"nose\",\n      \"scale\": 0.1,\n      \"angle\": 270,\n      \"offsetX\": 0,\n      \"offsetY\": -0.06,\n      \"min\": 0,\n      \"max\": 1,\n      \"radiusX\": 3,\n      \"radiusY\": 3\n    }\n  ]\n}",
      "drawType" : "FACE_DISTORTION",
      "id" : "1"
    }, {
      "tabIndex" : 0,
      "blendType" : "BLEND_MULTIPLY",
      "drawType" : "FACE_SKIN_EX",
      "resourceName" : "makeup_lip.png",
      "id" : "2"
    } ],
    "modifiedDate" : 9,
    "name" : "blackmood_final"
  }
}`
      )
    ).toEqual({ distortions: { key: "value" } });
  });
});
