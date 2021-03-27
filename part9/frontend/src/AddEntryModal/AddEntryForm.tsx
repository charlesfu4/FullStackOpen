import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection, EntryOption, SelectField } from "./FormField";
import { NewEntry, EntryType } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

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
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={ values => {
        const requiredError = "Field is required";
        const formatError = "Field is in wrong format";
        const outofboundError = "Field ranges from 0 - 3";
        const errors: { [field: string]: string } = {};

        // common field validation
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

        // field validation based on types
        if(values.type === "HealthCheck"){
          if(values.healthCheckRating < 0 || values.healthCheckRating > 3){
            errors.healthCheckRating = outofboundError;
          }
        }
        else if(values.type === "Hospital"){
          if(!values.discharge){
            errors.discharge = requiredError;
          }
          else if(values.discharge) {
            if(!values.discharge.date){
              errors.discharge = requiredError;
            }
            if(!values.discharge.criteria){
              errors.discharge = requiredError;
            }
          }
        } else if(values.type === "OccupationalHealthcare") {
          if(!values.employerName){
            errors.employerName = requiredError;
          }
          if(values.sickLeave){
            if(!values.sickLeave.endDate && values.sickLeave.startDate){
              errors.sickLeaveEndDate = requiredError;
            }
            else if(!values.sickLeave.startDate && values.sickLeave.endDate){
              errors.sickLeaveStartDate = requiredError;
            }
          }
        }
        return errors;
      }}
    >
      {({ values ,isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={entryOptions}
            />
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
            {values.type === "HealthCheck" && (
              <Field
                label="Health Check Rating"
                min={0}
                max={3}
                name="healthCheckRating"
                component={NumberField}
              />
            )}
            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge date"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="SickLeave startDate"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                <Field
                  label="SickLeave endDate"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </>
            )}
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
