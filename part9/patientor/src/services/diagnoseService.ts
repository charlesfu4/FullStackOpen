import diagnoses from '../../data/diagnoses';
import { Diagnose, NonSensitiveDiagnose } from '../types';

const getEntries = () : Array<Diagnose> => {
  return diagnoses;
};

const getNonSensitiveDiagnoses = () : NonSensitiveDiagnose[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name,
  }));
};

const getIdDiagnoseEntry = ( id: string ) : Diagnose | undefined => {
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