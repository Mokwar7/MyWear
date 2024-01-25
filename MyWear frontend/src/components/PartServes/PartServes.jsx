import { NavLink } from 'react-router-dom'
import './PartServes.css'
import React from 'react'

function PartServes() {
    const [cost, setCost] = React.useState(0)
    const [delivery, setDelivery] = React.useState(0)
    const [costInput, setCostInput] = React.useState()
    const [weightInput, setWeightInput] = React.useState()

    function handleSubmitForm(e) {
        e.preventDefault()
        setCost(Math.floor(costInput * 13.4 * 1.08 + 500 * weightInput))
        setDelivery(weightInput * 500)
    }

    return (
        <>
            <p className="serv__about">Доставляем все! <br /> Можете рассчитать стоимость доставки любого товара, зная лишь его цену и вес. <br /> <br /> Просто напишите менеджеру в тг: @mywear</p>
            <form action="" className="serv__form" onSubmit={handleSubmitForm}>
                <div className="serv__cont">
                    <h4 className="serv__header">Калькулятор <br /> стоимости</h4>
                    <button className="serv__btn">&rarr;</button>
                </div>
                <input type="number" className="serv__input" required min='1' step='any' placeholder='Цена, ¥' value={costInput} onChange={e => setCostInput(e.target.value)} onFocus={e => setCostInput('')} />
                <input type="number" className="serv__input" required min='1' step='any' placeholder='Вес, кг' value={weightInput} onChange={e => setWeightInput(e.target.value)}  onFocus={e => setWeightInput('')} />
            </form>
            <div className="serv__reses">
                <p className="serv__header">Общая стоимость</p>
                <p className="serv__money">{cost}₽</p>
                <p className="serv__header">Общая стоимость</p>
                <p className="serv__money">{delivery}₽</p>
            </div>
        </>
    )
}

export default PartServes