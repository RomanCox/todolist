import React, {useCallback, useEffect} from 'react';
import {AppContainerStyled} from './AppStyled';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, LinearProgress, CircularProgress} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../features/TodoListsList/TodoListsList';
import {ErrorSnackBar} from '../components/common/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType, useAppDispatch} from './store';
import {AppStatusesType, initializeAppTC} from './appReducer';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/authReducer';

type AppPropsType = {
    demo?: boolean,
}

export const App = ({demo = false}: AppPropsType) => {
    const status = useSelector<AppRootStateType, AppStatusesType>(state => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgress style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}/>
    }

    return (
        <BrowserRouter>
            <AppContainerStyled>
                <ErrorSnackBar/>
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path='/' element={<TodoListsList demo={demo}/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to='/404' />}/>
                    </Routes>
                </Container>
            </AppContainerStyled>
        </BrowserRouter>
    );
};

