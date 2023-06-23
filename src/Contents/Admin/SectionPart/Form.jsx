import {
    DialogForm,
    Enum,
    Key,
    Text,
} from 'Form'

const inputs = <>
    <Key />
    <Text
        property='Name'
        required
    />
    <Enum
        property='PartTypeId'
        entityType='PartType'
        placeholder='Type'
        required='Please select a part type'
    />
</>

const SectionPartForm = () => {
    return <DialogForm
        entityType='SectionPart'
        inputs={inputs}
    />
}

export default SectionPartForm
