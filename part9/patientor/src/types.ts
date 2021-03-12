export enum Gender {
  Female = 'female',
  Male = 'male',
  Mixed = 'mixed'
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitiveDiagnose = Omit<Diagnose, 'latin'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;