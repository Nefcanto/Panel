import {
    DialogForm,
    Title
} from 'Form'

const inputs = <>
    <Title />
</>

const SequenceForm = () => {
    return <DialogForm
        entityType='Sequence'
        inputs={inputs}
    />
}

export default SequenceForm
