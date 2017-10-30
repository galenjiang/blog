import React, { Component } from 'react';
import { Layout } from 'antd';
import CSSModules from 'react-css-modules';

import style from './style.M.less';

const { Footer } = Layout;


@CSSModules(style)
export default class AppFooter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Footer><div styleName="right">blog©2017 Created by Galen</div></Footer>
    );
  }
}
