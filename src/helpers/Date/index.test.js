import { getMonth } from "./index"

describe("Date helper", () => {
   describe("When getMonth is called", () => {
      // test vérif fonction date = janvier
      it("the function return janvier for 2022-01-01 as date", () => {
         // Creation new date janvier
         const date = new Date("2022-01-01")
         // Appel fonction avec new date crée
         const result = getMonth(date)
         // Vérif new date = janvier
         expect(result).toBe("janvier")
      })
      // test vérif fonction date = juillet
      it("the function return juillet for 2022-07-08 as date", () => {
         // Création new date juillet
         const date = new Date("2022-07-08")
         // Appel fonction avec new date crée
         const result = getMonth(date)
         // Vérif new date = juillet
         expect(result).toBe("juillet")
      })
   })
})
