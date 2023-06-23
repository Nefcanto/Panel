import CheckIcon from '@mui/icons-material/Check'
import {
    List,
    ListAction,
} from 'List'
import UnitForm from './Form'

const listActions = <>
    <ListAction
        title='Assign'
        icon={CheckIcon}
        url='/unitAssignments'
    />
</>

const headers = <>
    <th>Title</th>
</>

const row = entity => {
    return <>
        <td>{entity.title}</td>
    </>
}

const Units = () => {
    return <List
        title="Units"
        entityType="Unit"
        listActions={listActions}
        headers={headers}
        row={row}
        create={UnitForm}
        hasDelete
        hasEdit
    />
}

export default Units
