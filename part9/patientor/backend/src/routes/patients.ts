import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
    const newPatient = patientsService.addPatient({
        name, dateOfBirth, ssn, gender, occupation
    })
    res.send(newPatient)
});

export default router;
