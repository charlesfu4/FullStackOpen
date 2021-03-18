import { Gender, NewPatient } from '../types';

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
  entries: unknown
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, _entries }: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUuid = (uuid: any): string => {
  if(!uuid || !isString(uuid)){
    throw new Error('Incorrect or missing uuid: '+ uuid);
  }
  return uuid;
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name: '+ name);
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn: '+ ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: '+ occupation);
  }
  return occupation;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: '+date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Inccorect or missing gender: '+gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default toNewPatient;