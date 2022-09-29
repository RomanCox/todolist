import React from 'react';
import {AppContainerStyled} from './AppStyled';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, LinearProgress } from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../features/TodoListsList/TodoListsList';
import {ErrorSnackBar} from '../components/common/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {AppStatusesType} from './appReducer';

type AppPropsType = {
    demo?: boolean,
}

export const App = ({demo = false}: AppPropsType) => {
    const status = useSelector<AppRootStateType, AppStatusesType>(state => state.app.status);

    return (
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
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
                { status === 'loading' && <LinearProgress /> }
            </AppBar>
            <Container fixed>
                <TodoListsList demo={demo} />
            </Container>
        </AppContainerStyled>
    );
};

