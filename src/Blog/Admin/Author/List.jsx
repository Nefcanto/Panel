import {
    List,
    Text,
} from 'List'
import { ImageProperty } from 'Contacts'
import AuthorForm from './Form'

const filters = <>
    <Text
        property='NaturalPersonName'
        placeholder='Author'
    />
</>

const headers = <>
    <th></th>
    <th>Author</th>
</>

const row = entity => <>
    <td>
        <ImageProperty entity={entity} />
    </td>
    <td>{entity.naturalPersonName || entity.juridicalName}</td>
</>

const Authors = () => {
    return <List
        title="Authors"
        entityType="Author"
        breadcrumbItems={[
            {
                title: 'Blog',
                link: '/posts'
            }
        ]}
        filters={filters}
        headers={headers}
        row={row}
        // create='/contact/upsert'
        create={AuthorForm}
        // edit={({ entity }) => `/contacts/edit?${entity.id}`}
        hasDelete
    />
}

export default Authors
