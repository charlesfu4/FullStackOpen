import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

import cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3001;

app.use('/api/diagnosis', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});