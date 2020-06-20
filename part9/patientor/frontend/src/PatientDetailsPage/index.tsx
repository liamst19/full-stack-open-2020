import React from "react";
import { RouteComponentProps } from 'react-router';
import {  useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";

interface RouteParams {id: string,}

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const getDiagnosisName = (diagnosisCode: string): string => {
    return diagnoses.filter(({ code }): boolean => code === diagnosisCode )[0].name;
  };

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
      <div>
        { patientDetails.entries.map((entry: Entry) => {
            return (
            <div key={entry.id}>
              {entry.date} {entry.description}
              { entry.diagnosisCodes && entry.diagnosisCodes.length > 0
                ? <ul>
                  { entry.diagnosisCodes.map(code => <li>{code} {getDiagnosisName(code)}</li>) }
                  </ul> : null}
            </div>
          )})}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
