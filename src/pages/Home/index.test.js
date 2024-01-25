import { fireEvent, render, screen } from "@testing-library/react"
import Home from "./index"
import EventList from "../../containers/Events"
import EventCard from "../../components/EventCard"
import PeopleCard from "../../components/PeopleCard"
import Menu from "../../containers/Menu"
import Slider from "../../containers/Slider"
import ServiceCard from "../../components/ServiceCard"
import Form from "../../containers/Form"

describe("When Form is created", () => {
   // Test vérif si liste champs affichée
   it("a list of fields card is displayed", async () => {
      render(<Home />)
      // Vérif textes présents (opé async car attente textes apparaissent)
      await screen.findByText("Email")
      await screen.findByText("Nom")
      await screen.findByText("Prénom")
      await screen.findByText("Personel / Entreprise")
   })

   describe("and a click is triggered on the submit button", () => {
      // Test vérif si mesage succès est affiché
      it("the success message is displayed", async () => {
         render(<Home />)
         // Déclechement clic sur btn (opé async car attente btn présent)
         fireEvent(
            await screen.findByText("Envoyer"),
            new MouseEvent("click", {
               cancelable: true,
               bubbles: true,
            })
         )
         // Vérif textes présents (opé async car attente textes apparaissent)
         await screen.findByText("En cours")
         await screen.findByText("Message envoyé !")
      })
   })
})

describe("When a page is created", () => {
   // test vérif slider est affiché
   it("a Slider is displayed", () => {
      render(<Slider />)
   })
   // test vérif menu affiché
   it("a list of events is displayed", () => {
      render(<Menu />)
   })
   // Test vérif si liste services est affichée
   it("a list of services is displayed", () => {
      // Rendu composant avec des props + enfants
      render(
         <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
            <h3>test title</h3>
            test text
         </ServiceCard>
      )
   })
   // test vérif liste personne affichée
   it("a list a people is displayed", () => {
      // rendu composant avec props
      render(<PeopleCard imageSrc="http://src-image" imageAlt="image-alt-text" name="test name" position="test position" />)
   })
   // test vérif si carte event + last event sont affichés
   it("an event card, with the last event, is displayed", () => {
      // rendu composant avec props
      render(<EventCard imageSrc="http://src-image" imageAlt="image-alt-text" date={new Date("2022-04-01")} title="teste event" label="test label" />)
   })
})
