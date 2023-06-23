import {
    DialogForm,
    Key,
    LongText,
    Slug,
    Title,
} from 'Form'

const inputs = <>
    <Key />
    <Title />
    <Slug />
    <LongText
        property="Description"
        placehodler="Description"
    />
</>

const PageForm = () => {
    return <DialogForm
        entityType='Page'
        inputs={inputs}
    />
}

export default PageForm
