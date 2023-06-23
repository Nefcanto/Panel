import {
    DialogForm,
    File,
} from 'Form'

const inputs = <>
    <File
        property='File'
    />
</>

const CreateForm = () => {
    return <DialogForm
        entityType='File'
        inputs={inputs}
    />
}

export default CreateForm
