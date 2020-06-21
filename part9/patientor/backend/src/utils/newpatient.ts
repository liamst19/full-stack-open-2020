import { NewPatient, Gender } from '../types';
import { isString, isDate } from './utils';

const isGender = (str: any): str is Gender => {
    return Object.values(Gender).includes(str);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name: ' + name);
    }
    return name;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatient = (object: any): NewPatient => ({
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
});

