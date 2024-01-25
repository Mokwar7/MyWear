import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css'
import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function Login({ auth }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorCode, setErrorCode] = React.useState('')
  const [formValid, setFormValid] = React.useState(true)
  const [errorCodeEmail, setErrorCodeEmail] = React.useState('')
  const [errorCodePassword, setErrorCodePassword] = React.useState('')
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const nav = useNavigate()

  if (localStorage.getItem('jwt') != null) {
    nav('/profile', { replace: true })
  }

  React.useEffect(() => {
    if (errorCodeEmail || errorCodePassword) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorCodeEmail, errorCodePassword])

  function handleChangeEmail(e) {
    setEmail(e.target.value)

    if (!regexEmail.test(String(e.target.value).toLowerCase())) {
      setErrorCodeEmail('Некорректная почта')

      if (!e.target.value) {
        setErrorCodeEmail('Почта не может быть пустой')
      }
    } else {
      setErrorCodeEmail('')
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)

    if (e.target.value.length < 8) {
      setErrorCodePassword('Пароль должен быть длиннее 8 символов')

      if (!e.target.value) {
        setErrorCodePassword('Пароль не может быть пустым')
      }
    } else if (e.target.value.length > 30) {
      setErrorCodePassword('Пароль должен быть короче 30 символов')
    } else {
      setErrorCodePassword('')
    }
  }
  console.log(localStorage.getItem('lastPage'))

  function handleLogin(e) {
    e.preventDefault()
    setErrorCode('')
    setFormValid(false)
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
        auth()
      })
      .catch((err) => {
        setErrorCode('Неправильная почта или пароль')
        setFormValid(true)
      })
  }

  return (
    <section className='login'>
      <form action="" className="login__form" onSubmit={handleLogin}>
        <h1 className="login__header">Авторизация</h1>
        <h2 className="login__subheader">Рады видеть вас снова!</h2>
        <input type="email" className="login__input" placeholder='Email' lang='en' value={email} onChange={handleChangeEmail} />
        <p className="login__error_value login__error">{errorCodeEmail}</p>
        <input type="password" className="login__input" placeholder='Пароль' min={8} lang='en' value={password} onChange={handleChangePassword} />
        <p className="login__error_value login__error">{errorCodePassword}</p>
        <button className="login__btn" disabled={!formValid}>Войти</button>
        <p className="login__error">{errorCode}</p>
        <p className="login__txt">Нажимая кнопку “Войти” вы даёте своё согласие на обработку персональных данных.</p>
        <NavLink to='/register' className='login__btn login__link'>Зарегистрироваться</NavLink>
        <GoogleLogin
          clientId='1047463722616-sq5irji58b0jrqfeiv7f7liid50hi9ae.apps.googleusercontent.com'
          buttonTest='Login'
          onSuccess={res => {
            console.log(res)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </form>
    </section>
  )
}

export default Login