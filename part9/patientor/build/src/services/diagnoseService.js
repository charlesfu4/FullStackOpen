"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const getEntries = () => {
    return diagnoses_1.default;
};
const getNonSensitiveDiagnoses = () => {
    return diagnoses_1.default.map(({ code, name }) => ({
        code,
        name,
    }));
};
const getIdDiagnoseEntry = (id) => {
    return diagnoses_1.default.find(({ code, name }) => ({
        code,
        name,
    }.code = id));
};
exports.default = {
    getEntries,
    getNonSensitiveDiagnoses,
    getIdDiagnoseEntry
};
