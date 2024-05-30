// Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

// eg. console.log(calculateBmi(180, 74)) -> Normal (healthy weight)

const calculateBmi = function (heightCm: number, weightKg: number): string {
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
}

interface bmiValues {
  heightCm: number,
  weightKg: number
}

const parseArgs = function (args: string[]): bmiValues {
  if (args.length < 4) throw new Error('bmiCalculator requires height and weight arguments.');
  if (args.length > 4) throw new Error('Too many arguments. bmiCalculator requires only two arguments: height and weight.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3])
    }
  } else {
    throw new Error('One or both arguments entered are not numbers.');
  }
}

try {
  const { heightCm, weightKg } = parseArgs(process.argv);
  const results = calculateBmi(heightCm, weightKg);
  console.log(results);
} catch (error) {
  let errorMessage = 'Something went wrong..';
  if (error instanceof Error) {
    errorMessage += ': ' + error.message;
  }
  console.log(errorMessage);
}