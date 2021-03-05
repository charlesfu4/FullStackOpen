type Result = string;
const calculateBmi = (h: number, w: number): Result =>  {
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
  else if(w/(h*h/10000) >= 40)
    return 'Obese Class III (Very severely obese)';
}

console.log(calculateBmi(180, 74))