import {
    List,
    Text,
} from 'List'
import GoneForm from './Form'

const filters = <>
    <Text
        property='Url'
        placeholder='URL'
    />
</>

const headers = <>
    <th>URL</th>
</>

const row = entity => <>
    <td>{entity.url}</td>
</>

const Gones = () => {
    return <List
        title='Gones'
        entityType='Gone'
        filters={filters}
        headers={headers}
        row={row}
        create={GoneForm}
        hasDelete
        hasEdit
    />
}

export default Gones
