import {
    BooleanProperty,
    List,
    ValueWithTitle,
} from 'List'
import FieldForm from './Form'

const headers = <>
    <th>Key</th>
    <th>Type</th>
    <th>Label</th>
    <th>Placeholder</th>
    <th>Required?</th>
    <th>Pattern</th>
    <th>Default</th>
    <th>RTL?</th>
</>

const row = entity => <>
    <td>{entity.key}</td>
    <td>{entity.type}</td>
    <td>{entity.label}</td>
    <td>
        <ValueWithTitle
            value={entity.placeholder}
            title={entity.hint}
        />
    </td>
    <td>
        <BooleanProperty
            value={entity.isRequired}
            actionUrl={`/field/toggleIsRequired/${entity.id}`}
        />
    </td>
    <td>{entity.regex}</td>
    <td>{entity.defaultValue}</td>
    <td>
        <BooleanProperty
            value={entity.direction === 'rtl'}
            actionUrl={`/field/toggleDirection/${entity.id}`}
        />
    </td>
</>

const Fields = ({ query, isSuperAdmin }) => {
    const formUrl = `/field?${query}`

    return <List
        title='Fields'
        entityType='field'
        headers={headers}
        create={isSuperAdmin && formUrl}
        row={row}
        edit={formUrl}
    />
}

export default Fields
