import CommentIcon from '@mui/icons-material/Comment'
import { EntityAction } from 'List'

const ViewComments = ({
    entityGuid,
    entityType,
    goTo,
    ...rest
}) => {

    const basePath = goTo || '/comments'

    return <EntityAction
        {...rest}
        title='View comments'
        icon={CommentIcon}
        goTo={`${basePath}${basePath.indexOf('?') > -1 ? '&' : '?'}entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`}
    />
}

export default ViewComments
