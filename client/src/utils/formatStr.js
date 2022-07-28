export const formatRecipeName = (str) => {
  const lowerCaseStr = str.toLowerCase();
  const formatedStr = lowerCaseStr[0].toUpperCase() + lowerCaseStr.substring(1);
  return formatedStr;
}