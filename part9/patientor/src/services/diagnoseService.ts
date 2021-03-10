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

export default {
  getEntries,
  getNonSensitiveDiagnoses,
};