import './Part.css'
import '../CardMini/CardMini.css'
import PartCards from '../PartCards/PartCards'
import PartServes from '../PartServes/PartServes'
import PartAnswers from '../PartAnswers/PartAnswers'
import PartRevs from '../PartRevs/PartRevs'

function Part({ name }) {
  return (
    <section className='part'>
      <div className="part__container">
        <h3 className="part__header">{name}</h3>
        <div className={`part__section`}>
          {
            (name == 'Продаём все' ? <PartCards /> : false) ||
            (name == 'Услуги' ? <PartServes /> : false) ||
            (name == 'Ответы на вопросы' ? <PartAnswers /> : false) ||
            (name == 'Отзывы клиентов' ? <PartRevs /> : false) ||
            (name == 'Продаём все' ? <PartCards /> : false) ||
            (name == 'Продаём все' ? <PartCards /> : false)
          }
        </div>
      </div>
    </section>
  )
}

export default Part