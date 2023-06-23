import {
    DialogForm,
    Text,
} from 'Form'

const inputs = entity => <>
    <Text
        property="Name"
        placehodler="Name"
        required
    />

</>

const CityDivisionForm = (props) => {
    return <DialogForm
        {...props}
        entityType='CityDivision'
        inputs={inputs}
    />
}

export default CityDivisionForm
