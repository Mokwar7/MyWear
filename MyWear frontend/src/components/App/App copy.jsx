import './App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import Catalog from '../Catalog/Catalog'
import Card from '../Card/Card'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import React from 'react'
import { CurrentUserContext } from '../../contexts/currentUserContext'
import Contacts from '../Contacts/Contacts'
import Delivery from '../Delivery/Delivery'

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLogged, setIsLogged] = React.useState(false)
  const nav = useNavigate();


  function auth() {
    fetch('http://localhost:3000/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setCurrentUser(res.data)
        setIsLogged(true)
        if (localStorage.getItem('lastPage') != null) {
          let lastPage = '' + localStorage.getItem('lastPage')
          nav(`${lastPage}`, { replace: true })
        } else { nav('/catalog', { replace: true }) }
      })
      .catch(err => console.log(err))
  }

  function handleLogin(email, password) {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
      body: JSON.stringify({
        'password': password,
        'email': email,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        fetch('http://localhost:3000/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
          },
        })
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            console.log(res)
            setCurrentUser(res.data)
            setIsLogged(true)
            nav('/catalog', { replace: true })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function handleExit() {
    localStorage.removeItem('jwt')
    nav('/', { replace: true })
    setIsLogged(false)
  }

  function handleUpdateName(name) {
    fetch('http://localhost:3000/users/me/name', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
      body: JSON.stringify({
        'name': name,
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch(err => console.log(err))
  }

  function handleUpdateTg(tg) {
    fetch('http://localhost:3000/users/me/tg', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
      body: JSON.stringify({
        'tg': tg,
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    localStorage.getItem('jwt') != null ?
      fetch('http://localhost:3000/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
        },
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          setCurrentUser(res.data)
          setIsLogged(true)
        })
        .catch(err => console.log(err)) : false
  }, [])

  
  function addToCart() {

  }

  function removeFromCart() {

  }

  function addCountToCart() {

  }

  function removeCountFromCart() {

  }

  function cleanCart() {

  }

  function getCart() {

  }

  function getGoodFromCart() {
    
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/delivery_payment" element={<Delivery />} />
        <Route path="/catalog/*" element={<Card isLogged={isLogged} />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/register" element={<Register auth={auth} />} />
        <Route path="/profile" element={<Profile handleExit={handleExit} handleUpdateName={handleUpdateName} handleUpdateTg={handleUpdateTg} />} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App
