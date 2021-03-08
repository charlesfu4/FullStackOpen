type Result = string;
interface MultiplyValues {
  value1: number;
  value2: number;
}

export const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (h: number, w: number): Result =>  {
  if(w/(h*h/10000) < 15)
    return 'Very severely underweight';
  else if(w/(h*h/10000) >= 15 && w/(h*h/10000) < 16)
    return 'Severely underweight';
  else if(w/(h*h/10000) >= 16 && w/(h*h/10000) < 18.5)
    return 'Underweight';
  else if(w/(h*h/10000) >= 18.5 && w/(h*h/10000) < 25)
    return 'Normal (healthy weight)';
  else if(w/(h*h/10000) >= 25 && w/(h*h/10000) < 30)
    return 'Overweight';
  else if(w/(h*h/10000) >= 30 && w/(h*h/10000) < 35)
    return 'Obese Class I (Moderately obese)';
  else if(w/(h*h/10000) >= 35 && w/(h*h/10000) < 40)
    return 'Obese Class II (Severely obese)';
  else
    return 'Obese Class III (Very severely obese)';
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', String(e.message));
}