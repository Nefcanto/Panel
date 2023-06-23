import { Browse } from 'List'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const BrandFilter = () => {
    return <Browse
        property='BrandId'
        entityType='Brand'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Brand'
        show={entity => entity.name}
        choose={entity => entity.id}
    />
}

export default BrandFilter
