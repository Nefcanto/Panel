import {
    useEffect,
    useState,
} from 'react'
import app, {
    get,
    post,
    upload,
} from 'App'
import { useMessage } from 'Hooks'

const useForm = ({
    contentProgress,
    entity,
    entityId,
    entityType,
    externalProgress,
    humanReadableEntityType,
    loader,
    okAction,
    onSaved,
    parentId,
    submitTo,
    title,
}) => {
    const formMode = {
        creation: 1,
        edition: 2
    }
    const [fields, setFields] = useState([])
    const [progress, setProgress] = useState()
    const [isDirty, setIsDirty] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [isSubmittedOnce, setIsSubmittedOnce] = useState(false)
    const [currentEntity, setCurrentEntity] = useState(entity)
    const [isValid, setIsValid] = useState(false)
    const [hasFile, setHasFile] = useState(false)
    const [mode, setMode] = useState(entityId ? formMode.edition : formMode.creation)
    const { success, error } = useMessage()

    const validate = () => {
        setIsValid(fields.every(i => i.isValid))
    }

    const addFieldToFormContext = ({ id, ...rest }) => {
        if (!id) {
            return
        }
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].id === id) {
                return
            }
        }
        setFields((previousFields) => {
            return [{
                id,
                ...rest
            }, ...previousFields]
        })
    }

    const setField = ({
        currentValue,
        id,
        initialValue,
        isDirty,
        isValid,
    }) => {
        setFields((previousFields) => {
            for (var i = 0; i < previousFields.length; i++) {
                if (previousFields[i].id === id) {
                    previousFields[i].initialValue = initialValue
                    previousFields[i].currentValue = currentValue
                    previousFields[i].isValid = isValid
                    previousFields[i].isDirty = isDirty
                }
            }
            return [...previousFields]
        })
    }

    const handleSubmit = (event) => {

        if (!isSubmittedOnce) {
            setIsSubmittedOnce()
        }
        if (!isValid) {
            event.preventDefault()
            return
        }

        var data = hasFile ? new FormData() : {}

        new URLSearchParams(window.location.search).forEach((value, key) => data[key] = value)

        for (let i = 0; i < fields.length; i++) {
            const key = fields[i].id.split('_')[1]
            const value = fields[i].currentValue
            if (value === '') {
                continue
            }
            if (hasFile) {
                data.append(key, value)
            }
            else {
                data[key] = fields[i].currentValue
            }
        }

        const method = hasFile ? upload : post

        console.log(data)

    }

    useEffect(() => {
        if (entityId) {
            setMode(formMode.edition)
        }
    }, [entityId])

    useEffect(() => {
        if (mode === formMode.edition && !entity) {
            loadEntity()
        }
    }, [mode])

    useEffect(() => {
        if (currentEntity && currentEntity.id) {
            setMode(formMode.edition)
        }
        else {
            setMode(formMode.creation)
        }
    }, [currentEntity])

    const loadEntity = () => {
        if (!entityId) {
            return
        }
        setProgress(true)
        get(`/${app.camelize(entityType)}/get/${entityId}`)
            .then(data => {
                setProgress(false)
                setCurrentEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    useEffect(() => {
        validate()
        window.fields = fields
        window.form = {
            fields,
            isChanged,
            isDirty,
            isValid,
            mode,
        }

    }, [validate, fields])

    return {
        addFieldToFormContext,
        currentEntity,
        fields,
        formMode,
        handleSubmit,
        isDirty,
        isValid,
        mode,
        progress,
        setCurrentEntity,
        setField,
        setIsDirty,
        setIsValid,
        setProgress,
    }
}

export default useForm
