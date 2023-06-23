import {
    DialogForm,
    LongText,
    Slug,
    Text,
    Title,
} from 'Form'

const inputs = <>
    <Title />
    <Text
        property='Subtitle'
    />
    <Slug />
    <LongText
        property='Summary'
    />
</>

const ProductForm = () => {
    return <DialogForm
        entityType='Product'
        inputs={inputs}
    />
}

export default ProductForm
