import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

const HealthCheckRatingIcons = ({ rating }: { rating: HealthCheckRating | undefined }) => {
  switch(rating){
    case 0:
      return (
        <Icon color='green' name='heartbeat' />
      );
    case 1:
      return (
        <Icon color='yellow' name='heartbeat' />
      );
    case 2:
      return (
        <Icon color='orange' name='heartbeat' />
      );
    case 3:
      return (
        <Icon color='red' name='heartbeat' />
      );
    default:
      return (<div></div>);
  }
};

export default HealthCheckRatingIcons;