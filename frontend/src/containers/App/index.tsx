import * as React from 'react'
import './style.css'
import head from './img/head.jpg'
import * as cs from 'classnames'
// import CSSModules from 'react-css-modules';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

interface InterfaceAppProps {
  // title?: string
}

interface InterfaceAppStates {
  navbarShow: boolean
}

export default class App extends React.Component<InterfaceAppProps, InterfaceAppStates> {


  constructor(props: InterfaceAppProps) {

    super(props)
    this.state = {
      navbarShow: false
    }
  }
  toggleNavbarShow = () => {
    const navbarShow = !this.state.navbarShow
    this.setState({
      navbarShow
    })
  }
  render() {
    // const { title } = this.props
    const { navbarShow } = this.state
    return (
      <div className="app-wrapper">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#">
              <img src={head} width="80" height="80" alt="head-image" />
              呱呱之家
            </a>
            <button onClick={this.toggleNavbarShow} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={cs('collapse', 'navbar-collapse', { show: navbarShow })}>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Archive</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <section className="container app-body">
          内容1
        </section>
      </div>
    )
  }
}
