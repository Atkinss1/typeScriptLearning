import express, {Request, Response} from 'express';
const app = express();
import { calculateBmi, parseArgs } from './exercises/bmiCalculator';
import { calculator } from './basics/calculator';

app.use(express.json());

interface BmiResults {
  weight: number,
  height: number,
  bmi: string
}

interface BmiParams {
  height: string,
  weight: string
}

interface CalculateRequestBody {
  value1: number,
  value2: number,
  op: 'multiply' | 'add' | 'divide' | 'subtract'
}

// generic interface to create a flexible and reusable interface. <T> is a placeholder that you can pass a new interface to such as <CalculateRequestBody> to define the type structure body is expecting.

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
    const height = req.query.height as string;
    const weight = req.query.weight as string;
    
    if (height === undefined || weight === undefined) {
      throw new Error('malformatted parameters');
    }

    const {heightCm, weightKg} = parseArgs([height, weight]);
    const result = calculateBmi(heightCm, weightKg);
    const response: BmiResults = {
      weight: Number(weight),
      height: Number(height),
      bmi: result
    };

    res.json(response);

  } catch (error: unknown) {
    if (error instanceof Error) {
       res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occured' });
    }
  } 
});

app.post('/calculate', (req: TypedRequest<CalculateRequestBody>, res: Response) => {
  
  const { value1, value2, op } = req.body;

  if (value1 === undefined || value2 === undefined || op === undefined) {
    res.status(400).send({ error: 'missing paramters' });
  }

  if (isNaN(Number(value1))) {
    res.status(400).send({ error: `${value1} is not a type Number.` });
  }

  if (isNaN(Number(value2))) {
    res.status(400).send({ error: `${value2} is not a type Number.` });
  }

  const result = calculator(Number(value1), Number(value2), op);
  res.send({ result });
 });

const PORT = 3003;

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});