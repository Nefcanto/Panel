import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import app from 'App'
import { filterOperator } from 'App'
import { useFilter } from 'Hooks'
import { useEnum } from 'Hooks'
import Filter from './Filter'
import Progress from '../../Progress'

const Enum = ({
    property,
    entityType,
    placeholder,
}) => {

    const {
        enumItems,
        progress,
    } = useEnum({ entityType })

    const {
        id,
        entity,
        label,
        setEntity,
    } = useFilter({
        choose: i => i,
        property,
        operator: filterOperator.equals,
        placeholder,
        show: i => i,
        type: 'select',
    })

    return <Filter
        id={id}
        label={label}
    >
        <Select
            size='small'
            value={entity || ''}
            label={app.t(label)}
            fullWidth
            onChange={(event) => { setEntity(event.target.value) }}
        >
            {
                progress
                    ?
                    <Progress />
                    :
                    (
                        enumItems?.map(entity =>
                            <MenuItem
                                key={entity.id}
                                value={entity.id}
                            >
                                {app.t(entity.titleizedKey)}
                            </MenuItem>)
                    )
            }
        </Select>
    </Filter>
}

export default Enum 
