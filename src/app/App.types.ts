export type AppPropsType = {
    demo?: boolean,
};

export type TodoListsListPropsType = AppPropsType & {
    navigateToLogin: void
}

export type AppStatusesType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: AppStatusesType,
    error: string | null,
    isInitialized: boolean,
};