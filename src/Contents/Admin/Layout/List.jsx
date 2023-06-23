import { List } from 'List'
import Layout from './Form'
import ManageSections from '../Section/Manage'

const headers = <>
    <th>Key</th>
</>

const row = entity => <>
    <td>{entity.key}</td>
</>

const entityActions = entity => <>
    <ManageSections layoutId={entity.id} />
</>

const Layouts = () => {
    return <List
        title='Layouts'
        entityType='Layout'
        headers={headers}
        row={row}
        entityActions={entityActions}
        upsert={Layout}
        hasDelete
    />
}

export default Layouts
