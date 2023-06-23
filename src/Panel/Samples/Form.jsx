import {
    PageForm,
    Tags,
    Text,
} from 'NewForm'

const inputs = () => <>
    <Tags
        entityType='blogpost'
        required
        multi
    />
    <Tags
        entityType='blogpost'
        property='TagGuid'
    />
    <Text
        property='Title'
        required
    />
</>

const Form = () => {

    return <>
        <PageForm
            inputs={inputs}
            entityType="BlogPost"
        />
    </>

}

export default Form
