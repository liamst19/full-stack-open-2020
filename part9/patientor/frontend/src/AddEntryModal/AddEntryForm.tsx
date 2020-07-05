import React from "react";
import { Field, Formik, Form  } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import {
  TextField,
  DiagnosisSelection
} from "../components/FormField";
import { NewEntry } from "../types";
import {   EntryTypeSelection, EntryTypeOption } from "./EntryTypeSelection";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";

export type EntryFormValues = NewEntry;


const entryTypeOptions: EntryTypeOption[] = [
  { value: "OccupationalHealthCare", label: "Occupational Healthcare"},
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" }
];

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

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const handleTypeChange = (entryType: string) => {
    console.log(entryType);
    // TODO: toggle visibility for selected type component
    switch(entryType){
      case "HealthCheck":
        return <AddHealthCheckEntryForm />;
      case "OccupationalHealthcare":
        return <AddOccupationalHealthcareEntryForm />;
      case "Hospital":
        return <AddHospitalEntryForm />;
      default:
        // error
        console.log("something went wrong");
    }
  };

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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        } else if (values.healthCheckRating < 1 || values.healthCheckRating > 4){
          errors.healthCheckRating = "Health Rating is out of range";
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
            <EntryTypeSelection entryTypes={entryTypeOptions}  />

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

export default AddEntryForm;
