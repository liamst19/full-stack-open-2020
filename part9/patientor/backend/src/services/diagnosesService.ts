
import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types'

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};
