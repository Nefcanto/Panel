import {
    DialogForm,
    Title,
} from 'Form'
const inputs = <>
    <Title />
</>

const EditForm = () => {
    return <DialogForm
        entityType='File'
        inputs={inputs}
    />
}

export default EditForm
