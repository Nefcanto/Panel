import {
    DialogForm,
    Enum,
    Key,
    LongText,
    Text,
} from 'Form'

const inputs = <>
    <Key />
    <Text
        property='Name'
        required
    />
    <Enum
        property='ConfigTypeId'
        placeholder='Type'
        entityType='ConfigType'
        required='Please specify the type of this configuration entity'
    />
    <Enum
        property='ScopeId'
        placeholder='Scope'
        entityType='ConfigurationScope'
    />
    <LongText
        property='Description'
    />
</>

const ConfigItemForm = () => {
    return <DialogForm
        entityType='ConfigItem'
        humanReadableEntityType='Configuration Item'
        inputs={inputs}
    />
}

export default ConfigItemForm
