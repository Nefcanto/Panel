import { useState } from 'react'
import {
    DialogForm,
    Text,
} from 'Form'
import { EntityTypeField } from 'Entities'
import ConfigItem from '../ConfigItem/Field'

const inputs = <>
    <EntityTypeField />
    <ConfigItem />
    <Text
        property='CurrentValue'
    />
</>

const EntityTypeConfigForm = () => {

    const [configType, setConfigType] = useState()

    const getConfigType = ({ getFieldValue }) => {
        // setConfigType(getFieldValue())
    }

    return <DialogForm
        entityType='EntityTypeConfig'
        humanReadableEntityType='Entity Type Config'
        onFieldsChanged={getConfigType}
        inputs={inputs}
    />
}

export default EntityTypeConfigForm
