import { List } from 'List'
import AssignmentForm from './Form'

const headers = <>
    <th>Entity type</th>
    <th>Hierarchy</th>
    <th>Tag</th>
    <th>Unit</th>
</>

const row = entity => <>
    <td>{entity.entityType}</td>
    <td>{entity.hierarchyTitle}</td>
    <td>{entity.tagTitle}</td>
    <td>{entity.title}</td>
</>

const Assignments = () => {
    return <List
        title='Unit assignments'
        entityType='Assignment'
        headers={headers}
        row={row}
        create={AssignmentForm}
        hasDelete
    />
}

export default Assignments
