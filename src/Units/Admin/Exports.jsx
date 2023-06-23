import ViewInArIcon from '@mui/icons-material/ViewInAr'
import Assignments from './Assignments/List'
import Units from './Unit/List'

const UnitsMenu = [
    {
        title: 'Units',
        icon: ViewInArIcon,
        path: '/units',
        superAdmin: true
    }
]

const UnitsRoutes = [
    {
        path: '/units',
        component: Units,
    },
    {
        path: '/unitAssignments',
        component: Assignments
    }
]

export { UnitsMenu }
export { UnitsRoutes }
