import { DialogForm } from 'Form';
import { EntityTypeField } from 'Entities'
import ConfigItem from '../ConfigItem/Field';

const inputs = <>
    <EntityTypeField />
    <ConfigItem />
</>

const EntityConfigItemForm = () => {

    return <DialogForm
        entityType='EntityConfigItem'
        humanReadableEntityType='Entity Configuration Item'
        inputs={inputs}
    />
}

export default EntityConfigItemForm
