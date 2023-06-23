import { useEffect } from 'react'
import { FormContext } from 'Contexts'
import { Page } from 'Page'
import app from 'App'
import {
    Actions,
    FormElement,
    useForm,
} from 'NewForm'

const PageForm = ({
    entityType,
    inputs,
    large,
    onLoad,
}) => {

    const { id, entityId } = app.parseQuery()

    const {
        handleSubmit,
        setCurrentEntity,
        ...formRest
    } = useForm({
        entityId: entityId || id,
        entityType,
    })

    const runOnLoad = () => {
        if (onLoad instanceof Function) {
            onload({
                setCurrentEntity,
            })
        }
    }

    useEffect(() => {
        runOnLoad()
    }, [])

    return <Page
        className={"px-6 md:px-12 mx-auto dark:bg-zinc-700 " + (large ? "lg:w-full" : "lg:w-2/3")}
    >
        <FormContext.Provider value={{
            handleSubmit,
            ...formRest
        }}>
            <Actions
                onCanceled={() => { }}
                handleSubmit={handleSubmit}
                {...formRest}
            />

            <FormElement
                id='form'
                inputs={inputs}
                handleSubmit={handleSubmit}
            />

            <Actions
                onCanceled={() => { }}
                handleSubmit={handleSubmit}
                {...formRest}
            />
        </FormContext.Provider>
    </Page>
}

export default PageForm
