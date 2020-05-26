
/* Exercise 9.1 Body mass index
Write a function calculateBmi that counts BMI based on given weight
(in kilograms) and height (in centimeters) and then returns a message
that suits the results.
*/

function calculateBmi(height: number, weight: number): string {
    // The BMI is universally expressed in kg/m2, resulting from mass
    // in kilograms and height in metres.
    const bmi = weight / (height * height);

    if (bmi < 0 || bmi > 100) {
        throw Error('calculated bmi is off the scale');
    }

    const bmiScale = [
        {
            text: 'Very severely underweight',
            from: 0, to: 15
        },
        {
            text: 'Severely underweight',
            from: 15, to: 16
        },
        {
            text: 'Underweight',
            from: 16, to: 18.5
        },
        {
            text: 'Normal (healthy weight)',
            from: 18.5, to: 25
        },
        {
            text: 'Overweight',
            from: 25, to: 30
        },
        {
            text: 'Obese Class I (Moderately obese)',
            from: 30, to: 35
        },
        {
            text: 'Obese Class II (Severely obese)',
            from: 35, to: 40
        },
        {
            text: 'Obese Class III (Very severely obese)',
            from: 40, to: 100
        }
    ];

    return bmiScale.filter(c => bmi > c.from && bmi < c.to)[0].text;
}

// interface BmiValues {
//     weight: number;
//     height: number;
// }

// function parseArguments(args: Array<string>): BmiValues {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]) / 100,
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

// try {
//     const { height, weight } = parseArguments(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }

// console.log(calculateBmi(180, 74))

export default calculateBmi
