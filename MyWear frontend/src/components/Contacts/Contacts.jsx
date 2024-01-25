import './Contacts.css'
import tgLogo from '../../source/images/tg_logo.svg'

function Contacts() {
    return (
        <section className='contacts'>
            <h1 className="contacts__header">Контакты</h1>
            <div className="contacts__container">
                <div className="contacts__section">
                    <div className="contacts__block">
                        <h3 className="contacts__name">Написать по любому поводу</h3>
                        <p className="contacts__txt">Тг: @mywear</p>
                    </div>
                    <div className="contacts__block">
                        <h3 className="contacts__name">Соцсети</h3>
                        <div className="contacts__links">
                            <a href="ds" className="contacts__link">
                                <img src={tgLogo} alt="телеграм" className="contacts__icon" />
                                Телеграм
                            </a>
                            <a href="ds" className="contacts__link">
                                <img src={tgLogo} alt="вк" className="contacts__icon" />
                                Вконтакте
                            </a>
                            <a href="ds" className="contacts__link">
                                <img src={tgLogo} alt="ютуб" className="contacts__icon" />
                                Ютуб
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contacts__section">
                    <div className="contacts__block">
                        <h3 className="contacts__name">Написать напрямую руководству</h3>
                        <p className="contacts__txt">Тг: @mokwar</p>
                    </div>
                    <div className="contacts__block">
                        <h3 className="contacts__name">Написать по поводу сотрудничествва</h3>
                        <p className="contacts__txt">Тг: @rawkom</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts