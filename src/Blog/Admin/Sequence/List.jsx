import ListIcon from '@mui/icons-material/List'
import {
    EntityAction,
    List,
} from 'List'
import SequenceForm from '../Sequence/Form'

const headers = <>
    <th>Title</th>
</>

const row = entity => <>
    <td>{entity.title}</td>
</>

const entityActions = entity => <>
    <EntityAction
        title='Manage posts'
        icon={ListIcon}
        goTo='/sequence/posts'
    />
</>

const Sequences = () => {
    return <List
        title='Sequences'
        entityType='Sequence'
        breadcrumbItems={[
            {
                title: 'Blog',
                link: '/posts'
            }
        ]}
        headers={headers}
        row={row}
        entityActions={entityActions}
        create={SequenceForm}
    />
}

export default Sequences
