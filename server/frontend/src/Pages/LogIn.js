import { useState, useEffect } from 'react'
import '../Components/css/LoginSignup.scss'
import '../Components/css/Buttons.scss'
import forumImg from '../Components/img/signin.png'
import { useNavigate } from 'react-router-dom'
import Home from './Home'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

async function getCookie (name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

async function checkSession () {
  const sessionID = await getCookie('sessionID')
  console.log('sessionID', sessionID)
  if (sessionID !== undefined) {
    const res = await fetch('http://localhost:8080/check-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors'
      },
      body: JSON.stringify({ sessionID })
    })

    const data = await res.json()
    console.log(data.status)
    if (data.status === 'success') {
      return true
    }
  }
  return false
}

const styles = {
  back: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  divCenter: {
    width: 400,
    height: 400,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    padding: '1em 2em',
    borderBottom: '2px solid #ccc',
    display: 'table'
  },
  divContent: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}
function Login () {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  //CHECKING IF ALREADY LOGGED IN --> THEN REDIRECT TO HOME
  useEffect(() => {
    async function checkSessionAndNavigate () {
      if (await checkSession()) {
        setIsLoggedIn(true)
      }
    }
    checkSessionAndNavigate()
  }, [navigate])
  //////////////////////

  let HandleSubmit = async e => {
    e.preventDefault()
    try {
      console.log(1)

      await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
          logout: false
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.success === true) {
            sessionStorage.setItem('loggedIn', true)
            console.log(document.cookie)
            navigate('/', { replace: true })
            console.log('Login successful')
          } else {
            sessionStorage.setItem('loggedIn', false)
            setMessage('Username or password incorrect')
            console.log('U or P incorrect')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  return isLoggedIn ? (
    <Home />
  ) : (
    <div style={styles.back}>
      <div
        style={styles.divCenter}
        className='border border-light shadow bg-white rounded'
      >
        <div style={styles.divContent}>
          <Form onSubmit={HandleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicUsername'>
              <Form.Label className='fs-4'>Username</Form.Label>
              <Form.Control
                type='username'
                placeholder='Enter username'
                value={username}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label className='fs-4'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Text>{message}</Form.Text>

            <Button variant='outline-primary' type='submit' className='me-2'>
              Login
            </Button>
            <Button variant='outline-danger' onClick={Cancel}>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Cancel () {
  window.location.href = '/'
}

export default Login
