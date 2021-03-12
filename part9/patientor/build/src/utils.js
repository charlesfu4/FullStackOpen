"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUuid = void 0;
const types_1 = require("./types");
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUuid = (uuid) => {
    if (!uuid || !isString(uuid)) {
        throw new Error('Incorrect or missing uuid: ' + uuid);
    }
    return uuid;
};
exports.parseUuid = parseUuid;
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Inccorect or missing gender: ' + gender);
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isString = (str) => {
    return typeof str === 'string' || str instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.default = toNewPatient;
