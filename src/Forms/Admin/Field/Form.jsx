import {
    Check,
    Enum,
    Key,
    PageForm,
    Text,
} from 'Form'

const inputs = <>
    <Key />
    <Enum
        property='FieldTypeId'
        placeholder='Type'
        entityType='FieldType'
        required='Type is not specified'
        radio
        row
        superAdmin
    />
    <Text
        property='Label'
        placeholder='Label'
    />
    <Text
        property='Placeholder'
        placeholder='Placeholder'
    />
    <Text
        property='Hint'
        placeholder='Hint'
    />
    <Check
        property="IsRequired"
        placeholder="Is Required"
    />
    <Text
        property='Regex'
        placeholder='Regex Pattern'
    />
    <Text
        property='DefaultValue'
        placeholder='Default Value'
    />
    {/* <Check
        property="OppositeDirection"
        placeholder="Opposite Direction"
    /> */}
    {/* <Text
        property="CssClasses"
        placeholder="CSS Classes"
        superAdmin
    /> */}
</>

const FieldForm = () => {
    return <PageForm
        entityType='Field'
        inputs={inputs}
    />
}

export default FieldForm
