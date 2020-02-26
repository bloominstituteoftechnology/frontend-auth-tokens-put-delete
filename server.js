const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

let quotes = [
  {
    id: uuid(),
    author: 'Dr. Seuss',
    text: "Don't cry because it's over, smile because it happened.",
  },
  {
    id: uuid(),
    author: 'Frank Zappa',
    text: "So many books, so little time.",
  },
  {
    id: uuid(),
    author: 'Oscar Wilde',
    text: "Be yourself everyone else is already taken.",
  },
]

function getAllQuotes(req, res) {
  res.json(quotes)
}

function getQuoteById(req, res) {
  res.json(quotes.find(friend => friend.id === req.params.id))
}

function postNewQuote(req, res) {
  const quote = { id: uuid(), ...req.body }
  quotes.push(quote)
  res.json(quote)
}

function deleteQuoteById(req, res) {
  quotes = quotes.filter(friend => friend.id !== req.params.id)
  res.json(req.params.id)
}

function replaceQuoteById(req, res) {
  const { id } = req.params
  const updatedQuote = { id, ...req.body }
  quotes = quotes.map(q => {
    if (q.id === id) {
      return updatedQuote
    }
    return q
  })
  res.json(updatedQuote)
}

function login(req, res) {
  const { username, password } = req.body
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ userId: 'abcd' }, 'shhhhh')
    res.json({ token })
  } else {
    res.status(401).json({ message: 'No idea who you are'})
  }
}

function authCheck(req, res, next) {
  const token = req.headers.authorization
  try {
    jwt.verify(token, 'shhhhh') // no joy -> crash with an error
    next()
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

// endpoint to exchange valid credentials for token
app.post('/login', login)

// endpoints that require valid token to work
app.get('/api/quotes', authCheck, getAllQuotes)
app.get('/api/quotes/:id',authCheck, getQuoteById)
app.post('/api/quotes',authCheck, postNewQuote)
app.delete('/api/quotes/:id',authCheck, deleteQuoteById)
app.put('/api/quotes/:id',authCheck, replaceQuoteById)

app.listen(3333, () => console.log(
  'Quotes server listening on port 3333!',
))
