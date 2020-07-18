"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const utils_1 = require("./utils");
const parseDescription = (description) => {
    if (!description || !utils_1.isString(description)) {
        throw new Error('incorrect or missing description: ' + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !utils_1.isString(date) || !utils_1.isDate(date)) {
        throw new Error('incorrect or missing date: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !utils_1.isString(specialist)) {
        throw new Error('incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !utils_1.isString(employerName)) {
        throw new Error('incorrect or missing employerName: ' + employerName);
    }
    return employerName;
};
const parseSickLeave = (sickLeave) => {
    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate)
    };
};
const parseCriteria = (criteria) => {
    if (!criteria || !utils_1.isString(criteria)) {
        throw new Error('incorrect or missing criteria: ' + criteria);
    }
    return criteria;
};
const parseDischarge = (discharge) => {
    return {
        date: parseDate(discharge.date),
        criteria: parseCriteria(discharge.criteria)
    };
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || healthCheckRating < 0 || healthCheckRating > 3) {
        throw new Error('incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
exports.toNewEntry = (object) => {
    const base = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };
    switch (object.type) {
        case 'OccupationalHealthcare':
            return Object.assign(Object.assign({}, base), { type: 'OccupationalHealthcare', employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickleave) });
        case 'Hospital':
            return Object.assign(Object.assign({}, base), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
        case 'HealthCheck':
            return Object.assign(Object.assign({}, base), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        default:
            throw new Error(`Unhandled discriminated union member: ${JSON.stringify(object)}`);
    }
    ;
};
