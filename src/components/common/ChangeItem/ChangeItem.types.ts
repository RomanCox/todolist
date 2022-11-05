export type ChangeItemPropsType = {
    title: string
    changeTitle: (newTitle: string) => void,
    setEditMode: (editMode: boolean) => void,
};