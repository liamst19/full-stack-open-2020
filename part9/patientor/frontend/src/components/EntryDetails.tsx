import React from "react";
import { List, Icon, Rating } from "semantic-ui-react";
import { assertNever } from "../utils";

import {
  Entry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry
} from "../types";

import HealthRatingBar from "./HealthRatingBar"

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <List.Item>
      <Icon name="hospital" size='big' />
      <List.Content>
        <List.Header>{entry.date} </List.Header>
        <p>{ entry.description }</p>
        <div>discharged { entry.discharge.date }: { entry.discharge.criteria }</div>
      </List.Content>
    </List.Item>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <List.Item>
      <Icon name="stethoscope" size='big' />
      <List.Content>
        <List.Header>{entry.date} <Rating icon="heart" disabled rating={4 - entry.healthCheckRating} maxRating={4} /></List.Header>
        <p>{ entry.description }</p>
      </List.Content>
    </List.Item>
  )
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <List.Item>
      <Icon name="user md" size='big' />
      <List.Content>
        <List.Header>{entry.date}  {entry.employerName}</List.Header>
        <p>{ entry.description }</p>
        { entry.sickLeave ?
          (<div>
            sick leave: { entry.sickLeave.startDate} to { entry.sickLeave.endDate }
          </div>)
          : null
        }
      </List.Content>
    </List.Item>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type){
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  };
};

export default EntryDetails;
