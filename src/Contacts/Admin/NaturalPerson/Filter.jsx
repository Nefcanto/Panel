import { Browse } from 'List'
import {
    filters,
    headers,
    row
} from './Browse'

const NaturalPersonFilter = () => {
    return <Browse
        property='NaturalPersonId'
        entityType='NaturalPerson'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Natural Person'
        show={entity => entity.fullName}
        choose={entity => entity.id}
    />
}

export default NaturalPersonFilter
