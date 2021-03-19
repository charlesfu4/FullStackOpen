"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUuid = void 0;
const types_1 = require("../types");
const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, discharge, healthCheckRating, sickLeave, employerName }) => {
    switch (type) {
        case "Hospital":
            return {
                description: parseDescription(description),
                date: parseDate(date),
                specialist: parseSpecialist(specialist),
                diagnosisCodes: parseDiagnosis(diagnosisCodes),
                type: parseType(type),
                discharge: parseDischarge(discharge)
            };
        case "HealthCheck":
            return {
                description: parseDescription(description),
                date: parseDate(date),
                specialist: parseSpecialist(specialist),
                diagnosisCodes: parseDiagnosis(diagnosisCodes),
                type: parseType(type),
                healthCheckRating: parseHealthChecking(healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                description: parseDescription(description),
                date: parseDate(date),
                specialist: parseSpecialist(specialist),
                diagnosisCodes: parseDiagnosis(diagnosisCodes),
                type: parseType(type),
                sickLeave: parseSickLeave(sickLeave),
                employerName: parseEmployerName(employerName)
            };
        default:
            throw new Error(`Unhandled discriminated union member: ${JSON.stringify({
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                discharge,
                healthCheckRating,
                sickLeave,
                employerName
            })}`);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUuid = (uuid) => {
    if (!uuid || !isString(uuid)) {
        throw new Error('Incorrect or missing uuid: ' + uuid);
    }
    return uuid;
};
exports.parseUuid = parseUuid;
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseDiagnosis = (diagnosis) => {
    // optional field initialization.
    if (!diagnosis) {
        return [];
    }
    else if (!isDiagnosisArray(diagnosis)) {
        throw new Error('Incorrect or missing diagnosis: ' + diagnosis);
    }
    return diagnosis;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const parseType = (type) => {
    if (!type || !isType(type)) {
        throw new Error('Inccorect or missing type: ' + type);
    }
    return type;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Inccorect discharge: ' + discharge);
    }
    return discharge;
};
const parseSickLeave = (sickLeave) => {
    // optional field initialization.
    if (!sickLeave) {
        return {
            startDate: '0000-00-00',
            endDate: '0000-00-00'
        };
    }
    else if (!isSickLeave(sickLeave)) {
        throw new Error('Inccorect sickLeave: ' + sickLeave);
    }
    return sickLeave;
};
const parseHealthChecking = (healthCheckRating) => {
    if (!healthCheckRating || !ishealthCheck(healthCheckRating)) {
        throw new Error('Inccorect healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect employerName: ' + employerName);
    }
    return employerName;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param) => {
    return Object.values(types_1.EntryType).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param) => {
    return typeof param.date === 'string' && typeof param.criteria === 'string';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ishealthCheck = (param) => {
    return param in types_1.HealthCheckRating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param) => {
    return typeof param.startDate === 'string' && typeof param.endDate === 'string';
};
const isDiagnosisArray = (darr) => {
    return Array.isArray(darr) && darr.every(d => typeof d === 'string');
};
const isString = (str) => {
    return typeof str === 'string' || str instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.default = toNewEntry;
