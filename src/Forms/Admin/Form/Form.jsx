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
    <Slug />
    <Title />
    <LongText
        property='Description'
    />
    <IsVital />
</>

const Form = () => {
    return <DialogForm
        entityType='Form'
        inputs={inputs}
    />
}

export default Form
