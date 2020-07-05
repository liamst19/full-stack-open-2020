import React from "react";
import { Field } from "formik";
import {
  TextField
} from "../components/FormField";

const AddHospitalEntryForm: React.FC = () => {
  return (<div>
    <Field
      label="Discharge Date"
      placeholder="YYYY-MM-DD"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Criteria"
      placeholder="criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </div>);
};

export default AddHospitalEntryForm;
