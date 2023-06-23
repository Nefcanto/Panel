import { useState } from 'react'
import { useEnum } from 'Hooks'
import {
    app,
    Check,
    Code,
    get,
    Link,
    LongText,
    Numeric,
    PageForm,
    Rte,
    Text,
} from 'Form'

const DataForm = ({
    getUrl,
    ...rest
}) => {

    const [data, setData] = useState([])

    const { enumItems, progress } = useEnum({ entityType: 'PartType' })

    const load = ({
        error,
        setCurrentEntity,
        setProgress,
    }) => {
        setProgress(true)
        get(getUrl)
            .then(data => {
                setData(data)
                var asEntity = {}
                data.map(i => {
                    asEntity[i.id] = i.relatedItems.typedValue
                })
                setCurrentEntity(asEntity)
                setProgress(false)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    const getField = entity => {

        switch (entity.partTypeId) {
            case enums?.partType?.text:
                return <Text
                    property={entity.id}
                    placeholder={entity.name}
                />
            case enums?.partType?.longText:
                return <LongText
                    property={entity.id}
                    placeholder={entity.name}
                />
            case enums?.partType?.richText:
                return <Rte
                    property={entity.id}
                    placeholder={entity.name}
                />
            case enums?.partType?.link:
                return <Link
                    property={entity.id}
                    placeholder={entity.name}
                />
            case enums?.partType?.svg:
                return <Code
                    property={entity.id}
                    placeholder={entity.name}
                />
            case enums?.partType?.number:
                return <Numeric
                    property={entity.id}
                    placeholder={entity.name}
                    realNumbers
                />
            case enums?.partType?.boolean:
                return <Check
                    property={entity.id}
                    placeholder={entity.name}
                />
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
        inputs={inputs}
        onLoad={load}
        {...rest}
    />
}

export default DataForm
