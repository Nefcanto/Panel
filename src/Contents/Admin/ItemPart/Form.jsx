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

const ItemPartForm = () => {
    return <DialogForm
        entityType='ItemPart'
        inputs={inputs}
    />
}

export default ItemPartForm
