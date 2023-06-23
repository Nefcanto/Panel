import {
    DialogForm,
    Video,
} from 'Form'

const inputs = <>
    <Video
        property='Video'
    />
</>

const CreateForm = () => {
    return <DialogForm
        entityType='VlogVideo'
        humanReadableEntityType='Video'
        inputs={inputs}
        submitTo={'/vlogVideo/setVideo'}
    />
}

export default CreateForm
