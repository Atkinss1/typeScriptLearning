export const parseExerciseArguments = function (daily_exercises: number[], target: number) {
  
  const message = `You have provided ${daily_exercises.length} arguments in your Array of hours, exerciseCalculator requires you to report hours for 7 days of the week and your daily target.`;

  if (daily_exercises.length !== 7) throw new Error(message);

  for (const hours of daily_exercises) {
    if (isNaN(hours)) {
      throw new Error(`${hours} is not a type Number. Please submit Numbers in the arguments.`);
    }
  }

  const targetHours = Number(target);

  if (isNaN(Number(targetHours))) {
    throw new Error(`${target} is not a type Number. Please submit Numbers in the arguments.`);
  }
};