interface Report {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const rating = (average:number, targetHour:number) : number => {
  if(average/targetHour >= 1.5) return 3; 
  else if(average/targetHour >= 1 && average/targetHour < 1.5) return 2; 
  else return 1; 
}
const ratingDescription = (rating:number) : string => {
  if(rating === 3) return 'Awesome you are fantastic!'; 
  else if(rating === 2) return 'Not too bad but could be better'; 
  else return 'Try it harder next time, you failed!'; 
}

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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));