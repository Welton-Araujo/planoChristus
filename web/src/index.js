import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from "./components/Layout"
import Routes from './routes'
import store from './store'

import './styles/global.css'

import styleConfig from './data/style.json'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout style={styleConfig.customize0}>
        <Routes/>
      </Layout>
    </BrowserRouter>
  </Provider>
)
