import { getAcceptedFileRegex } from "./regex";

describe("regex", () => {
  it("should return a regex", () => {
    const accept = "image/*,video/*";
    const regex = getAcceptedFileRegex(accept);
    expect(regex).toBeInstanceOf(RegExp);
  });
  it("should return a regex that matches image files", () => {
    const accept = "image/*,video/*";
    const regex = getAcceptedFileRegex(accept);
    expect(regex.test("image.png")).toBe(false);
  });
  it("should return a regext that matches all files", () => {
    const accept = "*";
    const regex = getAcceptedFileRegex(accept);
    expect(regex.test("image.png")).toBe(true);
  });
});
