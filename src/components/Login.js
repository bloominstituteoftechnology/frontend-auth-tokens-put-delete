import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const loginURL = 'http://localhost:3333/login'

export default function Login(props) {
  const history = useHistory()
  const onLogin = ({ username, password }) => {
    axios.post(
      loginURL,
      { username, password }
    )
      .then(res => {
        // successful login is not redirecting! :(
        localStorage.setItem('token', res.data.token)
        history.push("/")
      })
      .catch(error => {
        debugger
      })
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onLogin}
    >
      {
        props => (
          <Form className='login'>
            <Field name='username' type="text" placeholder='username' />
            <Field name='password' type="text" placeholder='password' />
            <input type='submit' />
          </Form>
        )
      }
    </Formik>
  )
}
