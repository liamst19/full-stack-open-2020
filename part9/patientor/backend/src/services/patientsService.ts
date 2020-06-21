import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients_step4';
import { Patient, NewPatient, NonSensitivePatient, Entry, NewEntry } from '../types'

let patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatient = (patientId: string): Patient => {
    return patients.filter(({ id }) => patientId === id)[0];
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }));
};

const getNonSensitivePatient = (patientId: string): NonSensitivePatient => {
    return patients
        .filter(({ id }) => patientId === id)
        .map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }))[0];
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
    const newEntry = {
        id: uuidv4(),
        ...entry
    };
    patients = patients.map(patient => patient.id === patientId ?
        {...patient, entries: patient.entries.concat(newEntry)}
        : patient);
    return newEntry;
};

export default {
    getPatients,
    getPatient,
    getNonSensitivePatient,
    getNonSensitivePatients,
    addPatient,
    addEntryToPatient
};
