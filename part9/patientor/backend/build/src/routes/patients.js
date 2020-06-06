"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitivePatients());
});
router.post('/', (_req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
    const newPatient = patientsService_1.default.addPatient({
        name, dateOfBirth, ssn, gender, occupation
    });
    res.send(newPatient);
});
exports.default = router;