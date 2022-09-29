const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
};

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error}} as const);
export const setAppStatusAC = (status: AppStatusesType) => ({type: 'APP/SET-STATUS', payload: {status}} as const);

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>
export type AppActionsType = SetErrorActionType | SetStatusActionType

export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
};

export type AppStatusesType = 'idle' | 'loading' | 'succeeded' | 'failed';