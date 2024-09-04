export type Quiz = {
    id: number
    name: string
    description: string
    idcompany: number
    status: string
    asks: Ask[]
}

export type Ask = {
    id: number
    description: string
    idquiz: number
    quiz: string
    quiz_description: string
    idcompany: number
    idtype_response: number
    type_response: string
    status: string
    answers: Answer[]
}

export type Answer = {
    id: number
    description: string
    idask: number
    ask: string
    idquiz: number
    idtype_response: number
    correct: string
    status: string
}

export type QuizeComplete = {
    id: number;
    iduser: number;
    user: string;
    user_n_document: string;
    idquiz: number;
    quiz: string;
    description: string;
    idcompany: number;
    date: string;
    correct_answers: string;
    status: string;
    details: QuizeCompleteDet[]
}

export type QuizeCompleteDet = {
    id: number;
    idquiz_complete: number;
    idask: number;
    ask: string;
    idtype_response: number;
    idanswer: number;
    answer: string;
    is_correct: string;
    status: string;
}