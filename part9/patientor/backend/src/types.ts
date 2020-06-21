
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// Patient -----------------

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

// Entry --------------------

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export interface SickLeave {
    startDate: string;
    endDate: string;
}
export interface Discharge {
    date: string;
    criteria: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName?: string;
    sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// New Entry --------------------

export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthCareEntry
    | NewHealthCheckEntry;

export interface BaseNewEntry {
  description: string;
  date: string;
  specialist: string;
}

export interface NewOccupationalHealthCareEntry extends BaseNewEntry {
    type: "OccupationalHealthcare";
    employerName?: string;
    sickLeave?: SickLeave;
}

export interface NewHospitalEntry extends BaseNewEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface NewHealthCheckEntry extends BaseNewEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
