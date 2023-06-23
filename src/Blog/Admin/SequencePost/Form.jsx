import {
    Browse,
    DialogForm,
} from 'Form'

const inputs = <>
    <Browse
        property='PostId'
    />
</>

const SequencePostForm = <DialogForm
    entityType='SequencePost'
    inputs={inputs}
/>

export default SequencePostForm
