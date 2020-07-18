"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_step4_1 = __importDefault(require("../../data/patients_step4"));
let patients = patients_step4_1.default;
const getPatients = () => {
    return patients;
};
const getPatient = (patientId) => {
    return patients.filter(({ id }) => patientId === id)[0];
};
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }));
};
const getNonSensitivePatient = (patientId) => {
    return patients
        .filter(({ id }) => patientId === id)
        .map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }))[0];
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v4() }, patient);
    patients.push(newPatient);
    return newPatient;
};
const addEntryToPatient = (patientId, entry) => {
    const newEntry = Object.assign({ id: uuid_1.v4() }, entry);
    patients = patients.map(patient => patient.id === patientId ? Object.assign(Object.assign({}, patient), { entries: patient.entries.concat(newEntry) }) : patient);
    return newEntry;
};
exports.default = {
    getPatients,
    getPatient,
    getNonSensitivePatient,
    getNonSensitivePatients,
    addPatient,
    addEntryToPatient
};
