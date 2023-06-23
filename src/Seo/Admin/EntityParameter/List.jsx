import { List } from 'List'

const headers = <>
    <th>entityType</th>
    <th>pageTitle</th>
    <th>metaTitle</th>
</>

const row = entity => <>
    <td>{entity.entityType}</td>
    <td>{entity.pageTitle}</td>
    <td>{entity.metaTitle}</td>
</>

const EntityParameters = () => {
    return <List
        title='SEO Entity Parameters'
        entityType='EntityParameter'
        headers={headers}
        row={row}
        hasEdit
        hasDelete
        create={'/seo/entity/create'}
        edit={({ entity }) => `/seo/entity/edit?id=${entity.id}`}
    />
}

export default EntityParameters
