import SettingsIcon from '@mui/icons-material/Settings'
import { EntityAction } from 'List'

const EntityConfigsAction = ({
    entityType,
    entityGuid,
    ...rest
}) => <EntityAction
        {...rest}
        title='Configure entity'
        icon={SettingsIcon}
        goTo={`/entityConfig?entityType=${entityType}&entityGuid=${entityGuid}`}
    />

export default EntityConfigsAction
