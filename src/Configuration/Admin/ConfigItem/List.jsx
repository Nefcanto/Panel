import {
    Enum,
    List,
    Text,
    ValueWithTitle,
} from 'List'
import ConfigItemForm from './Form'
import ConfigTypeIcon from '../ConfigType/Icon'

const filters = <>
    <Text
        property='Key'
    />
    <Text
        property='Name'
    />
    <Enum
        property='ConfigTypeId'
        placeholder='Config Type'
        entityType='ConfigType'
    />
</>

const headers = <>
    <th superAdmin>Key</th>
    <th>Name</th>
    <th>Type</th>
</>

const row = entity => {

    return <>
        <td superAdmin>{entity.key}</td>
        <td>
            <ValueWithTitle
                value={entity.name}
                title={entity.description}
            />
        </td>
        <td>
            <ConfigTypeIcon type={entity.configTypeId} />
        </td>
    </>
}

const ConfigItems = ({ isSuperAdmin }) => {
    return <List
        title='Config Items'
        entityType='ConfigItem'
        filters={filters}
        headers={headers}
        row={row}
        hasDelete={isSuperAdmin}
        hasEdit={isSuperAdmin}
        create={isSuperAdmin && ConfigItemForm}
    />
}

export default ConfigItems
