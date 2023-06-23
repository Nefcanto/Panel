import {
    useContext,
    useEffect,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import app, { get } from 'App'
import {
    FormContext,
    PanelContext,
} from 'Contexts'
import {
    useForm,
    useMessage,
    useTop,
} from 'Hooks'
import Actions from './Actions'
import Explanations from './Explanations'
import FormElement from './FormElement'
import Page from '../Page/Page'

const PageForm = ({
    actions,
    breadcrumbItems,
    entityType,
    explanations,
    hasBack,
    humanReadableEntityType,
    inputs,
    large,
    loader,
    okAction,
    onLoad,
    parentEntityType,
    parentIdKey,
    progress: externalProgress,
    returnTo,
    submitTo,
    subtitle,
    title,
}) => {

    const [contentProgress, setContentProgress] = useState()
    const [parentEntity, setParentEntity] = useState()

    const { error } = useMessage()

    const navigate = useNavigate()
    const { id, entityId } = app.parseQuery()

    const { setProgress: setPanelProgress } = useContext(PanelContext)   

    const cancel = () => {
        
        resetFields()
        if (returnTo) {
            navigate(returnTo)
        }
        else {
            navigate(-1)
        }
    }

    const {
        calculatedTitle,
        handleSubmit,
        resetFields,
        setCurrentEntity,
        ...formRest
    } = useForm({
        entityId: entityId || id,
        entityType,
        externalProgress,
        humanReadableEntityType,
        loader,
        okAction,
        onSaved: cancel,
        parentIdKey,
        submitTo,
        title,
    })

    const backParams = {}
    if (hasBack) {
        backParams.back = `mx-auto ${large ? 'lg:w-full' : 'lg:w-2/3'}`
    }

    const runOnLoad = () => {
        if (onLoad instanceof Function) {
            onLoad({
                error,
                parentEntity,
                setCurrentEntity,
                setProgress: setContentProgress,
            })
        }
    }

    useEffect(() => {
        if (onLoad instanceof Function) {
            onLoad({
                error,
                setCurrentEntity,
                setProgress: setContentProgress,
            })
        }
    }, [])

    useEffect(() => {
        if (parentEntityType) {
            setPanelProgress(true)
            const parsedQuery = app.parseQuery()
            let parentId = undefined
            if (parsedQuery.parentId) {
                parentId = parsedQuery.parentId
            }
            if (!parentId) {
                parentId = parsedQuery.id
            }
            if (parentIdKey) {
                parentId = parsedQuery[parentIdKey]
            }
            setTimeout(() => {
                get(`/${app.camelize(parentEntityType)}/get/${parentId}`)
                    .then(data => {
                        setPanelProgress(false)
                        setParentEntity(data)
                    }, e => {
                        setPanelProgress(false)
                        error(e)
                    })
            }, 0)

        }
        else {
            runOnLoad()
        }
    }, [])

    useTop({
        breadcrumbItems,
        dependency: parentEntity,
        subtitle,
        title,
    })

    return <Page
        className={"px-6 md:px-12 mx-auto dark:bg-zinc-700 " + (large ? "lg:w-full" : "lg:w-2/3")}
        subtitle={subtitle}
        title={calculatedTitle}
        {...backParams}
    >
        <FormContext.Provider value={{
            calculatedTitle,
            handleSubmit,
            resetFields,
            setCurrentEntity,
            ...formRest
        }}>
            <Explanations explanations={explanations} />
            <Actions
                actions={actions}
                handleSubmit={handleSubmit}
                hasCancel
                onCanceled={cancel}
            />
            <div className="mb-10"></div>
            <FormElement
                id='form'
                inputs={inputs}
                handleSubmit={handleSubmit}
            />
            <Actions
                actions={actions}
                handleSubmit={handleSubmit}
                hasCancel
                onCanceled={cancel}
            />
        </FormContext.Provider>
    </Page >
}

export default PageForm 
