import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/:id', (_req, res) => {
    console.log(_req.params.id);
    res.send(patientsService.getNonSensitivePatient(_req.params.id));
});

router.get('/', (_req, res) => {
    console.log('getting patients');
    res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
    try {
        const newPatient = toNewPatient(_req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

export default router;
