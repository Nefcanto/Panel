import ShuffleIcon from '@mui/icons-material/Shuffle'
import SearchIcon from '@mui/icons-material/Search'
import {
    EntityAction,
    Image,
    List,
    ListAction,
    post,
    Text,
} from 'List'

const listActions = (itemIds) => {

    const findAll = ({
        error,
        reloadList,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post('/entityType/findAll').then(data => {
            success('Found all entity types')
            setProgress(false)
            reloadList()
        }, e => {
            error(e)
            setProgress(false)
            reloadList()
        })
    }

    const setRandomDefaultImages = ({
        error,
        reloadList,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post('/entityType/setRandomDefaultImages', itemIds).then(data => {
            success('Random default images are set')
            setProgress(false)
            reloadList()
        }, e => {
            error(e)
            setProgress(false)
            reloadList()
        })
    }

    return <>
        <ListAction
            text="Find all"
            title="Finds all entity types existing in this software instance"
            icon={SearchIcon}
            click={(params) => findAll(params)}
            superAdmin
        />
        <ListAction
            text="Set random images"
            title="Random images would be set as default images for the selected entity types"
            icon={ShuffleIcon}
            minCardinality={1}
            click={(params) => setRandomDefaultImages(params)}
            superAdmin
            devOnly
        />
    </>
}

const filters = <>
    <Text
        property='Name'
        placeholder='Name'
    />
</>

const sorts = [
    {
        caption: "A-Z",
        property: "Name",
        direction: "asc"
    },
    {
        caption: "Z-A",
        property: "Name",
        direction: "desc"
    }
]

const headers = <>
    <th start>Default image</th>
    <th>Name</th>
</>

const row = entity => <>
    <td start>
        <Image
            url={entity.relatedItems.defaultImageUrl}
            uploadUrl={`/entityType/setImage?id=${entity.id}`}
        />
    </td>
    <td>{entity.name}</td>
</>

const entityActions = entity => {
    const setRandomDefaultImage = ({
        error,
        setEntity,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post(`/entityType/setRandomDefaultImage?id=${entity.id}`)
            .then(data => {
                success('Random default image is set')
                setProgress(false)
                setEntity(data)
            }, e => {
                error(e)
                setProgress(false)
            })
    }

    return <>
        <EntityAction
            title='Set random default image'
            icon={ShuffleIcon}
            click={(params) => setRandomDefaultImage(params)}
            superAdmin
            devOnly
        />
    </>
}

const EntityTypes = () => {
    return <List
        title='Entity Types'
        entityType='entityType'
        listActions={listActions}
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        entityActions={entityActions}
    />
}

export default EntityTypes
