export const customDataParser = (str: string) => {
  try {
    //
    return JSON.parse(str);
  } catch (err: any) {
    console.log(err);
    return err.message;
  }
};
