import { NavLink } from 'react-router-dom'
import './PartAnswers.css'
import React from 'react'

function PartAnswers() {
    let prevElemAnswer
    let prevBtnAnswer
    let prevAnswer

    function handleShowAnswer(e) {
        if (prevAnswer != e.target.closest('.ans')) {
            prevElemAnswer != undefined ? prevElemAnswer.classList.remove('ans__a_active') : false
            prevBtnAnswer != undefined ? prevBtnAnswer.classList.remove('ans__btn_active') : false
            prevElemAnswer = e.target.closest('.ans').querySelector('.ans__a')
            prevAnswer = e.target.closest('.ans')
            prevBtnAnswer = e.target.closest('.ans').querySelector('.ans__btn')
            e.target.closest('.ans').querySelector('.ans__a').classList.add('ans__a_active')
            e.target.closest('.ans').querySelector('.ans__btn').classList.add('ans__btn_active')
        } else {
            e.target.closest('.ans').querySelector('.ans__btn').classList.remove('ans__btn_active')
            e.target.closest('.ans').querySelector('.ans__a').classList.remove('ans__a_active')
            prevElemAnswer = undefined
            prevBtnAnswer = undefined
            prevAnswer = undefined
        }
    }

    return (
        <>
            <div className="anses">
                <div className="ans" onClick={handleShowAnswer}>
                    <div className="ans__q hover7">
                        <h4 className="ans__header">Оригинал обувь?</h4>
                        <button className="ans__btn" >+</button>
                    </div>
                    <p className="ans__a">Мы покупаем обувь только на <NavLink to='/posts/right_size'>Poizon</NavLink>, о чем свидетельствуют бирки poizon'а на каждом кроссовке.</p>
                </div>
                <div className="ans" onClick={handleShowAnswer}>
                    <div className="ans__q hover7">
                        <h4 className="ans__header">Как долго будет доставка?</h4>
                        <button className="ans__btn" >+</button>
                    </div>
                    <p className="ans__a">Мы, после получения заказа, сразу покупаем кроссовки на poizon'е и, как только получаем их в Китае, проверяем на оригинальность и отправляем на склад в Москву, откуда Вы можете забрать их <NavLink to='/delivery_payment'>самовывозом или заказать доставку.</NavLink> Среднее время доставки до склада в Москве ~ 3 недели. Среднее время доставки в регионы 2-5 дней.</p>
                </div>
                <div className="ans" onClick={handleShowAnswer}>
                    <div className="ans__q hover7">
                        <h4 className="ans__header">Как происходит оплата?</h4>
                        <button className="ans__btn" >+</button>
                    </div>
                    <p className="ans__a">Вы подбираете нужные кроссовки, мы уточняем наличие на складах и Вы оплачиваете. <NavLink to='/delivery_payment'>Подробнее о способах оплаты.</NavLink></p>
                </div>
                <div className="ans" onClick={handleShowAnswer}>
                    <div className="ans__q hover7">
                        <h4 className="ans__header">Как с Вами связаться?</h4>
                        <button className="ans__btn" >+</button>
                    </div>
                    <p className="ans__a">Для связи с менеджерами в тг: <a href="https://t.me/mywear" target='_blank'>@mywear</a> и <a href="https://t.me/my_wear_bot" target='_blank'>@my_wear_bot</a>. Для связи с руководством в тг: <a href="https://t.me/mokwar" target='_blank'>@mokwar</a></p>
                </div>
                <div className="ans" onClick={handleShowAnswer}>
                    <div className="ans__q hover7">
                        <h4 className="ans__header">Как подобрать размер кроссовок?</h4>
                        <button className="ans__btn" >+</button>
                    </div>
                    <p className="ans__a">Мы написали специальную <NavLink to='/posts/right_size'>статью</NavLink> о том, как правильно выбрать нужный размер обуви. Также в каждой карточке товара около размера указана длина стопы в см.</p>
                </div>               
            </div>
        </>
    )
}

export default PartAnswers