import { Text } from 'List'

const filters = <>
    <Text
        property="FullName"
    />
</>

const headers = <>
    <th>Name</th>
</>

const row = entity => <>
    <td>{entity.name}</td>
</>

export { filters }
export { headers }
export { row }
