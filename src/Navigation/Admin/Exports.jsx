import NavigationIcon from '@mui/icons-material/Navigation'
import MenuItems from './MenuItem/Tree'

const NavigationRoutes = [
    {
        path: "/menuItems",
        component: MenuItems
    }
]

const NavigationMenu = [
    {
        icon: NavigationIcon,
        title: "Menu",
        path: "/menuItems"
    },
]

export { NavigationRoutes }
export { NavigationMenu }
