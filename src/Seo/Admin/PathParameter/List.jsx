import PathParameterForm from './Form'
import {
    List,
    Text,
} from 'List'

const filters = <>
    <Text
        property='Path'
        placeholder='Path'
    />
</>

const headers = <>
    <th>Path</th>
    <th>PageTitle</th>
    <th>MetaTitle</th>
</>

const row = entity => <>
    <td>{entity.path}</td>
    <td>{entity.pageTitle}</td>
    <td>{entity.metaTitle}</td>
</>

const PathParameters = () => {
    return <List
        title='SEO Path Parameters'
        entityType='PathParameter'
        filters={filters}
        headers={headers}
        row={row}
        create={PathParameterForm}
        hasEdit
        hasDelete
    />
}

export default PathParameters
