import React, { Component } from 'react';
import update from 'immutability-helper';
import CSSModule from 'react-css-modules';

export default class Home extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (<h1>欢迎来到我的blog</h1>);
  }
}
