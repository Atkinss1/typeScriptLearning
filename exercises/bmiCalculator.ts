// Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

// eg. console.log(calculateBmi(180, 74)) -> Normal (healthy weight)

export const calculateBmi = function (heightCm: number, weightKg: number): string {
  const heightM = heightCm / 100;
  const bmi = weightKg / heightM ** 2;

  let message: string;

  switch (true) {
    case (bmi < 18.5):
      message = 'Underweight';
      break;
    case (bmi >= 18.5 && bmi <= 24.9):
      message = 'Normal (healthy weight)';
      break;
    case (bmi >= 25 && bmi <= 29.9):
      message = 'Overweight';
      break;
    case (bmi >= 30 && bmi <= 34.9):
      message = 'Class 1 obesity';
      break;
    case (bmi >= 35 && bmi <= 39.9):
      message = 'Class 2 obesity';
      break;
    default:
      message = 'Class 3 obesity';
  }

  return message;
};

interface BmiValues {
  heightCm: number,
  weightKg: number
}

export const parseArgs = function (args: string[]): BmiValues {
  if (args.length != 2) throw new Error('bmiCalculator requires height and weight arguments.');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      heightCm: Number(args[0]),
      weightKg: Number(args[1])
    };
  } else {
    throw new Error('One or both arguments entered are not numbers.');
  }
};