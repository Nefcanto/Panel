import { List } from 'List'
import SequencePostForm from './Form'

const headers = <>
    <td>Title</td>
</>

const row = entity => <>
    <td>{entity.title}</td>
</>

const SequencePosts = () => <List
    title='Sequence posts'
    entityType='SequencePost'
    headers={headers}
    row={row}
    create={SequencePostForm}
/>

export default SequencePosts
