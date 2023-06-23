import { Text } from 'List'

const filters = <>
    <Text
        property="FirstName"
        placeholder='First Name'
    />
    <Text
        property="LastName"
        placeholder='Last Name'
    />
</>

const headers = <>
    <th>First Name</th>
    <th>Last Name</th>
</>

const row = entity => <>
    <td>{entity.firstName}</td>
    <td>{entity.lastName}</td>
</>

export { filters }
export { headers }
export { row }
