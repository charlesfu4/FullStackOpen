import express from 'express';
import patientService from '../services/patientService';
import toNewEntry from '../utils/toEntry';
import toNewPatient from '../utils/toPatient';

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

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getIdPatientEntries(req.params.id);
  if(patient !== undefined){
    try{
      const newEntry = toNewEntry(req.body);
      const updateEntry = patientService.addEntry(newEntry, patient);
      res.json(updateEntry);
    } catch(e){
      res.status(400).send(e.message);
    }
  }

});

export default router;