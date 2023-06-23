import {
    Browse,
    filterOperator,
} from 'List'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const HierarchyFilter = ({ entityType }) => {
    return <Browse
        entityType='Hierarchy'
        explicitFilters={`entityType=${entityType}`}
        operator={filterOperator.contains}
        property='HierarchyGuidsCsv'
        placeholder='Hierarchy'
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        show={entity => entity.title}
        choose={entity => entity.guid}
    />
}

export default HierarchyFilter
