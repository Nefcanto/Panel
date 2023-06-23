import {
    DialogForm,
    Key,
    Text,
} from 'Form'

const inputs = <>
    <Key />
    <Text
        property="Name"
        required
    />
</>

const SectionForm = () => {
    return <DialogForm
        entityType='Section'
        inputs={inputs}
    />
}

export default SectionForm
