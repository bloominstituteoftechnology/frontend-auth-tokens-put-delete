import React from 'react'
import { Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import Login from './Login'
import Quotes from './QuoteList'

export function Container(props) {
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
        {/* <Route path='/login' component={Login} /> */}
        <Route path='/login'>
          <Login foo='bar' />
        </Route>

        {/* we need to fix this so we can't do this route
        unless there is a token in local storage */}
        {/* <Route exact path='/' component={Quotes} /> */}

        <RouteProtected exact path='/'>
          <Quotes />
        </RouteProtected>
      </main>
    </div>
  )
}

function RouteProtected({ children, ...rest }) {
  // pull token from local storage
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
