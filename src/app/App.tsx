import React from 'react';
import {AppContainer} from './AppStyled';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodoListsList} from '../features/TodoListsList/TodoListsList';

export const App = () => {

    return (
        <AppContainer>
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
            </AppBar>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </AppContainer>
    );
};

