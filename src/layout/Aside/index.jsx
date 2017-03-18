import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const MenuItem = Menu.Item;

export default class Aside extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Menu
        mode="inline"
      >
        <MenuItem>
          <Link to="/">
            <Icon type="pie-chart" />
            我的主页
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}
