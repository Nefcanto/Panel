import { useState } from 'react'
import {
    app,
    Check,
    Color,
    get,
    Numeric,
    PageForm,
    post,
    Select,
    Text,
} from 'Form'
import { useEnum } from 'Hooks'

const ManageEntityConfigs = () => {

    const {
        entityType,
        entityGuid
    } = app.parseQuery()

    const [data, setData] = useState([])

    const { enumItems, progress } = useEnum({ entityType: 'ConfigType' })

    const load = ({
        error,
        setCurrentEntity,
        setProgress,
    }) => {
        setProgress(true)
        get(`/entityConfig/getConfigs?entityType=${entityType}&entityGuid=${entityGuid}`)
            .then(data => {
                setData(data)

                var asEntity = {}
                data.map(i => {
                    asEntity[i.configItemId] = i.relatedItems.typedValue;
                })
                console.log(asEntity)
                setCurrentEntity(asEntity)
                setProgress(false)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    const getField = entity => {

        switch (entity.configTypeId) {
            case enums?.configType?.text:
                return <Text
                    property={entity.configItemId}
                />
            case enums?.configType?.naturalNumber:
            case enums?.configType?.integer:
            case enums?.configType?.realNumber:
                return <Numeric
                    property={entity.configItemId}
                />
            case enums?.configType?.boolean:
            case enums?.configType?.nullableBoolean:
                return <Check
                    property={entity.configItemId}
                    placeholder={entity.configItemName}
                />
            case enums?.configType?.color:
                return <Color
                    property={entity.configItemId}
                />
            case enums?.configType?.singleChoice:
            case enums?.configType?.multipleChoice:
                return <Select
                    property={entity.configItemId}
                />
            case enums?.configType?.percent:
                return null
            default:
                return null
        }
    }

    const inputs = <>
        {
            data.map(i => <div key={i.id}>
                {getField(i)}
            </div>)
        }
    </>

    return <PageForm
        title='Entity Configs'
        onLoad={load}
        submitTo='/entityConfig/save'
        inputs={inputs}
        hasBack
    />
}

export default ManageEntityConfigs
