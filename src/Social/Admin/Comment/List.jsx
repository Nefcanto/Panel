import {
    Enum,
    List,
    Text,
} from 'List'

const filters = <>
    <Enum
        property='CommentStateId'
        entityType='CommentState'
        placeholder='State'
    />
    <Text
        property='Body'
        placeholder='Body'
    />
</>

const headers = <>
    <th>Body</th>
</>

const row = entity => <>
    <td>{entity.body}</td>
</>

const Comments = (props) => {
    return <List
        title='Comments'
        entityType='Comment'
        filters={filters}
        headers={headers}
        row={row}
        {...props}
    />
}

export default Comments
