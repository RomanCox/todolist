import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatchType} from './reduxUtils.types';

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, []);

    return boundActions;
}