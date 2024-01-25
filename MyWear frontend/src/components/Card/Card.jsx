import React from "react"
import imgSneakers from '../../source/images/ad__sneakers.png'
import '../Card/Card.css'
import { useNavigate } from "react-router-dom"


function Card({ isLogged, cart, getCart, addToCart, removeCountFromCart, addCountToCart, removeFromCart }) {
    const [inCart, setInCart] = React.useState(0)
    const [goodInfo, setGoodInfo] = React.useState()
    const nav = useNavigate()
    React.useEffect(() => {
        localStorage.setItem('lastPage', location.pathname)
    }, [])

    function handleAddToCart(e) {
        e.preventDefault()
        addToCart(article, name, brand, size, price, goodInfo.thumbnail)
    }

    function handleRemoveFromCart(e) {
        e.preventDefault()
        setInCart(inCart - 1)
        removeFromCart(article)
    }

    function handleAddBtn(e) {
        isLogged ? setInCart(inCart + 1) : nav('/login', { replace: true })
        handleAddToCart(e)
    }

    function handleAddCount(e) {
        e.preventDefault()
        setInCart(inCart + 1)
        addCountToCart(article)
    }

    function handleShowAnswer(e) {
        e.target.closest('.card__description-btn').querySelector('.description__btn').classList.toggle('description__btn_active')
        e.target.closest('.card__description-btn').querySelector('.description__subtext').classList.toggle('description__subtext_active')
    }

    function handleClickImg(e) {
        let popupImg = document.querySelector('.popup__img')
        let popup = document.querySelector('.card__popup')
        popupImg.src = e.target.src
        popup.classList.toggle('card__popup_active')
    }

    function handleClosePopup(e) {
        let popupImg = document.querySelector('.popup__img')
        let popup = document.querySelector('.card__popup')

        if (e.target != popupImg) popup.classList.toggle('card__popup_active')
    }
    const [brand, setBrand] = React.useState()
    const [price, setPrice] = React.useState()
    const [size, setSize] = React.useState()
    const [name, setName] = React.useState()
    const [description, setDescription] = React.useState()
    const [article, setArticle] = React.useState()
    const [material, setMaterial] = React.useState()
    const [country, setCountry] = React.useState()
    const [firstImg, setFirstImg] = React.useState()
    const [secondImg, setSecondImg] = React.useState()
    const [thirdImg, setThirdImg] = React.useState()
    const [sizesNPrices, setSizesNPrices] = React.useState([])
    const [isEnabledAdd, setIsEnabledAdd] = React.useState(false)
    const [alreadyIncart, setAlreadyInCart] = React.useState([])


    function onLoad() {
        fetch(`http://localhost:3000/catalog/${location.pathname.split('/')[2]}`, {
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
                setGoodInfo(res.data[0])
                setName(res.data[0].name)
                setBrand(res.data[0].brand)
                setDescription(res.data[0].description)
                setArticle(res.data[0].article)
                setMaterial(res.data[0].material)
                setCountry(res.data[0].country)
                setFirstImg(res.data[0].image1)
                setSecondImg(res.data[0].image2)
                setThirdImg(res.data[0].image3)
                let bestPrice = []
                res.data[0].sizesNprices.forEach((i) => {
                    bestPrice.push(i.split(' - ')[1])
                })
                setPrice(bestPrice.sort()[0])
                let sizesAndPricesArr = []
                res.data[0].sizesNprices.sort().forEach((item) => {
                    sizesAndPricesArr = [
                        ...sizesAndPricesArr,
                        {
                            price: item.split(' - ')[1],
                            size: item.split(' - ')[0]
                        }]
                })
                setSizesNPrices(sizesAndPricesArr)
                getCart()
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        onLoad()
    }, [location.pathname])

    let form = document.querySelector('.card__form')


    function handleClickSize(e) {
        const size = e.target.getAttribute('index')
        alreadyIncart.forEach((item) => {
            if (e.target.value == item.size) {
                setInCart(item.count)
            } else {
                setInCart(0)
            }
        })
        setPrice(sizesNPrices[size].price)
        setSize(sizesNPrices[size].size)
    }

    React.useEffect(() => {
        setAlreadyInCart(cart.filter(item => item.article == article))
        if (form != undefined) {
            if (form.elements['size'].value > 0) {
                if (cart.filter(item => item.article == article)) {
                    cart.filter(item => item.article == article).forEach((item) => {
                        if (form.elements['size'].value == item.size) {
                            setInCart(item.count)
                        } else {
                            setInCart(0)
                        }
                    })
                } if (cart.length == 0) {
                    setInCart(0)
                }
            }
        }
    }, [cart])

    React.useEffect(() => {
        if (size > 0) {
            setIsEnabledAdd(false)
        } else {
            setIsEnabledAdd(true)
        }
    }, [size])

    return (
        <div className="card">
            <div className="card__popup" onClick={handleClosePopup}>
                <div className="popup__container">
                    <img src={imgSneakers} alt="кроссовки" className="popup__img" />
                    <button className="popup__btn">+</button>
                </div>
            </div>
            <div className="card__imges">
                <div className="card__img-cont">
                    <img src={firstImg} alt="" className="card__img" onClick={handleClickImg} />
                </div>
                <div className="card__img-cont">
                    <img src={secondImg} alt="" className="card__img" onClick={handleClickImg} />
                </div>
                <div className="card__img-cont">
                    <img src={thirdImg} alt="" className="card__img" onClick={handleClickImg} />
                </div>
            </div>
            <div className="card__container">
                <form action="" className="card__form" name="cardForm">
                    <div className="card__info">
                        <div className="card__header">
                            <h3 className="card__brand">{brand}</h3>
                            <h1 className="card__name">{name}</h1>
                            <p className="card__price">{price}₽</p>
                        </div>
                        <div className="card__sizes">
                            <p className="card__choose">Выберите размер:</p>
                            {
                                sizesNPrices != undefined ?
                                    sizesNPrices.map((item, i) => {
                                        return (
                                            <label htmlFor="" className="card__label" onClick={handleClickSize} key={i} >
                                                <input type="radio" name="size" index={i} value={item.size} />
                                                <button className="card__size">{item.size} EU</button>
                                            </label>
                                        )
                                    }) : false
                            }
                        </div>
                    </div>
                    {
                        inCart == 0
                            ?
                            <button className="card__buy" disabled={isEnabledAdd} onClick={handleAddBtn}>Добавить в корзину {size > 0 ? `· ${size} EU` : ''}</button>
                            :
                            <div className="card__buy card__cart">
                                <button className="card__cart_toggle" onClick={handleRemoveFromCart}>–</button>
                                {inCart} в корзине
                                <button className="card__cart_toggle" onClick={handleAddCount}>+</button>
                            </div>
                    }
                </form>
                <div className="card__about">
                    <button className="card__description card__description-btn" onClick={handleShowAnswer}>
                        <div className="description__container">
                            <h4 className="description__name">Описание</h4>
                            <p className="description__btn">+</p>
                        </div>
                        <p className="description__subtext">{description}</p>
                    </button>
                    <button className="card__description card__description-btn" onClick={handleShowAnswer}>
                        <div className="description__container">
                            <h4 className="description__name">Доставка и оплата</h4>
                            <p className="description__btn">+</p>
                        </div>
                        <p className="description__subtext">Гибкие услуги под заказ! Отправьте запрос на все, что нужно, воспользуйтесь удобным калькулятором для точной стоимости с доставкой.</p>
                    </button>
                    <div className="card__description">
                        <h4 className="description__name">Артикул</h4>
                        <p className="description__text">{article}</p>
                    </div>
                    <div className="card__description">
                        <h4 className="description__name">Материал</h4>
                        <p className="description__text">{material}</p>
                    </div>
                    <div className="card__description">
                        <h4 className="description__name">Страна-производитель</h4>
                        <p className="description__text">{country}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
