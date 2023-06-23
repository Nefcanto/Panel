import {
    app,
    get,
    PageForm,
    useMessage,
} from 'Form'
import Inputs from '../ParameterObject/Inputs'

const EntityParameterForm = () => {

    const { entityType, entityGuid } = app.parseQuery()
    const { error } = useMessage()

    const loader = ({
        setEntity,
        setProgress,
    }) => {
        if (entityType && entityGuid) {
            setProgress(true)
            get(`/entityParameter/getRecord?entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`)
                .then(data => {
                    setProgress(false)
                    setEntity(data)
                }, e => {
                    setProgress(false)
                    error(e)
                })
        }
    }

    return <PageForm
        entityType='EntityParameter'
        // explanations={
        //     <p>The PageTitle and PageDescription fields may be ineffective in some areas</p>
        // }
        inputs={Inputs}
        loader={loader}
        small
    />
}

export default EntityParameterForm
