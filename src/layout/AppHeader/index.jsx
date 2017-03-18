import React, { Component } from 'react';
import { Layout } from 'antd';
import CSSModules from 'react-css-modules';
import style from './style.M.less';

const { Header } = Layout;


@CSSModules(style)
export default class AppHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Header>
        <span styleName="logo">BLOG</span>
      </Header>
    );
  }
}
