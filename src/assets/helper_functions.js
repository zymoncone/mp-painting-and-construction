export const isMobileDevice = () => {
  console.log("checking if mobile device");
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};