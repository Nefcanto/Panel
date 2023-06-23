import {
    DialogForm,
    Text,
} from 'Form'

const inputs = entity => <>
    <Text
        property="Name"
        placehodler="Name"
    /> 
</>

const AdministrativeDivisionForm = (props) => {
    return <DialogForm
        {...props}
        entityType='AdministrativeDivision'
        inputs={inputs}
    />
}

export default AdministrativeDivisionForm
