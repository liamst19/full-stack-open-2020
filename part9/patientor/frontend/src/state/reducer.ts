import { Patient, Diagnosis, Entry } from "../types";
import { State } from "./state";

export type Action =
    | {
        type: "SET_PATIENT_LIST";
        payload: Patient[];
    }
    | {
        type: "ADD_PATIENT";
        payload: Patient;
    }
    | {
        type: "ADD_ENTRY";
        payload: {
            patientId: string;
            newEntry: Entry;
        };
    }
    | {
        type: "SET_PATIENT_DETAILS";
        payload: Patient;
    }
    | {
        type: "SET_DIAGNOSES";
        payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "ADD_ENTRY":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.patientId]: {
                        ...state.patients[action.payload.patientId],
                        entries: state.patients[action.payload.patientId].entries.concat(action.payload.newEntry)
                    }
                }
            };
        case "SET_PATIENT_DETAILS":
            return {
                ...state,
                patientDetails: action.payload
            };
        case "SET_DIAGNOSES":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (diagnoses, diagnosis) => ({ ...diagnoses, [diagnosis.code]: diagnosis }),
                        {}
                    ),
                    ...state.diagnoses
                }
            };
        default:
            return state;
    }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
    return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const addPatient = (newPatient: Patient): Action => {
    return { type: "ADD_PATIENT", payload: newPatient };
};

export const setPatientDetails = (patientDetailsFromApi: Patient): Action => {
    return { type: "SET_PATIENT_DETAILS", payload: patientDetailsFromApi };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
    return { type: "SET_DIAGNOSES", payload: diagnoses };
};

export const addEntry = (patientId: string, newEntry: Entry): Action => {
    return { type: "ADD_ENTRY", payload: { patientId, newEntry }};
};
