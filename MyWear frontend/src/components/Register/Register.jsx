import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Register({ auth }) {
  const [name, setName] = React.useState('')
  const [tg, setTg] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorCode, setErrorCode] = React.useState('')
  const [errorCodeName, setErrorCodeName] = React.useState('')
  const [errorCodeTg, setErrorCodeTg] = React.useState('')
  const [errorCodeEmail, setErrorCodeEmail] = React.useState('')
  const [errorCodePassword, setErrorCodePassword] = React.useState('')
  const [formValid, setFormValid] = React.useState(false)
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const regexTg = /^@/
  const nav = useNavigate()

  if (localStorage.getItem('jwt') != null) {
    nav('/profile', { replace: true })
  }

  React.useEffect(() => {
    if (errorCodeName || errorCodeTg || errorCodePassword || errorCodeEmail) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorCodeName, errorCodeTg, errorCodePassword, errorCodeEmail])

  function handleChangeName(e) {
    setName(e.target.value)

    if (e.target.value.length < 2) {
      setErrorCodeName('Имя должно быть длиннее 2 символов')

      if (!e.target.value) {
        setErrorCodeName('Имя не может быть пустым')
      }
    } else if (e.target.value.length > 30) {
      setErrorCodeName('Имя должен быть короче 30 символов')
    } else {
      setErrorCodeName('')
    }
  }

  function handleChangeTg(e) {
    setTg(e.target.value)

    if (e.target.value.length < 2) {
      setErrorCodeTg('Аккаунт должен быть длиннее 2 символов')

      if (!e.target.value) {
        setErrorCodeTg('Аккаунт не может быть пустым')
      }
    } else if (e.target.value.length > 30) {
      setErrorCodeTg('Аккаунт должен быть короче 30 символов')
    }
    if (!regexTg.test(String(e.target.value).toLowerCase())) {
      setErrorCodeTg('Аккаунт телеграм начинается с @')
    } else {
      setErrorCodeTg('')
    }
  }

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

  function handleRegister(e) {
    e.preventDefault()
    setErrorCode('')
    setFormValid(false)
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
      },
      body: JSON.stringify({
        'password': password,
        'email': email,
        'name': name,
        'tg': tg,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        console.log(res)
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
          })
      })
      .catch((err) => {
        setErrorCodeEmail('Данная почта уже зарегистрирована')
        setErrorCode('Данная почта уже зарегистрирована')
      })
  }

  return (
    <section className='login'>
      <form action="" className="login__form" onSubmit={handleRegister}>
        <h1 className="login__header">Регистрация</h1>
        <h2 className="login__subheader">Добро пожаловать!</h2>
        <input type="text" className="login__input" placeholder='Андрей' min={2} value={name} onChange={handleChangeName} />
        <p className="login__error_value login__error">{errorCodeName}</p>
        <input type="text" className="login__input" placeholder='@mywear' lang='en' min={2} value={tg} onChange={handleChangeTg} />
        <p className="login__error_value login__error">{errorCodeTg}</p>
        <input type="email" className="login__input" placeholder='Email' lang='en' value={email} onChange={handleChangeEmail} />
        <p className="login__error_value login__error">{errorCodeEmail}</p>
        <input type="password" className="login__input" placeholder='Пароль' lang='en' min={8} value={password} onChange={handleChangePassword} />
        <p className="login__error_value login__error">{errorCodePassword}</p>
        <button className="login__btn" disabled={!formValid}>Зарегистрироваться</button>
        <p className="login__error">{errorCode}</p>
        <p className="login__txt">Нажимая кнопку “Зарегистрироваться” вы даёте своё согласие на обработку персональных данных.</p>
        <NavLink to='/login' className='login__btn login__link'>Войти</NavLink>
      </form>
    </section>
  )
}

export default Register