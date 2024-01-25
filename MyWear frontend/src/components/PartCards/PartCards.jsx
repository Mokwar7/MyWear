import { NavLink } from 'react-router-dom'
import '../PartCards/PartCards.css'
import CardMini from "../CardMini/CardMini"
import React from 'react'


function PartCards() {
    const [arrGoods, setArrGoods] = React.useState([])

    function onLoad() {
        fetch('http://localhost:3000/catalog', {
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
                setArrGoods(res.data)
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        onLoad()
    }, [])

    return (
            <section className='part'>
                <div className="part__container">
                    <h3 className="part__header">Продаём всё</h3>
                    <div className={`part__section part__cards`}>
                        {
                            arrGoods != undefined ?
                                arrGoods.map((item, i) => {
                                    if (i < 5) {
                                        let bestPrice = []
                                        item.sizesNprices.forEach((i) => {
                                            bestPrice.push(i.split(' - ')[1])
                                        })
                                        return (
                                            <CardMini
                                                id={item.article}
                                                name={item.brand + ' ' + item.name}
                                                price={bestPrice.sort()[0]}
                                                photo={item.thumbnail}
                                                key={item.brand + ' ' + item.name} />
                                        )
                                    }
                                }) : false
                        }
                        <NavLink to="/catalog" className="card-mini card-mini_more">
                            Больше товаров в <b className="card-mini_more-b">каталоге</b>
                        </NavLink>
                    </div>
                </div>
            </section>
    )
}

export default PartCards