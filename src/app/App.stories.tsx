import {App} from './App';
import {HashRouterDecorator, ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
}

export const AppBaseExample = () => {
    return <App />
}