import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types'

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
}

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};
