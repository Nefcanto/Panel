import CollectionsIcon from '@mui/icons-material/Collections'
import { EntityAction } from 'List'

const ManageImages = ({
    entityGuid,
    entityType
}) => {
    return <EntityAction
        title='Manage images'
        icon={CollectionsIcon}
        goTo={`/media/images?entityType=${entityType}&entityGuid=${entityGuid}`}
    />
}

export default ManageImages
