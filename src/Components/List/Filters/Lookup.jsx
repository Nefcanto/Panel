import {
    useEffect,
    useState,
} from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import app from 'App'
import { get } from 'App'
import { filterOperator } from 'App'
import { useFilter } from 'Hooks'
import Filter from './Filter'
import Progress from '../../Progress'

const Lookup = ({
    choose,
    property,
    display,
    entityType,
    placeholder,
}) => {

    const [loading, setLoading] = useState()
    const [lookupItems, setLookupItems] = useState([])

    useEffect(() => {
        if (lookupItems.length !== 0) {
            return
        }
        setLoading(true)
        get(`/${app.camelize(entityType)}/all`).then(data => {
            setLookupItems(data)
            setLoading(false)
        }, e => {
            error(e)
            setLoading(false)
        })
    }, [entityType])

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
                loading
                    ?
                    <Progress />
                    :
                    (
                        lookupItems?.map(entity =>
                            <MenuItem
                                key={entity.id}
                                value={choose(entity)}
                            >
                                {app.t(display(entity))}
                            </MenuItem>)
                    )
            }
        </Select>
    </Filter>
}

export default Lookup 
