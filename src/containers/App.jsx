import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import AppHeader from '../layout/AppHeader';
import AppContent from '../layout/AppContent';
import AppFooter from '../layout/AppFooter';
import FourOFour from '../pages/404';

import style from './style.M.less';


@CSSModules(style)
class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    );
  }
}


export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router>
          <section>
            <Switch>
              <Route path="/" component={Main} />
              <Route path="*" component={FourOFour} />
            </Switch>
          </section>
        </Router>
      </div>

    );
  }
}
