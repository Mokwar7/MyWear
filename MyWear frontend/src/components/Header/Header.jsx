import { NavLink } from 'react-router-dom'
import './Header.css'
import imgSneakers from '../../source/images/ad__sneakers.png'
import React from 'react'

function Header({ isLogged, cart, getCart, cleanCart, removeCountFromCart, addCountToCart, removeFromCart }) {
  const [isCart, setIsCart] = React.useState(false)
  const [cart1, setCart1] = React.useState([])
  const [countGoods, setCountGoods] = React.useState(0)
  let count = 0

  React.useEffect(() => {
    cart.map((item) => {
      count += item.count
    })
    setCountGoods(count)
  }, [cart])

  function handleClickCart() {
    isCart == true ? false : getCart()
    setIsCart(!isCart)
  }

  function handleRemoveFromCart(e) {
    e.preventDefault()
    let art = e.target.getAttribute('article')
    removeFromCart(art)
  }

  function handleAddCountCart(e) {
    e.preventDefault()
    let art = e.target.closest('.cart__count-cont').querySelectorAll('.cart__btn')[1].getAttribute('article')
    addCountToCart(art, e)
  }

  function handleRemoveCountCart(e) {
    e.preventDefault()
    let art = e.target.closest('.cart__count-cont').querySelectorAll('.cart__btn')[1].getAttribute('article')
    removeCountFromCart(art, e)
  }

  function handleRemove(e) {
    if (e.target.closest('.cart__count-cont').querySelector('.cart__brand').textContent == 1) {
      handleRemoveFromCart(e)
    } else {
      handleRemoveCountCart(e)
    }
  }

  function handleCleanCart(e) {
    e.preventDefault()
    cleanCart()
  }

  function handleCloseCart() {
    setIsCart(false)
  }
  const [clickedBurger, setClickedBurger] = React.useState(false)

  function handleClickBurger() {
    setClickedBurger(!clickedBurger)
  }

  return (
    <header className='header'>
      <div className={"header__back" + (clickedBurger == true ? ' header__back_active' : '')}></div>
      <div className="header__container">
        <div className="header__cont">
          <NavLink to="/" className="header__logo hover7"></NavLink>
          <nav className={"header__nav header__nav_menu" + (clickedBurger == true ? ' header__nav_active' : '')}>
            <NavLink to="/catalog" className="header__link hover7">Каталог</NavLink>
            <NavLink to="/contacts" className="header__link hover7">Контакты</NavLink>
            <NavLink to="/delivery_payment" className="header__link hover7">Доставка и оплата</NavLink>
          </nav>
        </div>
        <nav className="header__nav">
          {
            isLogged ? <>
              <button className="header__link hover7" onClick={handleClickCart}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                  <path d="M7.74998 21.5577C7.2236 21.5577 6.77604 21.3875 6.40729 21.0471C6.03855 20.7067 5.85417 20.2936 5.85417 19.8077C5.85417 19.3218 6.03855 18.9087 6.40729 18.5683C6.77604 18.2279 7.2236 18.0577 7.74998 18.0577C8.27637 18.0577 8.72394 18.2279 9.09269 18.5683C9.46144 18.9087 9.64581 19.3218 9.64581 19.8077C9.64581 20.2936 9.46144 20.7067 9.09269 21.0471C8.72394 21.3875 8.27637 21.5577 7.74998 21.5577ZM18.25 21.5577C17.7236 21.5577 17.276 21.3875 16.9073 21.0471C16.5385 20.7067 16.3541 20.2936 16.3541 19.8077C16.3541 19.3218 16.5385 18.9087 16.9073 18.5683C17.276 18.2279 17.7236 18.0577 18.25 18.0577C18.7763 18.0577 19.2239 18.2279 19.5927 18.5683C19.9614 18.9087 20.1458 19.3218 20.1458 19.8077C20.1458 20.2936 19.9614 20.7067 19.5927 21.0471C19.2239 21.3875 18.7763 21.5577 18.25 21.5577ZM6.51663 5.75001L9.26247 11.0577H16.6479C16.7104 11.0577 16.7659 11.0433 16.8146 11.0144C16.8632 10.9856 16.9048 10.9455 16.9396 10.8942L19.8458 6.01923C19.8875 5.94871 19.8909 5.88621 19.8562 5.83173C19.8215 5.77723 19.7625 5.74998 19.6791 5.74998L6.51663 5.75001ZM5.73747 4.25006H20.7791C21.2221 4.25006 21.5572 4.42409 21.7843 4.77216C22.0114 5.12024 22.0221 5.47569 21.8166 5.83851L18.3458 11.6423C18.168 11.9307 17.9329 12.1554 17.6406 12.3163C17.3482 12.4772 17.0277 12.5577 16.6791 12.5577H8.77497L7.5208 14.6731C7.46524 14.75 7.46351 14.8333 7.5156 14.9231C7.56769 15.0128 7.64581 15.0577 7.74998 15.0577H20.1458V16.5577H7.74998C7.02777 16.5577 6.48507 16.2702 6.12186 15.6952C5.75868 15.1202 5.74583 14.5461 6.08332 13.9731L7.62919 11.4077L3.6875 3.74998H1.625V2.25003H4.7083L5.73747 4.25003V4.25006Z" fill="white" />
                </svg>
              </button>
              <NavLink to="/profile" className="header__link hover_btn">Профиль</NavLink> </> :
              <>
                <NavLink to="/register" className="header__link hover7">Регистрация</NavLink>
                <NavLink to="/login" className="header__link hover_btn">Войти</NavLink>
              </>
          }
        </nav>
        <button className={"header__burger" + (clickedBurger == true ? ' header__burger_active' : '')} onClick={handleClickBurger}></button>
        <div className={"cart" + (isCart == true ? ' cart_active' : '')}>
          {
            cart.length == 0 ?
              <p className='contacts__name cart__message'>Ваша корзина пуста 😞</p> :
              <div className="cart__container">
                <div className="cart__header-cont">
                  <h3 className="cart__header">Корзина</h3>
                  <p className="cart__subheader">{countGoods} товар(ов)</p>
                </div>
                <button className='cart__btn' onClick={handleCleanCart}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M7.3077 21C6.80898 21 6.38302 20.8234 6.02982 20.4701C5.67661 20.1169 5.5 19.691 5.5 19.1923V6.49999H4.5V5.00002H8.99997V4.11542H15V5.00002H19.5V6.49999H18.5V19.1923C18.5 19.6974 18.325 20.125 17.975 20.475C17.625 20.825 17.1974 21 16.6922 21H7.3077ZM17 6.49999H6.99997V19.1923C6.99997 19.282 7.02883 19.3557 7.08652 19.4134C7.14423 19.4711 7.21795 19.5 7.3077 19.5H16.6922C16.7692 19.5 16.8397 19.4679 16.9038 19.4038C16.9679 19.3397 17 19.2692 17 19.1923V6.49999ZM9.40385 17.5H10.9038V8.49999H9.40385V17.5ZM13.0961 17.5H14.5961V8.49999H13.0961V17.5Z" fill="#DCDCDC" />
                  </svg>
                </button>
              </div>
          }
          {
            cart != undefined ?
              cart.map((item, i) => {
                return (
                  <div className="cart__card" key={i}>
                    <NavLink to={`/catalog/${item.article}`} className="cart__cont" onClick={handleClickCart}>
                      <img src={item.thumbnail} alt="" className="cart__img" />
                      <div className="cart__info">
                        <p className="cart__price">{item.price} ₽</p>
                        <p className="cart__brand">{item.brand}</p>
                        <p className="cart__name">{item.name} · {item.size}EU</p>
                      </div>
                    </NavLink>
                    <div className="cart__count-cont">
                      <button className="cart__btn" onClick={handleAddCountCart}>+</button>
                      <p className="cart__brand">{item.count}</p>
                      <button className="cart__btn" onClick={handleRemove} article={item.article} size={item.size}>-</button>
                    </div>
                  </div>
                )
              }) : false
          }
          {
            cart.length != 0 ?
              <button className="card__buy">Заказать</button> : false
          }
        </div>
      </div>
      <div className={"cart__back" + (isCart == true ? ' cart__back_active' : '')} onClick={handleCloseCart}></div>
    </header>
  )
}

export default Header