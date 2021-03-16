import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon, List } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
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
        {patient?.entries.map(entry => (
          <div key={entry.id}>
            <div>{`${entry.date} ${entry.description}`}</div>
            <List bulleted>
              {entry.diagnosisCodes?.map(code => (
                <List.Item key={code}>{code}</List.Item>
              ))}
            </List>
          </div>

        )
        )}

      </Container>
    </div>
  );
};

export default PatientPage;