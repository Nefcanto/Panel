import {
    List,
    Text,
} from 'List'
import LocaleConfigForm from './Form'
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
                entityType='LocaleConfig'
            />
        </td>
    </>
}

const LocaleConfigs = ({ isSuperAdmin }) => {

    return <List
        title="Locale Configs"
        entityType='LocaleConfig'
        filters={filters}
        headers={headers}
        row={row}
        create={isSuperAdmin && LocaleConfigForm}
        hasDelete={isSuperAdmin}
        hasEdit={isSuperAdmin}
    />
}

export default LocaleConfigs
