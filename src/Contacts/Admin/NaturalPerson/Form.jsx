import {
    DialogForm,
    Text,
} from 'Form'

const inputs = <>
    <Text
        property='FirstName'
        placeholder='First name'
    />
    <Text
        property='LastName'
        placeholder='Last name'
    />
</>

const NaturalPersonForm = (props) => {
    return <DialogForm
        entityType='NaturalPerson'
        inputs={inputs}
        {...props}
    />
}

export default NaturalPersonForm
