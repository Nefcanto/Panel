import {
    DialogForm,
} from 'Form'

const inputs = <>
    <p>No field for this form</p>
</>

const ItemForm = () => {
    return <DialogForm
        entityType='SectionItem'
        inputs={inputs}
    />
}

export default ItemForm
