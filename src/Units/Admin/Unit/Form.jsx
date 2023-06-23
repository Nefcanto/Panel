import {
    DialogForm,
    Title,
} from 'Form'
import { EntityTypeField } from 'Entities'

const inputs = <>
    <EntityTypeField />
    <Title />
</>

const UnitForm = () => {
    return <DialogForm
        entityType='Unit'
        inputs={inputs}
    />
}

export default UnitForm
