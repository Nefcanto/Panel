import { Browse } from 'Form'
import {
    filters,
    headers,
    row
} from './Browse'

const JuridicalPersonField = (
    {
        property,
        ...rest
    }
) => {

    return <Browse

        property={property ??'JuridicalPersonId'}
        entityType='JuridicalPerson'
        filters={filters}
        headers={headers}
        row={row}
        placeholder='Juridical Person'
        show={entity => entity.name}
        choose={entity => entity.id}
        required='You should choose JuridicalPerson entity'
        {...rest}
    />
}

export default JuridicalPersonField
