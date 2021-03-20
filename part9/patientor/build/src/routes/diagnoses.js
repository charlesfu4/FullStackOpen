"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    try {
        const diagnosis = diagnoseService_1.default.getEntries();
        res.send(diagnosis);
    }
    catch (e) {
        res.json(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    try {
        const diagnosis = diagnoseService_1.default.getIdDiagnoseEntry(req.params.id);
        res.send(diagnosis);
    }
    catch (e) {
        res.json(400).send(e.message);
    }
});
router.get('/censored', (_req, res) => {
    try {
        const diagnosis = diagnoseService_1.default.getNonSensitiveDiagnoses();
        res.send(diagnosis);
    }
    catch (e) {
        res.json(400).send(e.message);
    }
    res.send();
});
exports.default = router;
