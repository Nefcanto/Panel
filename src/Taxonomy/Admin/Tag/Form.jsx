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
        property='Description'
        placeholder='Description'
    />
</>

const TagForm = ({ entityType }) => {
    return <DialogForm
        title='Tag'
        entityType={entityType || 'Tag'}
        inputs={inputs}
    />
}

export default TagForm
