import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Home from '../../pages/HomePage';
import Article from '../../pages/Article';

import style from './style.M.less';

const MenuItem = Menu.Item;
const { Content } = Layout;

@CSSModules(style)
export default class AppContent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Content>
        <Router>
          
          {/*<Route
            path="/"
            component={({ match }) => <section>
              <Switch>
                
              </Switch>
            </section>}
          />*/}
          <div>
            <Menu
              mode="horizontal"
            >
              <MenuItem>
                <Link to="/">
                  <Icon type="pie-chart" />
                  我的主页
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/article">
                  <Icon type="pie-chart" />
                  我的文章
                </Link>
              </MenuItem>
            </Menu>
            <Route exact path="/" component={Home} />
            <Route path="/article" component={Article} />
          </div>
        </Router>
      </Content>
    );
  }
}
