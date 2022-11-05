import {OverridableStringUnion} from '@mui/types';
import {ButtonPropsColorOverrides} from '@mui/material/Button/Button';
import {TodoListType} from "../../../api/todoListsAPI.types";
import {AppStatusesType} from "../../Application";

export type TodoListPropsType = {
    todoList: TodoListDomainType
    changeTodoListTitle: (params: { id: string, title: string }) => void,
    demo?: boolean,
};

export type ColorType = OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides>;

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: AppStatusesType,
};