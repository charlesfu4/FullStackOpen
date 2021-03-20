import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  try{
    const diagnosis = diagnoseService.getEntries();
    res.send(diagnosis);
  } catch(e){
    res.json(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  try{
    const diagnosis = diagnoseService.getIdDiagnoseEntry(req.params.id);
    res.send(diagnosis);
  } catch(e){
    res.json(400).send(e.message);
  }
});

router.get('/censored', (_req, res) => {
  try{
    const diagnosis = diagnoseService.getNonSensitiveDiagnoses();
    res.send(diagnosis);
  } catch(e){
    res.json(400).send(e.message);
  }
  res.send();
});

export default router;

