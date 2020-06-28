import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import {
  NumberField
} from "../components/FormField";

interface Props {
}

const AddHealthCheckEntryForm: React.FC<Props> = ({}) => {
  return (
    <Field
      label="Health Rating"
      name="healthCheckRating"
      min={1} max={4}
      component={NumberField}
    />
  );
}

export default AddHealthCheckEntryForm;
