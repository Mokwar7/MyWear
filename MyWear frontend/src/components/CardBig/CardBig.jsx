import { NavLink } from 'react-router-dom'
import imgSneakers from '../../source/images/ad__sneakers.png'
import '../CardBig/CardBig.css'

function CardBig({id, name, price, photo}) {
    return (
        <>
            <NavLink to={`/catalog/${id}`} className="card-big">
                <img src={photo} alt="Nike Air Force 1 Low, вид сбоку" className="card-big__img" />
                <div className="card-big__about">
                    <h4 className="card-big__header">{name}</h4>
                    <p className="card-big__price">От {price}₽</p>
                    <p className="card-big__plus">&#9889; В тренде</p>
                </div>
            </NavLink>
        </>
    )
}

export default CardBig