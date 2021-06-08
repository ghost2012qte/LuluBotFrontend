import { StatusActivity } from "./frontend-interfaces";

export interface iStatus {
    activity: StatusActivity
    text: string
    __v: number
    _id: string
}

export interface iQuiz {
    title: string
    questions: iQuestion[]
    __v: number
    _id: string
}

export interface iQuestion {
    answers: any[]
    text: string
    _id: string
}