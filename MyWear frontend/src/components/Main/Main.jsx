import React from 'react'
import Ad from '../Ad/Ad'
import Part from '../Part/Part'
import PartCards from '../PartCards/PartCards'


function Main() {
  React.useEffect(() => {
    localStorage.removeItem('lastPage')
  }, [])

  return (
    <>
      <Ad />
      <PartCards />
      <Part name={`Услуги`} />
      <Part name={`Ответы на вопросы`} />
      <Part name={`Отзывы клиентов`} />
    </>
  )
}

export default Main
