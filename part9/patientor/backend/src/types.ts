
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

interface IOccupationalHealthCare {
    type: "OccupationalHealthcare";
    employerName?: string;
    sickLeave?: SickLeave;
}

interface IHospital {
    type: "Hospital";
    discharge: Discharge;
}

interface IHealthCheck {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthCareEntry extends BaseEntry, IOccupationalHealthCare {}

export interface HospitalEntry extends BaseEntry, IHospital {}

export interface HealthCheckEntry extends BaseEntry, IHealthCheck {}

// New Entry --------------------

export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthCareEntry
    | NewHealthCheckEntry;

export type BaseNewEntry = Omit<BaseEntry, "id" | "diagnosisCodes">;

export interface NewOccupationalHealthCareEntry extends BaseNewEntry, IOccupationalHealthCare {}

export interface NewHospitalEntry extends BaseNewEntry, IHospital {}

export interface NewHealthCheckEntry extends BaseNewEntry, IHealthCheck {}
