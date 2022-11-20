export const customDataParser = (str: string) => {
  try {
    //
    return JSON.parse(str);
  } catch (err: any) {
    console.log(err);
    return err.message;
  }
};

export const getCustomData = (str: string) => {
  try {
  } catch (err: any) {
    //
  }
};
