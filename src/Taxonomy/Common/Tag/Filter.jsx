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

const TagFilter = ({ entityType }) => {
    return <Browse
        entityType='Tag'
        explicitFilters={`entityType=${entityType}`}
        operator={filterOperator.contains}
        property='TagGuidsCsv'
        placeholder='Tag'
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        show={entity => entity.title}
        choose={entity => entity.guid}
    />
}

export default TagFilter
