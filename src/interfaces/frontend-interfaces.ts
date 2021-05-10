export type StatusActivity = 'PLAYING' | 'LISTENING' | 'WATCHING';

export type TypedObject<T = any> = {[keys: string]: T};

export interface iEditable {
    isEditing?: boolean
}

export interface iError {
    message: string
    statusCode: number
}