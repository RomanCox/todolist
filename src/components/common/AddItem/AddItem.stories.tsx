import {ComponentMeta} from '@storybook/react';
import {AddItem} from './AddItem';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItem Component',
    component: AddItem,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} as ComponentMeta<typeof AddItem>;

const asyncCallback = async (...params: any[]) => {
    action('Button "add" was pressed inside the form')(...params);
}

export const AddItemBaseExample = (props: any) => {
    return <AddItem addItem={asyncCallback}/>
}

export const AddItemDisabledExample = (props: any) => {
    return <AddItem addItem={asyncCallback} disabled={true} />
}