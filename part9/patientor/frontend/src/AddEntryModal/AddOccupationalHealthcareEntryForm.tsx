import React from "react";
import { Field } from "formik";
import {
  TextField
} from "../components/FormField";

const AddOccupationalHealthcareEntryForm: React.FC = () => {
  return (<div>
    <Field
      label="Employer"
      placeholder="Nmployer"
      name="employerName"
      component={TextField}
    />
    <Field
      label="Start Date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="End Date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.endDate"
      component={TextField}
    />
  </div>);
};

export default AddOccupationalHealthcareEntryForm;
