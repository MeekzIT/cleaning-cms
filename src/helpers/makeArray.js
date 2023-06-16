export const makeArray = (length) => {
    return new Array(length).fill(undefined).map((_, index) => index);
  };