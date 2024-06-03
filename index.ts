import express, {Request, Response} from 'express';
const app = express();
import { calculateBmi } from './exercises/bmiCalculator';
import { calculator } from './basics/calculator';
import { calculateExercises, ExerciseArguments } from './exercises/exerciseCalculator';
import { parseExerciseArguments } from './helper functions/validateExerciseArguments';
import { validateCalculatorArguments } from './helper functions/validateCalculatorArguments';
import { validateBmiArguments } from './helper functions/validateBmiArguments';

// middleware for incoming json requests
app.use(express.json());


// interface for bmi GET request
interface BmiParams {
  height: string,
  weight: string
}

// interface for calculate POST request
interface CalculateRequestBody {
  value1: number,
  value2: number,
  op: 'multiply' | 'add' | 'divide' | 'subtract'
}

// generic interface to create a flexible and reusable interface. <T> is a placeholder that you can pass a new interface to such as <CalculateRequestBody> to define the type structure req.body is expecting.

interface TypedRequest<T> extends Request {
  body: T;
}

app.get('/ping', (_req, res) => { 
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request<BmiParams>, res: Response) => {
  try {
    const height = req.query.height;
    const weight = req.query.weight;

    validateBmiArguments(Number(height), Number(weight));
    
    const result = calculateBmi(Number(height), Number(weight));

    res.json({ result });

  } catch (error: unknown) {
    if (error instanceof Error) {
       res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occured' });
    }
  } 
});

app.post('/calculate', (req: TypedRequest<CalculateRequestBody>, res: Response) => {
  try {
    const { value1, value2, op } = req.body;

    validateCalculatorArguments(value1, value2, op);

    const result = calculator(Number(value1), Number(value2), op);
    
    res.status(200).send({ result });
  }
  catch (error: unknown) { 
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occured' });
    }
  }
});

app.post('/exercises', (req: TypedRequest<ExerciseArguments>, res: Response) => {
  const { daily_exercises, target } = req.body;
  try{
    
    parseExerciseArguments(daily_exercises, target);

    const result = calculateExercises(daily_exercises, target);
    
    res.status(200).send(result);

   } catch (error) {
     if (error instanceof Error) {
       res.status(400).json({ error: error.message });  
     } else {
       res.status(400).json({ error: 'Unknown error occured.' });
     }
  }
 });
  
  

const PORT = 3003;

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});