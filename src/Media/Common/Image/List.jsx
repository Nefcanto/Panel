import CheckIcon from '@mui/icons-material/Check'
import {
    Boolean,
    BooleanProperty,
    EntityAction,
    List,
    post,
} from 'List'
import ImageForm from './Form'

const filters = <>
    <Boolean
        property='IsDefault'
        label='Is Default'
    />
</>

const card = entity => {
    return <div className="w-full h-full relative">
        <img className="w-full h-full object-cover" src={entity.relatedItems.url} />
        <div
            className="w-8 h-8 grid place-items-center bg-white absolute bottom-0 left-0 opacity-50"
        >
            <BooleanProperty
                value={entity.isDefault}
            />
        </div>
    </div>
}

const entityActions = entity => {

    const setAsDefault = ({
        error,
        reload,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post(`/image/setAsDefault/${entity.id}`)
            .then(data => {
                setProgress(false)
                success('Image was set as the default image')
                reload()
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <>
        {
            !entity.isDefault && <EntityAction
                title="Set as default"
                icon={CheckIcon}
                click={setAsDefault}
            />
        }
    </>
}

const Images = () => {
    return <List
        title='Images'
        entityType='Image'
        filters={filters}
        card={card}
        entityActions={entityActions}
        multicolumn
        create={ImageForm}
        // autoCreate
        hasDelete
    />
}

export default Images
