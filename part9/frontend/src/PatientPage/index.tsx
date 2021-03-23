import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon, Button } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

import { Patient, Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";

import HealthCheckEntry from "../components/HealthCheckEntry";
import HospitalEntry from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";
import { NewEntry } from "../types";
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ diagnosis }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const openModal = (): void => setModalOpen(true);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatients();
  }, [modalOpen, id]);


  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: updatedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient?.id}/entries`,
        values
      );
      patient?.entries.push(updatedEntry);
      dispatch({ type: "ADD_ENTRY", payload: {
        patientId: patient?.id as string,
        patient: patient as Patient
       }});
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


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
  
  const EntryDetails: React.FC<{ entry: Entry; diagnosis: Diagnosis[] }> = ({ entry, diagnosis }) => {
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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
        {patient?.entries.map(entry => 
          <EntryDetails key={entry.id} entry={entry} diagnosis={Object.values(diagnosis)} />
        )}
      </Container>
    </div>
  );
};

export default PatientPage;