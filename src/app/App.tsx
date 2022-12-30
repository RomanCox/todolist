import React, {useCallback, useEffect} from 'react';
import {AppContainerStyled} from './AppStyled';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, LinearProgress, CircularProgress} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../features/TodoListsList';
import {ErrorSnackBar} from '../components/common/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {useActions} from '../utils/reduxUtils';
import {appAsyncActions} from '../features/Application';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {selectIsInitialized, selectStatus} from '../features/Application/selectors';
import {authActions, authSelectors, Login} from '../features/Auth';
import {AppPropsType} from './App.types';

export const App = (props: AppPropsType) => {
    const status = useSelector(selectStatus);
    const isInitialized = useSelector(selectIsInitialized);
    const isLoggedIn = useSelector(authSelectors.selectorIsLoggedIn);
    const {logout} = useActions(authActions);
    const {initializeApp} = useActions(appAsyncActions);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isInitialized) {
            initializeApp();
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout();
        navigate('/login');
    }, [])

    if (!isInitialized) {
        return <CircularProgress style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}/>
    }

    return (
        <AppContainerStyled>
            <ErrorSnackBar/>
            <AppBar position={'fixed'} style={{width: '100%', maxWidth: '1440px', top: '0', left: '0', margin: '0 auto'}}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{width: '100%', height: '100%', maxWidth: '1440px', margin: '64px 0 0'}}>
                <Routes>
                    <Route path='/' element={<TodoListsList demo={false} />}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </AppContainerStyled>
    );
};

