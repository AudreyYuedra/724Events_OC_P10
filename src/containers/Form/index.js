import { useCallback, useState } from "react"
import PropTypes from "prop-types"
import Field, { FIELD_TYPES } from "../../components/Field"
import Select from "../../components/Select"
import Button, { BUTTON_TYPES } from "../../components/Button"

const mockContactApi = () =>
   new Promise((resolve) => {
      setTimeout(resolve, 500)
   })

const Form = ({ onSuccess, onError }) => {
   const [sending, setSending] = useState(false)

   const sendContact = useCallback(
      async (evt) => {
         evt.preventDefault()
         setSending(true)
         // We try to call mockContactApi
         try {
            await mockContactApi()
            setSending(false)
            onSuccess() // ajout dans le callBack
         } catch (err) {
            setSending(false)
            onError(err)
         }
      },
      [onSuccess, onError]
   )

   return (
      <form onSubmit={sendContact}>
         <div className="row">
            <div className="col">
               <Field placeholder="Votre nom" label="Nom" />
               <Field placeholder="Votre prénom" label="Prénom" />
               <Select selection={["Personel", "Entreprise"]} onChange={() => null} label="Personel / Entreprise" type="large" titleEmpty />
               <Field placeholder="Votre adresse mail" label="Email" />
               <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} onClick={() => onSuccess()}>
                  {sending ? "En cours" : "Envoyer"}
               </Button>
            </div>

            <div className="col">
               <Field placeholder="Message" label="Message" type={FIELD_TYPES.TEXTAREA} />
            </div>
         </div>
      </form>
   )
}

Form.propTypes = {
   onError: PropTypes.func,
   onSuccess: PropTypes.func,
}

Form.defaultProps = {
   onError: () => null,
   onSuccess: () => null,
}

export default Form
