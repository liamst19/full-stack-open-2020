import React from "react";
import { Field, Formik, Form  } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import {
  TextField,
  DiagnosisSelection,
  NumberField
} from "../components/FormField";

import { NewHealthCheckEntry } from "../types";
type EntryFormValues = NewHealthCheckEntry;

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

const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description= requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if(!Date.parse(values.date)){
          errors.date = "Invalid Date";
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        } else if (values.healthCheckRating < 1 || values.healthCheckRating > 4){
          errors.healthCheckRating = "Health Rating is out of range";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      } }
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
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

            <Field
              label="Health Rating"
              name="healthCheckRating"
              min={1} max={4}
              component={NumberField}
            />

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
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckEntryForm;
