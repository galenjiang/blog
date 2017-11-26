var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { Layout } from 'antd';
import CSSModules from 'react-css-modules';
import style from './style.M.less';
const { Footer } = Layout;
let AppFooter = class AppFooter extends Component {
    constructor() {
        super();
    }
    render() {
        return (React.createElement(Footer, null,
            React.createElement("div", { styleName: "right" }, "blog\u00A92017 Created by Galen")));
    }
};
AppFooter = __decorate([
    CSSModules(style)
], AppFooter);
export default AppFooter;
//# sourceMappingURL=index.js.map