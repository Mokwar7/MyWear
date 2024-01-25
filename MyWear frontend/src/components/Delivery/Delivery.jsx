import './Delivery.css'
import tgLogo from '../../source/images/tg_logo.svg'

function Delivery() {
    return (
        <section className='contacts'>
            <h1 className="contacts__header">Доставка и оплата</h1>
            <div className="contacts__container">
                <div className="contacts__section">
                    <div className="contacts__block">
                        <h3 className="contacts__name">Самовывоз</h3>
                        <p className="contacts__txt">Заказ можно забрать лично в Москве (м. Домодедовская)</p>
                    </div>
                    <div className="contacts__block">
                        <h3 className="contacts__name">Доставка почтой</h3>
                        <p className="contacts__txt">Отправляем любой почтой (на Ваш выбор) по всему миру</p>
                    </div>
                </div>
                <div className="contacts__section">
                    <div className="contacts__block">
                        <h3 className="contacts__name">Оплата 50/50</h3>
                        <p className="contacts__txt">Вы можете оплатить 50% от стоимости заказа, а остальное после получения в Москве или перед отправкой в регионы. Так Вы сможете заказать кроссовки, даже если у Вас нет всей суммы на руках</p>
                    </div>
                    <div className="contacts__block">
                        <h3 className="contacts__name">Оплата 100%</h3>
                        <p className="contacts__txt">Вы сразу оплачиваете 100% цены заказа, а мы даем Вам скидку в 10% на доставку в регионы</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Delivery