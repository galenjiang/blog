import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '../containers/App'

const render = (Comp: any) => {
  ReactDOM.render(
    <AppContainer>
      <Comp />
    </AppContainer>,
    document.getElementById('app'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if ((module as any).hot) {
  (module as any).hot.accept('../containers/App/index', () => { render(App) })
}
