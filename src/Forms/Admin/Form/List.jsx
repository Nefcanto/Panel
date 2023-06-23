import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import {
    EntityAction,
    Key,
    List,
    Title,
    ValueWithTitle,
} from 'List'
import { EntitySeo } from 'Seo'
import Form from './Form'

const filters = <>
    <Key />
    <Title />
</>

const sorts = [
    {
        caption: "Title A-Z",
        property: "Key",
        direction: "asc"
    },
    {
        caption: "Title Z-A",
        property: "Key",
        direction: "desc"
    },
    {
        caption: "Most fields",
        property: "FieldsCount",
        direction: "asc"
    },
    {
        caption: "Fewest fields",
        property: "FieldsCount",
        direction: "desc"
    }
]

const headers = <>
    <th>Key</th>
    <th>Title</th>
    <td>Fields count</td>
</>

const row = entity => <>
    <td>{entity.key}</td>
    <td>
        <ValueWithTitle
            value={entity.title}
            title={entity.description}
        />
    </td>
    <td>{entity.fieldsCount}</td>
</>

const entityActions = entity => <>
    <EntityAction
        title='Manage fields'
        icon={ListAltIcon}
        goTo={`/fields?formId=${entity.id}`}
    />
    <EntityAction
        title='See filled forms'
        icon={NoteAltIcon}
        goTo={`/savedForms?formId=${entity.id}`}
    />
    <EntitySeo
        entityType='Form'
        entityGuid={entity.guid}
    />
</>

const Forms = ({ isSuperAdmin }) => {
    return <List
        title="Forms"
        entityType='Form'
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        create={isSuperAdmin && Form}
        edit={Form}
        entityActions={entityActions}
    />
}

export default Forms
