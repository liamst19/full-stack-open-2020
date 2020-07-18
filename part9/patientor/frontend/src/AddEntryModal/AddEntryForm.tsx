import React, { useState } from "react";

import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';

import { NewEntry } from "../types";
export type EntryFormValues = NewEntry;

interface Props {
   onSubmit: (values: EntryFormValues) => void;
   onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = useState('HealthCheck');

  return(<div>
    <div>
      <label>
        <input type="radio" value="HealthCheck"
               checked={entryType === 'HealthCheck'}
               onChange={ (e) => setEntryType(e.target.value) } />
        Health Check
      </label>
      <label>
        <input type="radio" value="OccupationalHealthcare"
               checked={entryType === 'OccupationalHealthcare'}
               onChange={ (e) => setEntryType(e.target.value) } />
        Occupational Healthcare
      </label>
      <label>
        <input type="radio" value="Hospital"
               checked={entryType === 'Hospital'}
               onChange={ (e) => setEntryType(e.target.value) } />
        Hospital
      </label>
    </div>
    { entryType === 'HealthCheck' ? <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} /> : null }
    { entryType === 'OccupationalHealthcare' ? <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel} /> : null }
    { entryType === 'Hospital' ? <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} /> : null }
  </div>);
};

export default AddEntryForm;
