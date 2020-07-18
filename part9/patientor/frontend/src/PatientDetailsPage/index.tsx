import React from "react";
// import { RouteComponentProps } from 'react-router';
import {  useParams } from "react-router-dom";
import { List, Button } from 'semantic-ui-react';
import axios from "axios";

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

import EntryDetails from "../components/EntryDetails";

interface RouteParams {id: string,}

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientDetails = async (patientId: string) => {
      try {
        console.log("getting details", patientId);
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch(e) {
        console.error(e);
      }
    };
    fetchPatientDetails(id);
  }, [id, modalOpen, dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log('submitting', values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if(!patientDetails) return <div>no record was found</div>;

  return (
  <div>
    <h2>{ patientDetails.name }</h2>
    <div>ssn: {patientDetails.ssn}</div>
    <div>occupation: { patientDetails.occupation }</div>
    <h3>entries</h3>
    <List celled>
      { Object.values(patientDetails.entries)
              .map((entry: Entry) => (
                <EntryDetails entry={entry} key={ entry.id } />
        ))}
    </List>
    <AddEntryModal
      modalOpen={modalOpen}
      onSubmit={submitNewEntry}
      error={error}
      onClose={closeModal}
    />
    <Button onClick={() => openModal()}>Add New Entry</Button>
  </div>
  );
};

export default PatientDetailsPage;
