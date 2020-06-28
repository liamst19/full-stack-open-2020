import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import {
  TextField,
  SelectField,
  GenderOption,
  DiagnosisSelection,
  NumberField
} from "../components/FormField";
import { Entry, NewEntry, BaseNewEntry } from "../types";

import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm"

export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type ErrorFields = { [field: string]: string };

const initialValues: EntryFormValues = {
  type: "HealthCheck",
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: 1
};

const validate = (values: any): ErrorFields => {
  const requiredError = "Field is required";
  const errors: ErrorFields = {};
  if (!values.description) {
    errors.description= requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.healthCheckRating) {
    errors.healthCheckRating = requiredError;
  }
  return errors;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <AddHealthCheckEntryForm />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  );
}

export default AddEntryForm;
