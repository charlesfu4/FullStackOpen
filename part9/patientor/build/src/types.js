"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRating = exports.EntryType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var EntryType;
(function (EntryType) {
    EntryType["Hospital"] = "Hospital";
    EntryType["OccupationalHealthcare"] = "OccupationalHealthcare";
    EntryType["HealthCheck"] = "HealthCheck";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
