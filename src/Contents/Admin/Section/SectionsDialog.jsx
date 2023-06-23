import { useState } from 'react'
import {
    Checks,
    DialogForm,
    post,
} from 'Form'

const SectionsDialog = ({
    entity,
    layoutId,
    pageId,
    reloadEntity,
    ...rest
}) => {

    const [chosenValues, setChosenValues] = useState([])

    const inputs = <>
        <Checks
            itemsUrl={`/section/all`}
            checkedItemsUrl={`/section/assigned?layoutId=${layoutId || ""}&pageId=${pageId || ""}`}
            show={entity => entity.name}
            choose={entity => entity.id}
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
        post(`/section/assign?layoutId=${layoutId || ""}&pageId=${pageId || ""}`, chosenValues)
            .then(data => {
                setProgress(false)
                success('Sections assigned')
                reloadEntity(entity)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <DialogForm
        {...rest}
        entityType="Section"
        title="Manage sections"
        inputs={inputs}
        okAction={save}
    />
}

export default SectionsDialog
