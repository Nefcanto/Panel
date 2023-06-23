import { Browse } from 'Form'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const EntityTypeField = () => {
    return <Browse
        entityType='EntityType'
        property='EntityType'
        placeholder='Entity type'
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        show={entity => entity.name}
        choose={entity => entity.name}
    />
}

export default EntityTypeField
