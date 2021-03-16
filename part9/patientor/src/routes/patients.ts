import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getIdPatientEntries(req.params.id));
});

router.post('/', (req, res) => {
  try{
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch(e){
    res.status(400).send(e.message);
  }
});

export default router;