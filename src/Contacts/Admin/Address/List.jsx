import AddressForm from './Form'
import { List } from 'List'

const headers = <>
    <th>Rest</th>
    <th>Remarks</th>
</>

const row = entity => <>
    <td>
        {entity?.rest}
    </td>
    <td>
        {entity?.remarks}
    </td>
</>

const Addresses = (props) => {
    return <List
        title='Addresses'
        entityType='Address'
        headers={headers}
        create={AddressForm}
        row={row}
        hasDelete
        {...props}
    />
}

export default Addresses
