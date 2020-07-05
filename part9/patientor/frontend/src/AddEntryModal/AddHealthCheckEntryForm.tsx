import React from "react";
import { Field } from "formik";
import {
  NumberField
} from "../components/FormField";

const AddHealthCheckEntryForm: React.FC = () => {
  return (
    <Field
      label="Health Rating"
      name="healthCheckRating"
      min={1} max={4}
      component={NumberField}
    />
  );
};

export default AddHealthCheckEntryForm;
