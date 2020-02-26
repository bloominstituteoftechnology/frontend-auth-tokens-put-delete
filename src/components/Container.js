import React from 'react'
import { Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import Login from './Login'
import Quotes from './QuoteList'

export function Container(props) {
  // implement logout functionality
  return (
    <div className='container'>
      <nav>
        <span>
          <NavLink exact to='/'>Quotes</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </span>
        <button>Logout</button>
      </nav>

      <main>
        <Route path='/login'>
          <Login foo='bar' />
        </Route>

        <RouteProtected exact path='/'>
          <Quotes />
        </RouteProtected>
      </main>
    </div>
  )
}

function RouteProtected({ children, ...rest }) {
  const tokenExists = localStorage.getItem('token')
  return (
    <Route {...rest}>
      {
        tokenExists
          ? children
          : <Redirect to='/login' />
      }
    </Route>
  )
}

export default withRouter(Container)
