import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Orders from './Order/List'

const OrdersMenu = [
    {
        title: 'Orders',
        icon: AddShoppingCartIcon,
        path: '/orders'
    }
]

const OrdersRoutes = [
    {
        path: '/orders',
        component: Orders
    }
]

export { OrdersMenu }
export { OrdersRoutes }
