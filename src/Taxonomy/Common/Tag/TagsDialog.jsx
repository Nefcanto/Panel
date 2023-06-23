import { useState } from 'react'
import {
    Checks,
    DialogForm,
    post,
} from 'Form'

const TagsDialog = ({
    entity,
    entityGuid,
    entityType,
    itemsUrl,
    reloadEntity,
    checkedItemsUrl,
    saveUrl,
    ...rest
}) => {

    const [chosenValues, setChosenValues] = useState([])

    const inputs = <>
        <Checks
            itemsUrl={itemsUrl || `/tag/all?entityType=${app.camelize(entityType)}`}
            checkedItemsUrl={checkedItemsUrl || `/entityTag/all?entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`}
            show={entity => entity.title}
            choose={entity => entity.tagGuid || entity.guid}
            set={setChosenValues}
        />
    </>

    const save = ({
        error,
        setProgress,
        success,
    }) => {
        console.log(chosenValues)
        setProgress(true)
        post(saveUrl || `/entityTag/putInTags?entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`, chosenValues)
            .then(data => {
                setProgress(false)
                success('Tags updated')
                reloadEntity(entity)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <DialogForm
        {...rest}
        entityType="Tag"
        title="Manage tags"
        inputs={inputs}
        okAction={save}
    />
}

export default TagsDialog
