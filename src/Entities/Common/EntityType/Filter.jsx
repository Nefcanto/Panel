import { Browse } from 'List'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const EntityTypeFilter = () => {
    return <Browse
        entityType='EntityType'
        property='EntityType'
        placeholder='Entity type'
        required='You should choose an entity type'
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        show={entity => entity.name}
        choose={entity => entity.name}
    />
}

export default EntityTypeFilter
