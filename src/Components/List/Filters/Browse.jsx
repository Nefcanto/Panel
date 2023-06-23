import React, { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import app, {
    filterOperator,
    get,
} from 'App'
import {
    BrowseContext,
    DialogContext,
} from 'Contexts'
import {
    useFilter,
    useMessage,
} from 'Hooks'
import { Progress } from 'Panel'
import BrowserDialog from '../../Browse/BrowserDialog'
import BrowserIcons from '../../Browse/BrowserIcons'
import Filter from './Filter'

const Browse = ({
    choose,
    entityType,
    explicitFilters,
    placeholder,
    property,
    show,
    ...rest
}) => {

    const queryFilter = app.getUrlParameter(property)
    const [filteredQueryString, setFilteredQueryString] = useState(false)
    const [progress, setProgress] = useState(false)
    const { error } = useMessage()

    const [open, setOpen] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState(null)

    const {
        chosen,
        entity,
        id,
        label,
        setEntity,
        shown,
    } = useFilter({
        choose,
        placeholder,
        property,
        selectedEntity,
        show,
        type: 'browse',
        ...rest
    })

    useEffect(() => {
        if (!entity) {
            setSelectedEntity(null)
        }
    }, [entity])

    useEffect(() => {
        if (queryFilter && !filteredQueryString) {
            setProgress(true)
            get(`/${app.camelize(entityType)}/get/${queryFilter}`)
                .then(data => {
                    setEntity(data)
                    setProgress(false)
                }, e => {
                    setProgress(false)
                    error(e)
                })
        }
    }, [queryFilter])

    return <Filter
        label={label}
        id={id}
    >
        <DialogContext.Provider
            value={{
                open,
                setOpen
            }}
        >
            <BrowseContext.Provider
                value={{
                    close: () => setOpen(false),
                    entityType,
                    explicitFilters,
                    onSelected: i => setEntity(i),
                    selectedEntity,
                    setSelectedEntity,
                    small: true,
                    ...rest
                }}
            >
                <BrowserDialog />
                <OutlinedInput
                    label={app.t(label)}
                    value={shown}
                    readOnly
                    size='small'
                    endAdornment={
                        progress
                            ?
                            <Progress size={20} />
                            :
                            <BrowserIcons onCleared={() => setEntity(null)} />
                    }
                />
            </BrowseContext.Provider>
        </DialogContext.Provider>
    </Filter>
}

export default Browse
