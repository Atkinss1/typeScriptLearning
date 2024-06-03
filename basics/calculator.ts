// Creating a type to define operations
export type Operation = 'multiply' | 'add' | 'divide' | 'subtract';

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'subtract':
      return a - b;
    default:
      throw new Error('Operation is not multiply, add, divide or subtract!');
  }
};
