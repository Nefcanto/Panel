import {
    useEffect,
    useState,
} from 'react'
import {
    useEnum,
    useMessage,
} from 'Hooks'
import { Page } from 'Panel'
import {
    Check,
    Collapse,
    get,
    Image,
    InlineForm,
    Numeric,
} from 'Form'

const BlobsForm = ({
    getUrl,
    saveTo,
    setProgress,
    ...rest
}) => {

    const [data, setData] = useState([])
    const [configs, setConfigs] = useState({})
    const [resize, setResize] = useState(false)

    const { enumItems, progress } = useEnum({ entityType: 'PartType' })

    const { error } = useMessage()

    const load = () => {
        setProgress(true)
        get(getUrl)
            .then(data => {
                setData(data.parts)
                setConfigs(data.configs)
                var asEntity = {}
                data.parts.map(i => {
                    asEntity[i.id] = i.relatedItems.typedValue
                })
                setProgress(false)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    useEffect(() => {
        load()
    }, [])

    const getField = entity => {

        switch (entity.partTypeId) {
            case enums?.partType?.image:
                return <>
                    <Image
                        property={entity.id}
                        inForm
                        initialUrls={[entity.relatedItems.imageUrl]}
                    />
                    <Check
                        property={configs.resizeImages ? 'DoNotResize' : 'Resize'}
                        placeholder={configs.resizeImages ? 'Do not resize?' : 'Resize'}
                        change={value => {
                            if (!configs.resizeImages) {
                                setResize(value)
                            }
                        }}
                    />
                    <Collapse in={resize}>
                        <>
                            <Numeric
                                property='MaxWidth'
                                placeholder='Max Width'
                            />
                        </>
                    </Collapse>
                    <Check
                        property={configs.resizeImages ? 'DoNotCompress' : 'Compress'}
                        placeholder={configs.resizeImages ? 'Do not compress?' : 'Compress'}
                    />
                </>
            default:
                return null
        }
    }

    const forms = <>
        {
            data.map(i => <div
                key={i.id}
                className="border-b pt-10 first:pt-0 last:border-none"
            >
                <InlineForm
                    title={i.name}
                    onLoad={({ setCurrentEntity }) => setCurrentEntity(i)}
                    submitTo={saveTo(i)}
                    inputs={getField(i)}
                    large
                />
            </div>)
        }
    </>

    return <Page
        title='Blobs'
        {...rest}
    >
        {forms}
    </Page>
}

export default BlobsForm
