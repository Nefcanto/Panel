import {
    DialogForm,
    Phone,
} from 'Form'
import { CountryField } from 'Geo'

const inputs = <>
    <CountryField
        required={'You should choose Juridical Person entity'}
    />
    <Phone
        property='PhoneValue'
        placeholder='Phone Number'
        required={'You should enter phone number'}
    />
</>

const PhoneForm = (props) => {
    return <DialogForm
        entityType='Phone'
        inputs={inputs}
        {...props}
    />
}

export default PhoneForm
