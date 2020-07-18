"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("../types");
const utils_1 = require("./utils");
const isGender = (str) => {
    return Object.values(types_1.Gender).includes(str);
};
const parseName = (name) => {
    if (!name || !utils_1.isString(name)) {
        throw new Error('incorrect or missing name: ' + name);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !utils_1.isString(ssn)) {
        throw new Error('incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !utils_1.isString(occupation)) {
        throw new Error('incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseDate = (date) => {
    if (!date || !utils_1.isString(date) || !utils_1.isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !utils_1.isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.toNewPatient = (object) => ({
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
});
