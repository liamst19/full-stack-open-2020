import React from "react";
import { RouteComponentProps } from 'react-router';
import {  useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";

interface RouteParams {id: string,}

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientDetails = async (patientId: string) => {
      try {
        console.log("getting details", patientId)
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
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
    </div>
  );
};

export default PatientDetailsPage;
