import {
    DialogForm,
    Enum,
    Lookup,
    Text,
} from 'Form'

const inputs = <>
    <Enum
        property='ScopeId'
        entityType='GlobalizationScope'
        placeholder='Scope'
        required='Please select the scope'
        radio
        row
    />
    <Text
        property='TextKey'
        placeholder='Text Key'
        required='Please provide text key'
        regex='[a-zA-Z]+'
    />
    {/* <Lookup
        property='LocaleId'
        entityType='locale'
        placeholder='Locale'
        required='Please select the locale'
        display={(locale) => locale.localKey}
        choose={(locale) => locale.id}
        radio
        row
    /> */}
    <Text
        property='Value'
        placeholder='Translation'
        required='Please translate your text'
    />
</>

const Translation = () => {
    return <DialogForm
        entityType='translation'
        inputs={inputs}
    />
}

export default Translation
