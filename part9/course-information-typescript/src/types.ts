
// export interface CoursePart {
//     name: string;
//     exerciseCount: number;
// }
// new types
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartWithDescription {
  name: "Exercise 9.15 CoursePart";
}

export type CoursePart =
    CoursePartOne
    | CoursePartTwo
    | CoursePartThree
    | CoursePartFour;

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
