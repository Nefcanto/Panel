import { Browse } from 'Form'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const TagField = () => {
    return <Browse
        entityType='Tag'
        property='TagGuid'
        placeholder='Tag'
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        show={entity => entity.title}
        choose={entity => entity.guid}
    />
}

export default TagField
