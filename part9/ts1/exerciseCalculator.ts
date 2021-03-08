interface Report {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RecordTargetPair {
  records: Array<number>;
  target: number
}

const parseArgs = (args: Array<string>) : RecordTargetPair => {
  if(args.length <= 3) throw new Error('Please input the records and target');
  const numberizeArgs = args
    .slice(2)
    .map(arg => {
      if(isNaN(Number(arg))){
        throw new Error('provided values were not numbers');
      }
      return Number(arg);
    });
  return {
    records: numberizeArgs.slice(0, numberizeArgs.length-1),
    target: numberizeArgs[numberizeArgs.length-1]
  };
};

const rating = (average:number, targetHour:number) : number => {
  if(average/targetHour >= 1.5) return 3; 
  else if(average/targetHour >= 1 && average/targetHour < 1.5) return 2; 
  else return 1; 
};
const ratingDescription = (rating:number) : string => {
  if(rating === 3) return 'Awesome you are fantastic!'; 
  else if(rating === 2) return 'Not too bad but could be better'; 
  else return 'Try it harder next time, you failed!'; 
};

const calculateExercises = ( dailyExercises: Array<number>, targetHour: number) : Report => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.reduce((acc, val) => {
    if(val > 0){
      acc++;
    } 
    return acc;
  }, 0);

  const average = dailyExercises.reduce((acc, val) => {
    acc += val;
    return acc;
  })/periodLength;

  const success = average > targetHour;
  const rate = rating(average, targetHour);
  const rateDescription = ratingDescription(rate);


  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rate,
    ratingDescription: rateDescription,
    target: targetHour,
    average: average 
  };
};

try{
  const { records, target } = parseArgs(process.argv);
  console.log(calculateExercises(records, target));
} catch(error){
  console.log('Error, something went wrong.', error);
}