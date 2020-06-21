import React from "react";
import { RouteComponentProps } from 'react-router';
import {  useParams, useRouteMatch } from "react-router-dom";
import { List } from 'semantic-ui-react'
import axios from "axios";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";

import EntryDetails from "../components/EntryDetails";

interface RouteParams {id: string,}

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientDetails = async (patientId: string) => {
      try {
        console.log("getting details", patientId)
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        console.log(patientDetailsFromApi);
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch(e) {
        console.error(e);
      }
    }
    fetchPatientDetails(id)
  }, [id, dispatch]);

  if(!patientDetails) return <div>no record was found</div>

  return (
    <div>
      <h2>{ patientDetails.name }</h2>
      <div>ssn: {patientDetails.ssn}</div>
      <div>occupation: { patientDetails.occupation }</div>
      <h3>entries</h3>
      { console.log(patientDetails.entries.map(e => e ) ) }
      <List celled>
        { Object.values(patientDetails.entries)
                .map((entry: Entry) => (
                  <EntryDetails entry={entry} key={ entry.id } />
          ))}
      </List>
    </div>
  );
};

export default PatientDetailsPage;
