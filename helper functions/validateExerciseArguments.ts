export const parseExerciseArguments = function (daily_exercises: number[], target: number) {
  
  const message = `You have provided ${daily_exercises.length} arguments in your Array of hours, exerciseCalculator requires you to report hours for 7 days of the week and your daily target.`;

  if (daily_exercises.length !== 7) throw new Error(message);

  daily_exercises.forEach((day, index) => {
    if (typeof (day) !== 'number') {
      throw new Error(`${day} is not a type Number at index ${index}. Please submit Numbers in the arguments.`);
    }
  });

  if (isNaN(Number(target))) {
    throw new Error(`${target} is not a type Number. Please submit Numbers in the arguments.`);
  }
};