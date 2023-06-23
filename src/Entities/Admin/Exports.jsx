import FingerprintIcon from '@mui/icons-material/Fingerprint'
import EntityTypeField from '../Common/EntityType/Field'
import EntityTypeFilter from '../Common/EntityType/Filter'
import EntityTypes from './EntityType/List'

const EntitiesRoutes = [
    {
        path: "/entityTypes",
        component: EntityTypes,
        superAdmin: true
    }
]

const EntitiesMenu = [
    {
        title: "Entity Types",
        icon: FingerprintIcon,
        path: "/entityTypes",
        superAdmin: true
    }
]

export { EntityTypeField }
export { EntityTypeFilter }
export { EntitiesMenu }
export { EntitiesRoutes }
