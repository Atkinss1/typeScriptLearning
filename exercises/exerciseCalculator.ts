/*
Write a function calculateExercises that calculates the average time of daily exercise hours and compares it to the target amount of daily hours and returns an object that includes the following values:

the number of days
the number of training days
the original target value
the calculated average time
boolean value describing if the target was reached
a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
a text value explaining the rating, you can come up with the explanations

*/

export interface ExerciseMetrics {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export interface ExerciseArguments {
  daily_exercises: number[],
  target: number
}

export const parseCLExerciseArguments = function (args: string[]): ExerciseArguments {

  const dailyHoursString = args.slice(2, -1);
  const targetString = args[args.length - 1];
  
  const message = `You have provided ${args.length - 3} arguments in your Array of hours, exerciseCalculator requires you to report hours for 7 days of the week and your daily target.`;

  if (dailyHoursString.length !== 7) throw new Error(message);

  const daily_exercises = dailyHoursString.map(hours => {
    const parsedHours = Number(hours);
    if (isNaN(parsedHours)) {
      throw new Error(`${hours} is not a type Number. Please submit Numbers in the arguments.`);
    }
    return parsedHours;
  });

  const target = Number(targetString);

  if (isNaN(Number(target))) {
    throw new Error(`${targetString} is not a type Number. Please submit Numbers in the arguments.`);
  }

  return {
    daily_exercises,
    target
  };
};


export const calculateExercises = function (dailyHours: number[], targetDailyHours: number): ExerciseMetrics {
  
  const periodLength = dailyHours.length;
  let trainingDays = 0;
  let totalTrainingHours = 0;
  let success = false;
  let rating;
  let ratingDescription;
  const target = targetDailyHours;

  dailyHours.forEach((hours) => {
    if (hours !== 0) {
      trainingDays++;
      totalTrainingHours = totalTrainingHours + hours;
    }
  });

  const average = totalTrainingHours / dailyHours.length;

  if (average >= target) {
    success = true;
  }
  
  const score = average / target;

  switch (true) {
    case (score >= 0.9 && score <= 1.1):
      rating = 2;
      ratingDescription = 'Good but could be better!';
      break;
    case (score > 1.1):
      rating = 3;
      ratingDescription = 'Excellent work this week!';
      break;
    default:
      rating = 1;
      ratingDescription = 'You will do better next week!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};