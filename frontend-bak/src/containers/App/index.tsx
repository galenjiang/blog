import * as React from 'react'
import './style.css'
import head from './img/head.jpg'
import * as cs from 'classnames'
// import CSSModules from 'react-css-modules';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// interface InterfaceAppProps {
// }

interface InterfaceAppStates {
  navBarShow: boolean
}

export default class App extends React.Component<{}, InterfaceAppStates> {


  constructor(props: any) {

    super(props)
    this.state = {
      navBarShow: false
    }
  }

  toggleNavbarShow = () => {
    const navBarShow = !this.state.navBarShow
    this.setState({
      navBarShow
    })
  }

  render() {
    const { navBarShow } = this.state
    return (
      <div className="app-wrapper d-flex flex-column">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#">
              <img src={ head } width="80" height="80" alt="head-image"/>
              <span className="p-3 title">呱呱之家</span>
            </a>
            <button
              onClick={ this.toggleNavbarShow }
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={ cs('collapse', 'navbar-collapse', { show: navBarShow }) }>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">主页</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">文章</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">关于</a>
                </li>
              </ul>
            </div>

          </nav>
        </header>
        <section className="container app-body">
          <article className="text-center slogon">
            儿子呱呱成长的日记
          </article>
        </section>
      </div>
    )
  }
}
