import {
    useEffect,
    useState,
} from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import app from 'App'
import {
    useDebounce,
    useFilter,
} from 'Hooks'
import Filter from './Filter'

const Text = ({
    inputProps,
    placeholder,
    property,
    regex,
    type,
    ...rest
}) => {

    const queryFilter = app.getUrlParameter(property)
    const [filteredQueryString, setFilteredQueryString] = useState(false)

    const {
        id,
        label,
        setEntity,
        shown,
    } = useFilter({
        choose: i => i,
        placeholder,
        property,
        show: i => i,
        type: type || 'text',
        ...rest
    })

    const [internalValue, setInternalValue] = useState(shown)
    const deboundedValue = useDebounce(internalValue)

    useEffect(() => {
        if (property && property.toLowerCase() === 'id') {
            return
        }
        if (queryFilter && !filteredQueryString) {
            setEntity(queryFilter)
        }
        else {
            setEntity(deboundedValue)
        }
    }, [deboundedValue])

    return <Filter
        label={label}
        id={id}
    >
        <OutlinedInput
            inputProps={inputProps}
            size='small'
            value={internalValue || shown}
            label={app.t(label)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    setInternalValue(e.target.value)
                    setEntity(e.target.value)
                }
            }}
            onChange={(e) => {
                if (e.target.value === '') {
                    setInternalValue(e.target.value)
                    setEntity(e.target.value)
                }
                else {
                    if (regex && regex.test) {
                        if (regex.test(e.target.value)) {
                            setInternalValue(e.target.value)
                        }
                    }
                    else {
                        setInternalValue(e.target.value)
                    }
                }
            }}
        />
    </Filter>
}

export default Text 
