import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../containers/App';
const render = (Comp) => {
    ReactDOM.render(React.createElement(AppContainer, null,
        React.createElement(Comp, null)), document.getElementById('app'));
};
render(App);
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../containers/App/index', () => { render(App); });
}
//# sourceMappingURL=test.js.map