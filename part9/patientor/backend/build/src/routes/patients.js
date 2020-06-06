"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitivePatients());
});
router.post('/', (_req, res) => {
    try {
        const newPatient = utils_1.default(_req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});
exports.default = router;
