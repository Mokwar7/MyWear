import { NavLink } from 'react-router-dom'
import imgSneakers from '../../source/images/ad__sneakers.png'
import './Ad.css'

function Add() {
  return (
    <section className='ad'>
      <div className="ad__container">
        <div className="ad__txt">
          <h1 className="ad__header">Кроссовки из Китая</h1>
          <h2 className="ad__subheader">Доставка за 3 недели</h2>
          <NavLink to="/catalog" className="header__link hover7"><button className="ad__btn">Купить &gt;</button></NavLink>
        </div>
        <img src={imgSneakers} alt="кроссовок, вид сбоку" className='ad__img' />
      </div>
    </section>
  )
}

export default Add