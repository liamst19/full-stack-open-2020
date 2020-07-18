import {
    NewEntry,
    BaseNewEntry,
    NewOccupationalHealthCareEntry,
    NewHospitalEntry,
    NewHealthCheckEntry,
    SickLeave,
    Discharge,
    HealthCheckRating
} from '../types';

import { isString, isDate } from './utils';

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('incorrect or missing description: ' + description);
    }
    return description;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('incorrect or missing date: ' + date);
    }
    return date;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('incorrect or missing employerName: ' + employerName);
    }
    return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate)
    };
};

const parseCriteria = (criteria: any): string => {
    if(!criteria || !isString(criteria)) {
        throw new Error('incorrect or missing criteria: ' + criteria);
    }
    return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
    return {
        date: parseDate(discharge.date),
        criteria: parseCriteria(discharge.criteria)
    };
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if(!healthCheckRating || healthCheckRating < 0 || healthCheckRating > 3) {
        throw new Error('incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

export const toNewEntry = (object: any): NewEntry => {

    const base: BaseNewEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };


    switch(object.type){
        case 'OccupationalHealthcare':
            return  <NewOccupationalHealthCareEntry> {
                ...base,
                type: 'OccupationalHealthcare',
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
        case 'Hospital':
            return <NewHospitalEntry> {
                ...base,
                type: 'Hospital',
                discharge: parseDischarge(object.discharge)
            };
        case 'HealthCheck':
            return <NewHealthCheckEntry> {
                ...base,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        default:
            throw new Error(
                `Unhandled discriminated union member: ${JSON.stringify(object)}`
            );
    };
};
