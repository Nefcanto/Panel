import { UserBrowser } from './User/Browser'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import UserChip from '../Common/User/Chip'
import UserChips from '../Common/User/Chips'
import UserField from './User/Field'
import Users from './User/List'

const AccountsRoutes = [
    {
        path: "/users",
        component: Users
    }
]

const AccountsMenu = [
    {
        title: "Users",
        icon: PeopleAltIcon,
        path: "/users"
    }
]

export { AccountsMenu }
export { AccountsRoutes }
export { UserBrowser }
export { UserChip }
export { UserChips }
export { UserField }
export { Users }
