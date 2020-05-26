import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercise from './exerciseCalculator';
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

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

app.post('/exercises', (req, res) => {

    if (!req.body.daily_exercises || !req.body.target) {
        return res.status(400).json({
            error: 'missing parameters'
        });
    }

    const exerciseData = req.body.daily_exercises.map((d: string) => Number(d));
    const target = Number(req.body.target);

    if (isNaN(target)
        || !exerciseData.every((d: number) => !isNaN(d))) {
        return res.status(400).json({
            error: 'malformed parameters'
        });
    }

    return res.json(calculateExercise(exerciseData, target))
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
