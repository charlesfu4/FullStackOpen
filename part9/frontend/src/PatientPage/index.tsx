import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

import { Patient, Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";

import HealthCheckEntry from "../components/HealthCheckEntry";
import HospitalEntry from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";



const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [diagnosis, setDiagnosis] = React.useState<Diagnosis[] | undefined>();

  React.useEffect(() => {
    const updatePatient = async ( pid: string ) => {
      try{
        const { data: returnedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${pid}`
        );
        setPatient(returnedPatient);
      } catch (e) {
        console.error(e);
      }
    };
    updatePatient(id);
  }, [id]);

  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      try{
        const { data: returnDignosis } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        setDiagnosis(returnDignosis);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosis();
  }, [id]);

  const transGender = (patient: Patient | undefined): SemanticICONS => {
    switch(patient?.gender){
      case "male":
        return "mars";
      case "female":
        return "venus";
      case "other":
        return "transgender";
      default:
        return "transgender";
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const EntryDetails: React.FC<{ entry: Entry; diagnosis: Diagnosis[] | undefined }> = ({ entry, diagnosis }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} diagnosis={diagnosis} />;
      case "Hospital":
        return <HospitalEntry entry={entry} diagnosis={diagnosis} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} diagnosis={diagnosis} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div className="App">
      <Container textAlign="left">
        <h2>
          {`${patient?.name}`}
          <Icon name={transGender(patient)} />
        </h2>
        <div>
          {`ssn: ${patient?.ssn}`}
        </div>
        <div>
          {`occupation: ${patient?.occupation}`}
        </div>
        <h4>entries</h4>
        {patient?.entries.map(entry => 
          <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
        )}
      </Container>
    </div>
  );
};

export default PatientPage;