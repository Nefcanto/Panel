import {
    DialogForm,
    Text,
} from 'Form'
import { GeoFields } from 'Geo'

const inputs = <>
    <GeoFields />
    <Text
        property='Rest'
        placeholder='Rest'
    />
    <Text
        property='Remarks'
        placeholder='Remarks'
    />

</>

const AddressForm = (props) => {
    return <DialogForm
        entityType='Address'
        inputs={inputs}
        {...props}
    />
}

export default AddressForm
