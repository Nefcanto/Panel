import {
    Check,
    DialogForm,
    Image,
    Title,
} from 'Form'

const inputs = <>
    <Image
        property='Image'
        multiple
    />
    <Title optional />
    <Check
        property='IsDefault'
        placeholder='Is Default'
    />
</>

const ImageForm = () => {
    return <DialogForm
        title='Upload image(s)'
        entityType='Image'
        inputs={inputs}
    />
}

export default ImageForm
