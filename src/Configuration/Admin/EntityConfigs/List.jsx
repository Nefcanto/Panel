import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import {
    List,
    ListAction,
    Text,
} from 'List'

const listActions = <>
    <ListAction
        title='Manage'
        icon={DisplaySettingsIcon}

    />
</>

const filters = <>
    <Text
        property='EntityGuid'
        placeholder='Entity Guid'
    />
</>

const headers = <>
    <th>Config</th>
    <th>Value</th>
</>

const row = entity => {
    return <>
        <td>{entity.configItemKey}</td>
        <td>{entity.currentValue}</td>
    </>
}

const EntityConfigs = () => {
    return <List
        title='Entity Configs'
        entityType='EntityConfig'
        listActions={listActions}
        filters={filters}
        headers={headers}
        row={row}
    />
}

export default EntityConfigs
