import { Operation } from "../basics/calculator";

export const validateCalculatorArguments = function (a: number, b: number, op: Operation) {
  if (a === undefined || b === undefined || op === undefined) {
      throw new Error(`A parameter is undefined.`);
    }

    if (isNaN(Number(a)) || isNaN(Number(b))) {
      throw new Error(`A parameter is not a type Number.`);
    }
 };