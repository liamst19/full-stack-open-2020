import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    return res.send({
        height, weight,
        bmi: calculateBmi(height, weight)
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
