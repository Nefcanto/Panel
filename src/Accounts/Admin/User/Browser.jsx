import { Text } from 'List'

const card = entity => {
    return <>
        <div>{entity.username}</div>
        <div>{entity.dispalyName}</div>
    </>
}

const UserBrowser = () => {
    return <div>user browser</div>
}

const filters = <>
    <Text
        property="UserName"
        placeholder='UserName'
    />
</>

const headers = <>
    <th>UserName</th>

</>

const row = entity => <>
    <td>{(entity.naturalPersonName || entity.juridicalPersonName) || entity.userName}</td>
</>

export { filters }
export { headers }
export { row }
export { UserBrowser }
