import {ComponentMeta} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} as ComponentMeta<typeof EditableSpan>;

const callback = action('Title changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'Edit Me'} changeTitle={callback} />
}