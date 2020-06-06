"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const patients = patients_json_1.default;
const getPatients = () => {
    return patients;
};
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v4() }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    addPatient
};