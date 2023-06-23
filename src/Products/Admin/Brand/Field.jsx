import { Browse } from 'Form'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const BrandField = () => {
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

export default BrandField
