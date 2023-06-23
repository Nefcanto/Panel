import { useState } from 'react'
import {
    DialogForm,
    Text,
} from 'Form'
import ConfigItem from '../ConfigItem/Field'

const inputs = <>
    <ConfigItem />
    <Text
        property='CurrentValue'
    />
</>

const LocaleConfigForm = () => {

    const [configType, setConfigType] = useState()

    const getConfigType = ({ getFieldValue }) => {
        // setConfigType(getFieldValue())
    }

    return <DialogForm
        entityType='LocaleConfig'
        humanReadableEntityType='Locale Config'
        onFieldsChanged={getConfigType}
        inputs={inputs}
    />
}

export default LocaleConfigForm
