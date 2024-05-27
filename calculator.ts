// Creating a type to define operations
type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

try { 
  console.log(calculator(2, 4, 'add'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  // using "instanceof" to narrow the type of error
  if (error instanceof Error) {
    // Here the type is narrowed and can refer to error.message
    errorMessage += error.message;
  }
  // outside of the if-statement we can no longer reference error.message
  console.log(errorMessage);
}