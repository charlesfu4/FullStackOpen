import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "./FormField";
import { NewEntry } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

/*
const entryOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

const fieldsValues = ({ type = EntryType.HealthCheck }: { type: EntryType }): NewEntry => {
  switch(type){
    case "HealthCheck":
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [], 
        type: type,
        healthCheckRating: 0
      };
    case "Hospital":
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [], 
        type: type,
        discharge: {
          date: "",
          criteria: ""
        }
      };
    case "OccupationalHealthcare":
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [], 
        type: type,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      };
    default:
      throw new Error("wrong type of entry: "+ type);
  }
};
*/

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [], 
        type: "HealthCheck",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={ values => {
        const requiredError = "Field is required";
        const formatError = "Field is in wrong format";
        const outofboundError = "Field ranges from 0 - 3";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if(!Date.parse(values.date)){
          errors.date = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if(values.type === "HealthCheck"){
          if(values.healthCheckRating < 0 || values.healthCheckRating > 3){
            errors.healthCheckRating = outofboundError;
          }
        }
        return errors;
      }}
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
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="HealthCheckRating"
              min={0}
              max={3}
              name="healthCheckRating"
              component={NumberField}
            />
            {/*
            <SelectField
              label="Entry"
              name="entry"
              options={entryOptions}
            />
            */}
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
