import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, NonSensitivePatient, NewPatient } from '../types';

const getEntries = () : Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, entries, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    entries,
    occupation,
  }));
};

const getIdPatientEntries = ( pid: string ): PublicPatient | undefined => {
  return patients.find(({ id, name, dateOfBirth, gender, entries, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    entries,
    occupation,
  }.id == pid));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  getIdPatientEntries,
  addPatient
};