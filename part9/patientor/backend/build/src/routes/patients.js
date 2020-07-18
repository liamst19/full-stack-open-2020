"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const newpatient_1 = require("../utils/newpatient");
const newentry_1 = require("../utils/newentry");
const router = express_1.default.Router();
router.post('/:id/entries', (_req, res) => {
    console.log('adding entry');
    try {
        const newEntry = newentry_1.toNewEntry(_req.body);
        const addedPatient = patientsService_1.default.addEntryToPatient(_req.params.id, newEntry);
        res.json(addedPatient);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});
router.get('/:id', (_req, res) => {
    console.log('getting patient details:', _req.params.id);
    res.send(patientsService_1.default.getNonSensitivePatient(_req.params.id));
});
router.get('/', (_req, res) => {
    console.log('getting patients');
    res.send(patientsService_1.default.getNonSensitivePatients());
});
router.post('/', (_req, res) => {
    try {
        const newPatient = newpatient_1.toNewPatient(_req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});
exports.default = router;
