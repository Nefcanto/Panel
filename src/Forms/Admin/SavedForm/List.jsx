import { List } from 'List'

const headers = <>
    <th>Key</th>
</>

const row = entity => <>
    <td>{entity.key}</td>
</>

const SavedForms = () => {
    return <List
        title="Saved Forms"
        entityType='SavedForm'
        headers={headers}
        row={row}
    />
}

export default SavedForms
