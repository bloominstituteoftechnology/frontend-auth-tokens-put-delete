import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from '../axiosWithAuth'

const quotesURL = 'http://localhost:3333/api/quotes'

export default function Quotes() {
  const [quotes, setQuotes] = useState([])
  const [currentQuoteId, setCurrentQuoteId] = useState(null)

  const getAllQuotes = () => {
    axios().get(quotesURL)
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
    const currentQuote = quotes.find(quote => quote.id === currentQuoteId)
    // We need a utility function that can look at the
    // `currentQuoteId` and fish out the complete quote
    // object from the `quotes` slice of state
    // Please return the whole quote object!
    return currentQuote
  }

  const updateQuote = ({ id, text, author }) => {
    // We need to hit the quotesURL with a PUT request.
    // the id of the quote that needs replacing will go
    // at the end of the url (don't forget the forward slash)
    // The payload of the request will be both `text` and `author`.
    // On success we should make the form disappear and fetch all quotes.

    // IS THIS EVEN BEING CALLED????
    axios()
      .put(`${quotesURL}/${id}`, { text, author })
      .then(res => {
        // remember to check res using the debugger!!!!!!!
        // A- MAKE FORM DISAPPEAR
        setCurrentQuoteId(null)
        // B- TWO OPTIONS TO UPDATE THE LIST OF QUOTES
        //   1- trigger a re-fetch // getAllQuotes() // extra AJAX request
        //   2- manipulate the slice of state "quotes" to replace the
        //      correct quote with the updated quote inside res.data
        setQuotes(currentQuotes => {
          return currentQuotes.map(q => {
            if (q.id === id) {
              return res.data
            }
            return q
          })
        })
      })
      .catch(err => {
        debugger
      })
  }

  const deleteQuote = (id) => {
    debugger
    // We need to hit the quotesURL with a DELETE request.
    // the id of the quote that needs deleting will go
    // at the end of the url (don't forget the forward slash)
    // On success we show the updated quotes WITHOUT REFETCHING
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
          // If the key of a component changes
          // the form gets re-mounted with fresh "initialValues"
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
                <Field name='text' placeholder='text' />
                <ErrorMessage name='text' component='span' />

                <Field name='author' placeholder='author' />
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
