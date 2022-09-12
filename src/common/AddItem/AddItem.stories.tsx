import {ComponentMeta} from '@storybook/react';
import {AddItem} from './AddItem';
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItem Component',
    component: AddItem,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} as ComponentMeta<typeof AddItem>;

const callback = action('Button "add" was pressed inside the form')

export const AddItemBaseExample = () => {
    return <AddItem addItem={callback} />
}