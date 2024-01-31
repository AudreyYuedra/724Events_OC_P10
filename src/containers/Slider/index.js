import { useEffect, useState } from "react"
import { useData } from "../../contexts/DataContext"
import { getMonth } from "../../helpers/Date"

import "./style.scss"

const Slider = () => {
   const { data } = useData()
   const [index, setIndex] = useState(0)
   let timer

   //* Ordre d'affichage en décroissant
   const byDateDesc = data?.focus.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1))

   //* Défilement automatique
   const sliderLength = data?.focus?.length
   const nextCard = () => {
      setIndex((prevIndex) => (sliderLength - 1 ? 0 : prevIndex + 1))
   }

   //* Stop défilement quand appuis sur spacebar
   const handleKey = (event) => {
      if (event.key === " ") {
         clearTimeout(timer)
      }
   }

   useEffect(() => {
      //* Débute slider quand composant monté
      timer = setTimeout(nextCard, 5000)

      //* Ajout event pour spacebar
      window.addEventListener("keydown", handleKey)

      //* Nettoie l'event + timeout quand composant démonté
      return () => {
         window.removeEventListener("keydown", handleKey)
         clearTimeout(timer)
      }
   }, [index, sliderLength])

   return (
      <div className="SlideCardList">
         {byDateDesc?.map((event, idx) => (
            // remplacement balises vides par div + ajout key
            <div key={event.title}>
               <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
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
            </div>
         ))}
      </div>
   )
}

export default Slider
