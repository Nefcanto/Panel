import {
    List,
    Text,
} from 'List'
import RedirectForm from './Form'

const filters = <>
    <Text
        property='OldUrl'
        placeholder='Old URL'
    />
    <Text
        property='NewUrl'
        placeholder='New URL'
    />
</>

const headers = <>
    <th>Old URL</th>
    <th>New URL</th>
    <th>Code</th>
    <th>Regex</th>
</>

const row = entity => <>
    <td>{entity.oldUrl}</td>
    <td>{entity.newUrl}</td>
    <td>{entity.code}</td>
    <td>{entity.regex}</td>
</>

const Redirects = () => {
    return <List
        title='Redirects'
        entityType='Redirect'
        filters={filters}
        headers={headers}
        row={row}
        create={RedirectForm}
        hasDelete
        hasEdit
    />
}

export default Redirects
