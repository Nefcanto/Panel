import {
    List,
    ListAction,
    Numeric,
} from 'List'

const headers = <>
    <th>Number</th>
</>

const row = entity => <>
    <td>{entity.number}</td>
</>

const Orders = <List
    title='Orders'
    entityType='Order'
    headers={headers}
    row={row}
/>

export default Orders
