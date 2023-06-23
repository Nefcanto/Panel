import { useState } from 'react'
import {
    Checks,
    DialogForm,
    post,
} from 'Form'

const HierarchiesDialog = ({
    checkedItemsUrl,
    entity,
    entityGuid,
    entityType,
    itemsUrl,
    pluralName,
    reloadEntity,
    saveUrl,
    ...rest
}) => {

    const [chosenValues, setChosenValues] = useState([])

    const inputs = <>
        <Checks
            itemsUrl={itemsUrl || `/hierarchy/list?entityType=${app.camelize(entityType)}`}
            checkedItemsUrl={checkedItemsUrl || `/entityHierarchy/list?entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`}
            show={entity => entity.title}
            choose={entity => entity.hierarchyGuid || entity.guid}
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
        post( saveUrl || `/entityHierarchy/putInHierarchies?entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`, chosenValues)
            .then(data => {
                setProgress(false)
                success(`${pluralName || "Hierarchies"} updated`)
                reloadEntity(entity)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <DialogForm
        entityType="Hierarchy"
        title={`Manage ${pluralName || "hierarchies"}`}
        inputs={inputs}
        okAction={save}
    />
}

export default HierarchiesDialog
