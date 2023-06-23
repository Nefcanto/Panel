import {
    useEffect,
    useState,
} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import app from 'App'
import { get } from 'App'
import fieldStyles from './FieldStyle'
import Select from './Select'
import Radio from './Radio'

const Lookup = ({
    entityType,
    radio,
    row,
    ...rest
}) => {

    app.ensure([entityType])

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

    return <div className={fieldStyles}>
        {
            loading
                ?
                <CircularProgress />
                :
                radio
                    ?
                    <Radio
                        {...rest}
                        options={lookupItems}
                        row={row}
                    />
                    :
                    <Select
                        {...rest}
                        options={lookupItems}
                    />
        }
    </div>
}

export default Lookup
