import { Browse } from 'Form'
import {
    filters,
    headers,
    row
} from './Browser'

const UserField = ({
    choose,
    placeholder,
    property,
}) => {
    const handleChoose = entity => {
        if (choose) {
            return choose(entity)
        }
        return entity.id
    }
    return <Browse
        property={property ?? 'UserId'}
        entityType='user'
        filters={filters}
        headers={headers}
        row={row}
        placeholder={placeholder ?? 'User'}
        show={entity => entity.userName || entity.naturalPersonName}
        choose={entity => handleChoose(entity)}
        required
    />
}

export default UserField
