
import { NewEntry, EntryType, Discharge, SickLeave, HealthCheckRating, Diagnosis } from '../types';

type Attributes = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown;
  type: unknown,
  discharge?: unknown,
  sickLeave?: unknown,
  healthCheckRating?: unknown,
  employerName?: unknown,
};


const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, discharge, healthCheckRating, sickLeave, employerName } : Attributes): NewEntry => {
  switch (type){
    case "Hospital":
      return(
        {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosis(diagnosisCodes),
          type: parseType(type),
          discharge: parseDischarge(discharge)
        } as NewEntry
      );
    case "HealthCheck":
      return(
        {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosis(diagnosisCodes),
          type: parseType(type),
          healthCheckRating: parseHealthChecking(healthCheckRating)
        } as NewEntry 
      );
    case "OccupationalHealthcare":
      return(
        {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosis(diagnosisCodes),
          type: parseType(type),
          sickLeave: parseSickLeave(sickLeave),
          employerName: parseEmployerName(employerName)
        } as NewEntry
      );
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify({
          description,
          date, 
          specialist, 
          diagnosisCodes, 
          type, 
          discharge, 
          healthCheckRating, 
          sickLeave, 
          employerName         
        })}`
      );
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUuid = (uuid: any): string => {
  if(!uuid || !isString(uuid)){
    throw new Error('Incorrect or missing uuid: '+ uuid);
  }
  return uuid;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description: '+ description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: '+date);
  }
  return date;
};

const parseDiagnosis = (diagnosis: unknown): Array<Diagnosis['code']> => {
  // optional field initialization.
  if(!diagnosis){
    return [];
  }
  else if(!isDiagnosisArray(diagnosis)){
    throw new Error('Incorrect or missing diagnosis: '+diagnosis);
  }
  return diagnosis;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist: '+ specialist);
  }
  return specialist;
};

const parseType = (type: unknown): EntryType => {
  if(!type || !isType(type)){
    throw new Error('Inccorect or missing type: '+type);
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if(!discharge || !isDischarge(discharge)){
    throw new Error('Inccorect discharge: '+discharge);
  }
  return discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  // optional field initialization.
  if(!sickLeave){
    return {
      startDate: '0000-00-00',
      endDate: '0000-00-00'
    };
  }
  else if(!isSickLeave(sickLeave)){
    throw new Error('Inccorect sickLeave: '+sickLeave);
  }
  return sickLeave;
};

const parseHealthChecking = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating  || !ishealthCheck(healthCheckRating)){
    throw new Error('Inccorect healthCheckRating: '+healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if(!employerName || !isString(employerName)){
    throw new Error('Incorrect employerName: '+ employerName);
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return typeof param.date === 'string' && typeof param.criteria === 'string';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ishealthCheck = (param: any): param is HealthCheckRating => {
  return param in HealthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  return typeof param.startDate === 'string' && typeof param.endDate === 'string';
};

const isDiagnosisArray = (darr: unknown): darr is  string[] => {
  return Array.isArray(darr) && darr.every(d => typeof d === 'string');
};

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default toNewEntry;