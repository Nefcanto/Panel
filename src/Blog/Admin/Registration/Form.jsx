import {
    Text,
    Number,
    DialogForm
} from 'Form'

const inputs = <>
    <Text
        property='FirstName'
        placeholder='First Name'
        required
    />
    <Number
        property='Age'
    />
</>

const Registration = <DialogForm
    entityType='Registration'
    inputs={inputs}
/>

export default Registration
