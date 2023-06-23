import { List } from 'List'
import PhoneForm from './Form'

const headers = <>
    <th>Country</th>
    <th>PhoneValue</th>
</>

const row = entity => <>
    <td>
        {entity?.contryName}
    </td>
    <td>
        {entity?.phoneValue}
    </td>
</>

const Phones = (props) => {
    return <List
        title='Phones'
        entityType='Phone'
        headers={headers}
        create={PhoneForm}
        row={row}
        hasDelete
        {...props}
    />
}

export default Phones
