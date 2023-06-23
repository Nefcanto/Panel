import {
    DialogForm,
    LongText,
    Slug,
    Title,
} from 'Form'

const inputs = <>
    <Title />
    <Slug />
    <LongText
        property="Description"
        placehodler="Description"
    />
</>

const EditForm = () => {
    return <DialogForm
        entityType='VlogVideo'
        humanReadableEntityType='Video'
        inputs={inputs}
    />
}

export default EditForm
