import React from 'react';
import { Diagnosis, HealthCheckEntry } from '../types';
import { Message, List } from 'semantic-ui-react';
import HealthCheckRatingIcons from './HealthCheckRatingIcons';

const HealthCheckEntryComp = ({ entry, diagnosis }: { entry: HealthCheckEntry; diagnosis: Diagnosis[] | undefined }) => {
  return (
    <Message 
      key={entry.id} 
      icon="doctor"
      header={`${entry.date}`}
      content={
        <div>
          {entry.description}
          <List bulleted>
            {entry.diagnosisCodes?.map(code => (
              <List.Item key={code}>{`${code} ${diagnosis?.find(d => d.code === code)?.name}`}</List.Item>
            ))}
          </List>
          <HealthCheckRatingIcons rating={entry.healthCheckRating} />
        </div>
      } 
    />
  );
};

export default HealthCheckEntryComp;