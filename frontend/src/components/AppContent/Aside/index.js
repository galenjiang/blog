import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const MenuItem = Menu.Item;
export default class Aside extends Component {
    constructor() {
        super();
    }
    render() {
        return (React.createElement(Menu, { mode: "inline" },
            React.createElement(MenuItem, null,
                React.createElement(Link, { to: "/" },
                    React.createElement(Icon, { type: "pie-chart" }),
                    "\u6211\u7684\u4E3B\u9875"))));
    }
}
//# sourceMappingURL=index.js.map