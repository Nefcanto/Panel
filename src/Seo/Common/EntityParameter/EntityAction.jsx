import FindInPageIcon from '@mui/icons-material/FindInPage'
import { EntityAction } from 'List'

const EntitySeo = ({
    entityType,
    entityGuid,
    ...rest
}) => {
    return <EntityAction
        {...rest}
        title='Manage SEO'
        icon={FindInPageIcon}
        goTo={`/seo/entity?entityType=${app.camelize(entityType)}&entityGuid=${entityGuid}`}
        superAdmin
    />
}

export default EntitySeo
