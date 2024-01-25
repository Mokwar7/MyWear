import { NavLink } from 'react-router-dom'
import '../PartRevs/PartRevs.css'

function PartRevs() {
    return (
        <>
            <div className="rev">
                <div className="rev__header">
                    <h4 className="rev__name">Надя</h4>
                    <p className="rev__score">4.8<span className="color_orange">&#9734;</span></p>
                </div>
                <ul className="rev__pluses">
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка сервиса</p>
                        <p className="rev__count">5/5</p>
                    </li>
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка доставки</p>
                        <p className="rev__count">4.5/5</p>
                    </li>
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка кроссовок</p>
                        <p className="rev__count">5/5</p>
                    </li>
                </ul>
                <p className="rev__text">
                    Все понравилось, пришло быстро, скоро буду брать еще форсы 😋 <br /> (покупала Adidas originals forum)
                </p>
            </div>
            <div className="rev">
                <div className="rev__header">
                    <h4 className="rev__name">Даниил</h4>
                    <p className="rev__score">4.9<span className="color_orange">&#9734;</span></p>
                </div>
                <ul className="rev__pluses">
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка сервиса</p>
                        <p className="rev__count">5/5</p>
                    </li>
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка доставки</p>
                        <p className="rev__count">5/5</p>
                    </li>
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка кроссовок</p>
                        <p className="rev__count">5/5</p>
                    </li>
                </ul>
                <p className="rev__text">
                    Все четко, тяги пришли за 3 недели 🤍 <br /> (покупал Nike Dunk Low)
                </p>
            </div>
            <div className="rev">
                <div className="rev__header">
                    <h4 className="rev__name">Максим</h4>
                    <p className="rev__score">4.7<span className="color_orange">&#9734;</span></p>
                </div>
                <ul className="rev__pluses">
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка сервиса</p>
                        <p className="rev__count">5/5</p>
                    </li>
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка доставки</p>
                        <p className="rev__count">5/5</p>
                    </li>
                    <li className="rev__plus">
                        <p className="rev__arg">Оценка кроссовок</p>
                        <p className="rev__count">4/5</p>
                    </li>
                </ul>
                <p className="rev__text">
                    Доставили за 2,5 недели. Кросы ориг, но вот сами не зашли, слишком твердая подошва. <br /> (покупал Old Order OG)
                </p>
            </div>
        </>
    )
}

export default PartRevs