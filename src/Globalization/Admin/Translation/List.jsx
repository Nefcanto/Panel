import {
    Enum,
    List,
    Lookup,
    Text,
} from 'List'
import Translation from './Form'

const filters = <>
    <Enum
        property='ScopeId'
        placeholder='Scope'
        entityType='GlobalizationScope'
    />
    {/* <Lookup
        property='LocaleId'
        placeholder='Locale'
        entityType='Locale'
        display={entity => entity.localKey}
        choose={entity => entity.id}
    /> */}
    <Text
        property='TextKey'
        placeholder='Text'
    />
</>

const headers = <>
    <th>Scope</th>
    {/* <th>Locale</th> */}
    <th>Text Key</th>
    <th>Translation</th>
</>

const row = entity => {
    return <>
        <td>{entity.scopeKey}</td>
        {/* <td>{entity.locale}</td> */}
        <td>{entity.textKey}</td>
        <td>{entity.value}</td>
    </>
}

const Translations = () => {
    return <List
        title='Translations'
        entityType='translation'
        filters={filters}
        headers={headers}
        row={row}
        create={Translation}
        hasDelete
    />
}

export default Translations
