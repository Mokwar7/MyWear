import { NavLink } from 'react-router-dom'

function CardMini({id, name, price, photo}) {
    return (
        <>
            <NavLink to={`/catalog/${id}`} className="card-mini">
                <img src={photo} alt="Nike Air Force 1 Low, вид сбоку" className="card-mini__img" />
                <div className="card-mini__about">
                    <h4 className="card-mini__header">{name}</h4>
                    <p className="card-mini__price">От {price}₽</p>
                </div>
            </NavLink>
        </>
    )
}

export default CardMini