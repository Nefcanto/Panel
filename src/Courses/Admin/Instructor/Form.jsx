
import {
    DialogForm,
    Title
} from 'Form'
import { UserField } from 'Accounts'

const inputs = <>
    <UserField
        property="UserGuid"
        choose={entity => entity.guid}
    />
</>

const InstructorForm = () => {
    return <DialogForm
        entityType='Instructor'
        inputs={inputs}
    />
}

export default InstructorForm
