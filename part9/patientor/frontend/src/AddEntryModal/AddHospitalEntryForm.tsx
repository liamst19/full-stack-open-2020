import React from "react";
import { Field, Formik, Form  } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import {
  TextField,
  DiagnosisSelection
} from "../components/FormField";

import { NewHospitalEntry } from "../types";
type EntryFormValues = NewHospitalEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
type ErrorFields = { [field: string]: string };

const initialValues: EntryFormValues = {
  type: "Hospital",
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  discharge: {
    date: "",
    criteria: ""
  }
};

const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
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

export default AddHospitalEntryForm;
