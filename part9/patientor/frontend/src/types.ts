export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}

// --------------------

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

export enum EntryType {
    OccupationalHealthCare = "OccupationalHealthcare",
    Hospital = "Hospital",
    HealthCheck = "HealthCheck"
}

interface IOccupationalHealthcare {
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

// Entry --------------------

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry, IOccupationalHealthcare {}

export interface HospitalEntry extends BaseEntry, IHospital {}

export interface HealthCheckEntry extends BaseEntry, IHealthCheck {}


// New Entry --------------------

export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry;

export type BaseNewEntry = Omit<BaseEntry, "id">;

export interface NewOccupationalHealthcareEntry extends BaseNewEntry, IOccupationalHealthcare {}

export interface NewHospitalEntry extends BaseNewEntry, IHospital {}

export interface NewHealthCheckEntry extends BaseNewEntry, IHealthCheck {}
