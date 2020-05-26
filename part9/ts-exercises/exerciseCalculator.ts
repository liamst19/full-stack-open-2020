/* Exercise 9.2 Exercise calculator

   Write a function calculateExercises that calculates the average time
   of daily exercise hours and compares it to the target amount of daily
   hours and returns an object that includes the following values:

     - the number of days
     - the number of training days
     - the original target value
     - the calculated average time
     - boolean value describing if the target was reached
     - a rating between the numbers 1-3 that tells how well the hours are
       met. You can decide on the metric on your own.
     - a text value explaining the rating

   The daily exercise hours are given to the function as an array that
   contains the number of exercise hours for each day in the training
   period. Eg. a week with 3 hours of training at Monday, none at
   Tuesday, 2 hours at Wednesday, 4.5 hours at Thursday and so on would
   be represented by the following array:

     [3, 0, 2, 4.5, 0, 3, 1]

   If you would call the function with parameters [3, 0, 2, 4.5, 0, 3, 1]
   and 2 it could return

   { periodLength: 7,
     trainingDays: 5,
     success: false,
     rating: 2,
     ratingDescription: 'not too bad but could be better',
     target: 2,
     average: 1.9285714285714286 }

*/

interface ExerciseStats {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Rating {
    rating: number,
    ratingDescription: string
}

function getRating(average: number, target: number): Rating {

    const min = -100;
    const max = 100;

    const difference = average - target;
    if (difference < min || difference > max) {
        return {
            rating: 0,
            ratingDescription: 'you should reconsider your target or there is something wrong with the data'
        };
    }

    const ratingScale = [
        {
            rating: 1,
            description: 'Perhaps you should set a more achievable goal',
            from: min, to: -10
        },
        {
            rating: 2,
            description: 'Come on, you can do better!',
            from: -10, to: 0
        },
        {
            rating: 3,
            description: 'You\'re right on your mark, keep at it',
            from: 0, to: 5
        },
        {
            rating: 4,
            description: 'You\'re doing terrific',
            from: 5, to: 10
        },
        {
            rating: 5,
            description: 'You\'re making it too easy for yourself',
            from: 10, to: max
        }
    ];

    const rating = ratingScale.filter(s => difference >= s.from && difference <= s.to)[0];
    return {
        rating: rating.rating,
        ratingDescription: rating.description
    };
}

function calculateExercise(data: number[], target: number): ExerciseStats {

    const average = data.reduce((sum, d) => sum + d, 0) / data.length;

    return {
        target,
        average,
        success: average > target,
        periodLength: data.length,
        trainingDays: data.filter(d => d > 0).length,
        ...getRating(average, target)
    };
}

// interface ExerciseData {
//     target: number;
//     exerciseData: Array<number>;
// }

// function parseArguments(args: Array<string>): ExerciseData {
//     if (args.length < 3) throw new Error('Not enough arguments');

//     const target = Number(args[2]);
//     const exerciseData = args.slice(3).map(n => Number(n));

//     if (!isNaN(target) && exerciseData.every(d => !isNaN(Number(d)))) {
//         return { target, exerciseData };
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

// try {
//     const { target, exerciseData } = parseArguments(process.argv);
//     console.log(calculateExercise(exerciseData, target));
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);

// }


// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));

export default calculateExercise;
