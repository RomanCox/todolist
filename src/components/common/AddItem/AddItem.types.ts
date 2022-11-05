export type AddItemFormSubmitHelperType = {
    setTitle: (title: string) => void,
    setError: (error: string) => void,
}
export type AddItemPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void,
    disabled?: boolean,
    placeHolder?: string,

}