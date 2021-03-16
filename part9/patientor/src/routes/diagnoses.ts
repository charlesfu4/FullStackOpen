import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.get('/:id', (req, res) => {
  res.send(diagnoseService.getIdDiagnoseEntry(req.params.id));
});

router.get('/censored', (_req, res) => {
  res.send(diagnoseService.getNonSensitiveDiagnoses());
});

export default router;

