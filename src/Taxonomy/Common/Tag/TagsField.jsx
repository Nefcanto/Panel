import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import { Select } from 'Form'

const TagsField = ({
    entityGuid,
    entityType,
}) => {

    const [tags, setTags] = useState([])
    const [entityTags, setEntityTags] = useState([])

    useEffect(() => {
        var url = `/tag/getTags?entityType=${entityType}`
        if (entityGuid) {
            url += `${`&entityGuid=${entityGuid}`}`
        }
        get(url)
            .then(data => {
                setTags(data.tags)
                setEntityTags(data.entityTags)
            }, e => {
                console.log(e)
            })
    }, [entityType, entityGuid])

    return <Select
        multi
        property='TagGuids'
        options={tags}
        display={i => i.title}
        choose={i => i.guid}
        initialValue={entityTags}
    />
}

export default TagsField
