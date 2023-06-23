import {
    DialogForm,
    Slug,
    Text,
} from 'Form'

const inputs = entity => <>
    <Slug
        superAdmin
    />
    <Text
        property="Name"
        placehodler="Name"
    />

</>

const CityForm = (props) => {
    return <DialogForm
        {...props}
        entityType='City'
        inputs={inputs}
    />
}

export default CityForm
