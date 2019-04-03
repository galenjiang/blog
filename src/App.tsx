import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './containers/Home/index'
import { NotFound } from './components/404'
import { withRouterDynamicDynamicArticle } from './containers/Article/index'

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/article/:name"
          component={withRouterDynamicDynamicArticle}
        />
        <Route path="*" render={NotFound} />
      </Switch>
    </Router>
  )
}
