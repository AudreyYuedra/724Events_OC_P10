import { useEffect, useState } from "react"
import { useData } from "../../contexts/DataContext"
import { getMonth } from "../../helpers/Date"

import "./style.scss"

const Slider = () => {
   const { data } = useData()
   const [index, setIndex] = useState(0)

   //* Ordre d'affichage en décroissant
   const byDateDesc = data?.focus.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1))

   const nextCard = () => {
      setTimeout(() => setIndex(index < 2 ? index + 1 : byDateDesc.length - 3), 5000)
   }

   useEffect(() => {
      nextCard()
   })

   return (
      <div className="SlideCardList">
         {byDateDesc?.map((event, idx) => (
            <>
               <div key={event.title} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
                  <img src={event.cover} alt="forum" />
                  <div className="SlideCard__descriptionContainer">
                     <div className="SlideCard__description">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div>{getMonth(new Date(event.date))}</div>
                     </div>
                  </div>
               </div>

               <div className="SlideCard__paginationContainer">
                  <div className="SlideCard__pagination">
                     {byDateDesc?.map((evt, radioIdx) => (
                        <input key={`${evt.date}`} type="radio" name="radio-button" checked={index === radioIdx} readOnly /> // modif "event.id" par "evt.date" + modif "idx" par "index" + ajour readOnly
                     ))}
                  </div>
               </div>
            </>
         ))}
      </div>
   )
}

export default Slider
