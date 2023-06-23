import { Browse } from 'Form'
import {
    filters,
    headers,
    row,
    sorts,
} from './BrowseList'

const UnitField = () => {
    return <Browse
        entityType='Unit'
        property='UnitId'
        placeholder='Unit'
        required
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        show={entity => entity.title}
    />
}

export default UnitField
