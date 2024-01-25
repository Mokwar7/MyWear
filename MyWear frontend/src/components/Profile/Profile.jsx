import { NavLink, useNavigate } from 'react-router-dom'
import './Profile.css'
import React from 'react'
import { CurrentUserContext } from '../../contexts/currentUserContext'

function Profile({ handleExit, handleUpdateName, handleUpdateTg }) {
    const currentUser = React.useContext(CurrentUserContext)
    const [nameInput, setNameInput] = React.useState(currentUser.name)
    const [tgInput, setTgInput] = React.useState(currentUser.tg)
    React.useEffect(() => {
        console.log(localStorage.getItem('lastPage'))
        localStorage.removeItem('lastPage')
    }, [])
    const nav = useNavigate()

    React.useEffect(() => {
        const nameBtn = document.querySelector('#nameBtn')
        const tgBtn = document.querySelector('#tgBtn')

        currentUser.name == nameInput ? nameBtn.disabled = true : nameBtn.disabled = false
        currentUser.tg == tgInput ? tgBtn.disabled = true : tgBtn.disabled = false
    }, [nameInput, tgInput, currentUser])

    function handleFormNameSubmit(e) {
        e.preventDefault()
        handleUpdateName(nameInput)
    }

    function handleFormTgSubmit(e) {
        e.preventDefault()
        handleUpdateTg(tgInput)
    }

    function handleExitAccount() {
        handleExit()
    }

    React.useEffect(() => {
        setNameInput(currentUser.name)
        setTgInput(currentUser.tg)
        if (localStorage.getItem('jwt') == null) {
            nav('/login', { replace: true })
        }
    }, [currentUser])

    return (
        <section className='login'>
            <div className="login__form profile">
                <h1 className="login__header">Профиль</h1>
                <div className="profile__form">
                    <h2 className="profile__header">Контактные данные</h2>
                    <form action=""className="profile__label" onSubmit={handleFormNameSubmit}>
                        <p className="login__txt">Имя</p>
                        <input type="text" className="login__input" placeholder='Андрей' lang='en' value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                        <button id='nameBtn' className="profile__btn">✓</button>
                    </form>
                    <form action="" className="profile__label" onSubmit={handleFormTgSubmit}>
                        <p className="login__txt">Telegram</p>
                        <input type="text" className="login__input" placeholder='@mywear' lang='en' value={tgInput} onChange={(e) => setTgInput(e.target.value)} />
                        <button id='tgBtn' className="profile__btn">✓</button>
                    </form>
                </div>
                <p className="login__txt profile__txt_email">Почта</p>
                <p className="profile__email login__input">{currentUser.email}</p>
                <div className="profile__form">
                    <h2 className="profile__header">Telegram Бот</h2>
                    <a href="https://t.me/my_wear_bot" target='_blank' className="profile__link login__input">Открыть в Telegram</a>
                </div>
                <div className="profile__form">
                    <h2 className="profile__header">Выйти</h2>
                    <NavLink to='/catalog' className="profile__link login__input profile__exit" onClick={handleExitAccount}>
                        Выйти из аккаунта
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M4.86507 18.7917C4.40203 18.7917 4.01009 18.6312 3.68926 18.3104C3.36842 17.9896 3.20801 17.5976 3.20801 17.1346V4.86543C3.20801 4.40239 3.36842 4.01046 3.68926 3.68962C4.01009 3.36879 4.40203 3.20837 4.86507 3.20837H11.0085V4.58335H4.86507C4.79454 4.58335 4.7299 4.61273 4.67112 4.67149C4.61236 4.73026 4.58298 4.79491 4.58298 4.86543V17.1346C4.58298 17.2051 4.61236 17.2698 4.67112 17.3285C4.7299 17.3873 4.79454 17.4167 4.86507 17.4167H11.0085V18.7917H4.86507ZM14.8779 14.9134L13.926 13.9192L16.1577 11.6875H8.33779V10.3125H16.1577L13.926 8.0808L14.8779 7.08661L18.7913 11L14.8779 14.9134Z" fill="#FF6363" className='oleg' />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default Profile