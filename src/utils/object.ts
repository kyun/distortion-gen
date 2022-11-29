export const getCustomData = (obj: any) => {
  try {
    const { customData } = JSON.parse(obj)?.result?.items?.find((item: any) => {
      return item.drawType === "FACE_DISTORTION";
    });
    return JSON.parse(customData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
    }
    return {};
  }
};

export const myCustomData = (str: string) => {
  try {
    console.log(str);
    const parsed = JSON.parse(str);
    console.log(parsed);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
    }
    return {};
  }
};
