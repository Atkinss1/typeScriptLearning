import express, {Request, Response} from 'express';
const app = express();
import { calculateBmi, parseArgs } from './exercises/bmiCalculator';
import { calculator } from './basics/calculator';

// middleware for incoming json requests
app.use(express.json());

// interface for bmi GET response
interface BmiResults {
  weight: number,
  height: number,
  bmi: string
}

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
  try {
    const { value1, value2, op } = req.body;

    if (value1 === undefined || value2 === undefined || op === undefined) {
      throw new Error(`A parameter is undefined.`);
    }

    if (isNaN(Number(value1)) || isNaN(Number(value2))) {
      throw new Error(`A parameter is not a type Number.`);
    }

    const result = calculator(Number(value1), Number(value2), op);
    
    res.send({ result });
  }
  catch (error: unknown) { 
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occured' });
    }
  }
});
  
  

const PORT = 3003;

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});