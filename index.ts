import express from 'express';
const app = express();
import { calculateBmi } from './exercises/bmiCalculator';


app.get('/ping', (_req, res) => { 
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/:height/:weight', (req, res) => {
  type height = number;
  type weight = number;
  const { height, weight } = req.params;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight));
    return res.json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});