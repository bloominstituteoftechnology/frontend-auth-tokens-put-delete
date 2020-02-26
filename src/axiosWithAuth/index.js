import axios from 'axios'

export default function withAuth() {
  // this code runs every time,
  // to pull CURRENT token from local storage
  // and add it to the request
  const token = localStorage.getItem('token') ?? ''

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    }
  })
  return instance
}

// THE NORMAL AXIOS
// axios.get
// axios.post

// THE REPLACEMENT AXIOS
// axios().get
// axios().post
// ...etc
