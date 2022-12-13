
export interface User {
    id: number,
    name: string,
    email: string,
}

export interface Activities {
    id: number,
    name: string,
    description: string,
    status: number,
    createdAt: string,
    closedAt: string
}

export interface ActivitiesStatus {
    onGoing: number,
    finished: number,
    interrupted: number
}