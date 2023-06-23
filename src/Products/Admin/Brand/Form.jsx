import {
    DialogForm,
    Slug,
    Text,
} from 'Form'

const inputs = <>
    <Text
        property='Name'
    />
    <Slug />
</>

const BrandForm = <DialogForm
    entityType='Brand'
    inputs={inputs}
/>

export default BrandForm
