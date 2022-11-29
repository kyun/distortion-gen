export const getAcceptedFileRegex = (accept: string): RegExp => {
  const regex = accept
    .split(",")
    .map((item) => item.trim())
    .map((item) => item.replace(".", ""))
    .map((item) => item.replace("*", ".*"))
    .join("|");
  return new RegExp(regex, "i");
};
