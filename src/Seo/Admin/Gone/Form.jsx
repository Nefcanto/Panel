import {
    DialogForm,
    Text,
} from 'Form'

const inputs = <>
    <Text
        property='Url'
        placeholder='URL'
        required
    />
</>

const GoneForm = <DialogForm
    entityType='Gone'
    inputs={inputs}
/>

export default GoneForm
