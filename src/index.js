import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from './components/Container'
import './index.css'

ReactDOM.render(
  <Router>
    <Container />
  </Router>,
  document.querySelector('#root'),
)
