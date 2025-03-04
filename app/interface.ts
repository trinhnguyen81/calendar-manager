export interface Exercises {
    id?: number;
    name?: string;
    numberOfSets?: number;
    setInformation?: string;
}

export interface Workout {
    id: string;
    name: string;
    exercises: Exercises[]
}
