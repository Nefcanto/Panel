import { Browse } from 'List'
import {
    filters,
    headers,
    row
} from './Browse'

const JuridicalPersonFilter = () => {
    return <Browse
        property='JuridicalPersonId'
        entityType='JuridicalPerson'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Juridical Person'
        show={entity => entity.name}
        choose={entity => entity.id}
    />
}

export default JuridicalPersonFilter
