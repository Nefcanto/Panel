import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import { Select } from 'NewForm'

const Tags = ({
    entityType,
    multi,
    property,
    ...rest
}) => {

    const [tags, setTags] = useState([])

    useEffect(() => {
        var url = `/tag/getTags?entityType=${entityType}`
        get(url)
            .then(data => {
                setTags(data.tags)
            }, e => {
                console.log(e)
            })
    }, [entityType])

    const loadInitialValue = ({
        entity,
        setChosenValue,
        setDisplayValue,
        setInitialValue,
    }) => {

        var url = `/tag/getTags?entityType=${entityType}&entityGuid=${entity?.guid}`
        get(url)
            .then(data => {
                if (multi) {
                    const values = data?.entityTags?.map(i => i.tagGuid)
                    setInitialValue(values)
                    setChosenValue(values)
                    setDisplayValue(values)
                }
            }, e => {
            })
    }

    return <Select
        multi={multi ? true : false}
        property={property ?? 'TagGuids'}
        options={tags}
        display={i => i.title}
        choose={i => i.guid}
        loadInitialValue={loadInitialValue}    
        {...rest}
    />
}

export default Tags
