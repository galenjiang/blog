var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Home from '../../pages/HomePage';
import Article from '../../pages/Article';
import style from './style.M.less';
const MenuItem = Menu.Item;
const { Content } = Layout;
let AppContent = class AppContent extends Component {
    constructor() {
        super();
    }
    render() {
        return (React.createElement(Content, null,
            React.createElement(Router, null,
                React.createElement("div", null,
                    React.createElement(Menu, { mode: "horizontal" },
                        React.createElement(MenuItem, null,
                            React.createElement(Link, { to: "/" },
                                React.createElement(Icon, { type: "pie-chart" }),
                                "\u6211\u7684\u4E3B\u9875")),
                        React.createElement(MenuItem, null,
                            React.createElement(Link, { to: "/article" },
                                React.createElement(Icon, { type: "pie-chart" }),
                                "\u6211\u7684\u6587\u7AE0"))),
                    React.createElement(Route, { exact: true, path: "/", component: Home }),
                    React.createElement(Route, { path: "/article", component: Article })))));
    }
};
AppContent = __decorate([
    CSSModules(style)
], AppContent);
export default AppContent;
//# sourceMappingURL=index.js.map