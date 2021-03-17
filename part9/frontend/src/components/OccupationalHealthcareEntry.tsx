import React from 'react';
import { Entry, Diagnosis } from '../types';
import { Message, List } from 'semantic-ui-react';

const OccupationalHealthcareEntryComp = ({ entry, diagnosis }: { entry: Entry; diagnosis: Diagnosis[] | undefined }) => {
  return (
    <Message 
      key={entry.id} 
      icon="universal access"
      header={`${entry.date}`}
      content={
        <div>
          {entry.description}
          <List bulleted>
            {entry.diagnosisCodes?.map(code => (
              <List.Item key={code}>{`${code} ${diagnosis?.find(d => d.code === code)?.name}`}</List.Item>
            ))}
          </List>
        </div>
      } 
    />
  );
};

export default OccupationalHealthcareEntryComp;