import React from 'react'
import { Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Login from './Login'
import Quotes from './QuoteList'

export function Container(props) {
  const history = useHistory()

  const onLogout = (evt) => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <div className='container'>
      <nav>
        <span>
          <NavLink exact to='/'>Quotes</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </span>
        <button onClick={onLogout}>Logout</button>
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
