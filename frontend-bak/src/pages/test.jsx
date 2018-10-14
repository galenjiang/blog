"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_hot_loader_1 = require("react-hot-loader");
var App_1 = require("../containers/App");
var render = function (Comp) {
    ReactDOM.render(<react_hot_loader_1.AppContainer>
      <Comp />
    </react_hot_loader_1.AppContainer>, document.getElementById('app'));
};
render(App_1.default);
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../containers/App/index', function () { render(App_1.default); });
}
