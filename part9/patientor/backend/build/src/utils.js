"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (str) => {
    return Object.values(types_1.Gender).includes(str);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name: ' + name);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation: ' + occupation);
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
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object) => ({
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
});
exports.default = toNewPatient;
