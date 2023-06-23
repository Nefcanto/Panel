import { Browse } from 'Form'
import {
    filters,
    headers,
    row
} from './Browse'

const NaturalPersonField = ({ property, choose }) => {
    const handleChoose = entity => {
        if (choose) {
            return choose(entity)
        }
        return entity.id
    }
    return <Browse
        property={property ?? 'NaturalPersonId'}
        entityType='NaturalPerson'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Natural Person'
        show={entity => entity.fullName}
        choose={entity => handleChoose(entity)}
        required
    />
}

export default NaturalPersonField
