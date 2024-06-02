import express, {Request, Response} from 'express';
const app = express();
import { calculateBmi, parseArgs } from './exercises/bmiCalculator';
import { calculator } from './basics/calculator';

interface BmiResults {
  weight: number,
  height: number,
  bmi: string
}

interface BmiParams {
  height: string,
  weight: string
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

app.post('/calculate', (req: Request, res: Response) => {
  const { value1, value2, op } = req.body;

  const result = calculator(value1, value2, op);
  res.send({ result });
 });

const PORT = 3003;

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});