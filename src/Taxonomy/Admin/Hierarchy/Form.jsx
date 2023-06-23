import {
    DialogForm,
    IsVital,
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
        property='Description'
    />
    <IsVital />
</>

const Form = ({ entityType }) => {
    return <DialogForm
        entityType={entityType || 'Hierarchy'}
        inputs={inputs}
    />
}

export default Form
