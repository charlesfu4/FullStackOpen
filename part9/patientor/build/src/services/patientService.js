"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitivePatientEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, entries, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        entries,
        occupation,
    }));
};
const getIdPatientEntries = (pid) => {
    return patients_1.default.find(({ id, name, dateOfBirth, gender, entries, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        entries,
        occupation,
    }.id == pid));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (entry, patient) => {
    const newEntry = Object.assign({ id: uuid_1.v1() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getNonSensitivePatientEntries,
    getIdPatientEntries,
    addPatient,
    addEntry
};
