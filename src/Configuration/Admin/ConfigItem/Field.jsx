import { Browse } from 'Form'
import { Text } from 'List'
import ConfigType from '../ConfigType/Filter'
import ConfigItemIcon from '../ConfigType/Icon'

const filters = <>
    <Text
        property="Key"
    />
    <Text
        property="Name"
    />
    <ConfigType />
</>

const headers = <>
    <th superAdmin>Key</th>
    <th>Name</th>
    <th>Type</th>
</>

const row = entity => <>
    <td superAdmin>{entity.key}</td>
    <td>{entity.name}</td>
    <td>
        <ConfigItemIcon type={entity.configTypeId} />
    </td>
</>

const ConfigItemField = () => {
    return <Browse
        property='ConfigItemId'
        entityType='ConfigItem'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Config entity'
        show={entity => entity.name}
        choose={entity => entity.id}
        required='You should choose configuration entity'
        disableInEdit
    />
}

export default ConfigItemField
