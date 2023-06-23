import {
    DialogForm,
    Enum,
    Text,
} from 'Form'

const inputs = entity => <>
    <Text
        property="Name"
        placehodler="Name"
    />
     <Enum
        property='TypeId'
        entityType='AdministrativeDivisionType'
        placeholder='AdministrativeDivisionType'
        required='Please select a administrative division type'
    />
    <Text
        property="Capital"
        placehodler="Capital"
        required
    />
    <Text
        property="OfficialName"
        placehodler="OfficialName"
        required
    />
    <Text
        property="AlternativeName"
        placehodler="AlternativeName"
        required
    />
    <Text
        property="IsoTwoLetterCode"
        placehodler="IsoTwoLetterCode"
        required
    />
    <Text
        property="IsoThreeLetterCode"
        placehodler="IsoThreeLetterCode"
        required
    />
    <Text
        property="IsoNumericCode"
        placehodler="IsoNumericCode"
        required
    />
    <Text
        property="Cctld"
        placehodler="Cctld"
        required
    />

</>

const CountryForm = (props) => {
    return <DialogForm
        {...props}
        entityType='Country'
        inputs={inputs}
    />
}

export default CountryForm
