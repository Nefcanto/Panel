import { Lookup } from 'Form'

const LocaleField = ({
    property,
}) => {
    return <Lookup
        property={property || 'LocaleGuid'}
        entityType='Locale'
        placeholder='Locale'
        required='Please select the locale'
        display={(locale) => locale.localKey}
        choose={(locale) => locale.id}
        radio
        row
    />
}

export default LocaleField
