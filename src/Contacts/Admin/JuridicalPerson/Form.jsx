import {
    DialogForm,
    Text
} from 'Form'

const inputs = <>
    <Text
        property='Name'
        required
    />
</>

const JuridicalPersonForm = <DialogForm
    entityType='JuridicalPerson'
    inputs={inputs}
/>

export default JuridicalPersonForm
