export const validateBmiArguments = function (height: number, weight: number) {

  if (height === undefined || weight === undefined) {
      throw new Error('malformatted parameters');
    }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('One or both arguments entered are not numbers.');
  }
};