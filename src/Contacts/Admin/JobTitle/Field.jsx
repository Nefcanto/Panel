import { Browse } from 'Form'
import { Text } from 'List'

const filters = <>
    <Text
        property="FullName"
    />
</>

const headers = <>
    <th>text</th>
</>

const row = entity => <>
    <td>{entity.text}</td>
</>

const JobTitleField = () => {
    return <Browse
        property='JobTitleId'
        entityType='JobTitle'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Job title'
        show={entity => entity.text}
        choose={entity => entity.id}
        required='You should choose JobTitle entity'
    />
}

export default JobTitleField
