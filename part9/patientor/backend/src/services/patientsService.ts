import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.json';
import { Patient, NewPatient, NonSensitivePatient } from '../types'

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
}

const addPatient = (patient: NewPatient) => {
    const newPatient = {
        id: uuidv4(),
        ...patient
    }
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};
