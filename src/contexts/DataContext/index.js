import PropTypes from "prop-types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const DataContext = createContext({})

export const api = {
   loadData: async () => {
      try {
         const json = await fetch("/events.json")
         const data = await json.json()
         console.log("Data loaded:", data)
         return data
      } catch (error) {
         console.error("Error loading data:", error)
         throw error
      }
   },
}

export const DataProvider = ({ children }) => {
   const [error, setError] = useState(null)
   const [data, setData] = useState(null)

   const getData = useCallback(async () => {
      try {
         setData(await api.loadData())
      } catch (err) {
         setError(err)
      }
   }, [])

   useEffect(() => {
      if (data) return
      getData()
   })

   return (
      <DataContext.Provider
         // eslint-disable-next-line react/jsx-no-constructed-context-values
         value={{
            data,
            error,
            //* ajout de last (slider)
            last: data && data.events?.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB) ? -1 : null))[0],
         }}
      >
         {children}
      </DataContext.Provider>
   )
}

DataProvider.propTypes = {
   children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext)

export default DataContext
