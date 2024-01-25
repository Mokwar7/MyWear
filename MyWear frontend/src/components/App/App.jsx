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
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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

  const [cart, setCart] = React.useState([])

  function addToCart(article, name, brand, size, price, thumbnail) {
    fetch(`http://localhost:3000/cart/${article}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
      body: JSON.stringify({
        "name": name,
        "brand": brand,
        "size": size,
        "price": price,
        "thumbnail": thumbnail
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        getCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function removeFromCart(art) {
    fetch(`http://localhost:3000/cart/${art}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        getCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function addCountToCart(art, e) {
    fetch(`http://localhost:3000/cart/${art}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        e != undefined ? e.target.closest('.cart__count-cont').querySelector('.cart__brand').textContent = res.count + 1 : false
        getCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function removeCountFromCart(art, e) {
    fetch(`http://localhost:3000/cart/${art}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        e.target.closest('.cart__count-cont').querySelector('.cart__brand').textContent = res.count - 1
        getCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function cleanCart() {
    fetch(`http://localhost:3000/cart/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        setCart([])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getCart() {
    fetch(`http://localhost:3000/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        setCart(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getGoodFromCart() {

  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLogged={isLogged}
        getCart={getCart}
        cleanCart={cleanCart}
        removeCountFromCart={removeCountFromCart}
        addCountToCart={addCountToCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cart={cart} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/delivery_payment" element={<Delivery />} />
        <Route path="/catalog/*" element={<Card
          isLogged={isLogged}
          cart={cart}
          getCart={getCart}
          removeCountFromCart={removeCountFromCart}
          addCountToCart={addCountToCart}
          addToCart={addToCart}
          removeFromCart={removeFromCart} />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/register" element={<Register auth={auth} />} />
        <Route path="/profile" element={<Profile handleExit={handleExit} handleUpdateName={handleUpdateName} handleUpdateTg={handleUpdateTg} />} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App
