import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from '../axiosWithAuth'

const quotesURL = 'http://localhost:3333/api/quotes'

export default function Quotes() {
  const [quotes, setQuotes] = useState([])
  const [currentQuoteId, setCurrentQuoteId] = useState(null)

  const getAllQuotes = () => {
    axios().get(quotesURL) // the replacement axios is a bit diff and has to be invoked
      .then(response => {
        setQuotes(response.data)
      })
      .catch(error => {
        debugger
      })
  }

  useEffect(() => {
    getAllQuotes()
  }, [])

  const getCurrentQuote = () => {
    // We need a utility function that can look at the
    // `currentQuoteId` and fish out the complete quote
    // object from the `quotes` slice of state
    return quotes.find(quote => quote.id === currentQuoteId)
  }

  const updateQuote = ({ id, text, author }) => {
    // We need to hit the quotesURL with a PUT request.
    // the id of the quote that needs replacing will go
    // at the end of the url (don't forget the forward slash)
    // The payload of the request will be both `text` and `author`.
    // On success we should make the form disappear and fetch all quotes.
    axios().put(`${quotesURL}/${id}`, { text, author }) // the replacement axios is a bit diff and has to be invoked
      .then(res => {
        setCurrentQuoteId(null) // very prudent
        getAllQuotes()
      })
      .catch(error => {
        debugger
        console.error(error)
      })
  }

  const deleteQuote = (id) => {
    // We need to hit the quotesURL with a DELETE request.
    // the id of the quote that needs deleting will go
    // at the end of the url (don't forget the forward slash)
    // On success we show the updated quotes WITHOUT REFETCHING
    axios().delete(`${quotesURL}/${id}`) // the replacement axios is a bit diff and has to be invoked
      .then(response => {
        setCurrentQuoteId(null) // very prudent
        setQuotes(quotes.filter(quote => quote.id !== id))
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='quotes'>
      <ul>
        {
          quotes.map(q => (
            <li key={q.id}>
              <div>{q.text} ({q.author})</div>
              <button onClick={evt => setCurrentQuoteId(q.id)}>edit</button>
              <button onClick={evt => deleteQuote(q.id)}>del</button>
            </li>
          ))
        }
      </ul>
      {
        currentQuoteId &&
        <Formik
          // If the key of a component changes, the component is re-mounted
          key={currentQuoteId}
          initialValues={{
            text: getCurrentQuote().text,
            author: getCurrentQuote().author,
          }}
          onSubmit={({ text, author }) => {
            updateQuote({
              id: currentQuoteId,
              text,
              author,
            })
          }}
        >
          {
            props => (
              <Form>
                <Field name='text' />
                <ErrorMessage name='text' component='span' />

                <Field name='author' />
                <ErrorMessage name='author' component='span' />

                <input type='submit' />
              </Form>
            )
          }
        </Formik>
      }
    </div>
  )
}
