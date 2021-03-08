import express from 'express';
import { calculateBmi } from './bmiCalculator'; 
const app = express();
/*
interface bmiResult {
  weight: number;
  height: number;
  bmi: string;
}
*/
app.get('/hello', (_req, res) => {
  res.send('Hello Full stack!');
});
// query bmi
app.get('/bmi', (req, res) => {
  const whPair = req.query;
  try{
    res.send({
      weight: Number(whPair.weight),
      height: Number(whPair.height),
      bmi: calculateBmi(Number(whPair.weight), Number(whPair.height)),
    });
  } catch(error){
    res.send({
      error: 'malformatted parameters',
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});