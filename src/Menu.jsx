import DashboardIcon from '@mui/icons-material/Dashboard'

import { BlogMenu } from 'Blog'
import { ConfigurationMenu } from 'Configuration'
import { ContentsMenu } from 'Contents'
import { CoursesMenu } from 'Courses'
import { EntitiesMenu } from 'Entities'
import { GlobalizationMenu } from 'Globalization'
import { NavigationMenu } from 'Navigation'
import { OrdersMenu } from 'Orders'
import { VlogMenu } from 'Vlog'

const menuItems = [
    {
        title: "Dashboard",
        icon: DashboardIcon,
        path: "/"
    },
    ...CoursesMenu,
    ...OrdersMenu,
    ...BlogMenu,
    ...VlogMenu,
    ...ContentsMenu,
    ...NavigationMenu,
    ...EntitiesMenu,
    ...ConfigurationMenu,
    ...GlobalizationMenu,
]

export default menuItems
