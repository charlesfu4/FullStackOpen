"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toEntry_1 = __importDefault(require("../utils/toEntry"));
const toPatient_1 = __importDefault(require("../utils/toPatient"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    try {
        const patients = patientService_1.default.getEntries();
        res.json(patients);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    try {
        const patient = patientService_1.default.getIdPatientEntries(req.params.id);
        res.json(patient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
    res.send(patientService_1.default.getIdPatientEntries(req.params.id));
});
router.post('/', (req, res) => {
    try {
        const newPatient = toPatient_1.default(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatient);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    const patient = patientService_1.default.getIdPatientEntries(req.params.id);
    if (patient !== undefined) {
        try {
            const newEntry = toEntry_1.default(req.body);
            const updateEntry = patientService_1.default.addEntry(newEntry, patient);
            res.json(updateEntry);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
});
exports.default = router;
