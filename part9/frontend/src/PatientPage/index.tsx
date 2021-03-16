import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";

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

  return (
    <div className="App">
      <Container textAlign="left">
        <h2>
          {`${patient?.name}`}
          <Icon name={patient?.gender as SemanticICONS} />
        </h2>
        <h4>
          {`ssn: ${patient?.ssn}`}
        </h4>
        <h4>
          {`occupation: ${patient?.occupation}`}
        </h4>
      </Container>
    </div>
  );
};

export default PatientPage;