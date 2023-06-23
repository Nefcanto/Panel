import {
    DialogForm,
    LongText,
    Slug,
    Title,
} from 'Form'

const inputs = entity => <>
    <Title />
    <Slug />
    <LongText
        property="Summary"
        placehodler="Summary"
    />
</>

const PostForm = (props) => {

    return <DialogForm
        {...props}
        entityType='BlogPost'
        humanReadableEntityType='Post'
        inputs={inputs}
    />
}

export default PostForm
