import {
    List,
    Text,
} from 'List'
import SystemConfigForm from './Form'
import ConfigType from '../ConfigType/Filter'
import ConfigTypeIcon from '../ConfigType/Icon'
import ConfigProperty from '../ConfigType/Property'

const filters = <>
    <Text
        property='ConfigItemName'
        placeholder='Config name'
    />
    <ConfigType />
</>

const headers = <>
    <th>Name</th>
    <th>Type</th>
    <th>Value</th>
</>

const row = entity => {
    return <>
        <td>{entity.configItemName}</td>
        <td>
            <ConfigTypeIcon
                type={entity.configTypeId}
            />
        </td>
        <td>
            <ConfigProperty
                type={entity.configTypeId}
                entity={entity}
                entityType='SystemConfig'
            />
        </td>
    </>
}

const SystemConfigs = ({ isSuperAdmin }) => {

    return <List
        title="System Configs"
        entityType='systemConfig'
        filters={filters}
        headers={headers}
        row={row}
        create={isSuperAdmin && SystemConfigForm}
        hasDelete={isSuperAdmin}
        hasEdit={isSuperAdmin}
    />
}

export default SystemConfigs
