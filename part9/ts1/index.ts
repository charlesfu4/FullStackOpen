import express from 'express';
import { calculateBmi } from './bmiCalculator'; 
const app = express();

interface bmiResult {
  weight: number;
  height: number;
  bmi: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseQuery = (query: any) : bmiResult => {
  const queriesArr : Array<string> = Object.keys(query);
  if(queriesArr.length != 2) 
    throw new Error('Input queries accept 2 arguments.');
  if(!queriesArr.includes('weight') ||!queriesArr.includes('height')) 
    throw new Error('Input queries accept weight and height only.');
  if(isNaN(Number(query.weight)) || isNaN(Number(query.height)))
    throw new Error('Input queries values accept numbers only.');

  return{
    weight: Number(query.weight),
    height: Number(query.height),
    bmi: calculateBmi(Number(query.weight), Number(query.height))
  };
};

//sample query
app.get('/hello', (_req, res) => {
  res.send('Hello Full stack!');
});

// query bmi
app.get('/bmi', (req, res) => {
  try{
    res.send(
      parseQuery(req.query)
    );
  } catch(error){
    res.send({
      error: error.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});