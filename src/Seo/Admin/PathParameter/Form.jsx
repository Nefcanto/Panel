import {
    DialogForm,
    Text,
} from 'Form'
import { ParameterObjectInputs } from 'Seo'

const inputs = <>
    <Text
        property='Path'
        placeholder='Path'
        required
    />
    {ParameterObjectInputs}
</>

const PathParameterForm = <DialogForm
    entityType='PathParameter'
    inputs={inputs}
/>

export default PathParameterForm
