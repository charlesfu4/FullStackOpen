import diagnoses from '../../data/diagnoses';
import { Diagnosis, NonSensitiveDiagnose } from '../types';

const getEntries = () : Array<Diagnosis> => {
  return diagnoses;
};

const getNonSensitiveDiagnoses = () : NonSensitiveDiagnose[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name,
  }));
};

const getIdDiagnoseEntry = ( id: string ) : Diagnosis | undefined => {
  return diagnoses.find(({ code, name }) => ({
    code,
    name,
  }.code = id));
};

export default {
  getEntries,
  getNonSensitiveDiagnoses,
  getIdDiagnoseEntry
};