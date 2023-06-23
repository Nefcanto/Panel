import {
    DialogForm,
    Text,
} from 'Form'

const inputs = <>
    <Text
        property='Text'
        placeholder='Text'
    />
</>

const JobTitleForm = (props) => {
    return <DialogForm
        entityType='JobTitle'
        inputs={inputs}
        {...props}
    />
}

export default JobTitleForm
