import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BrandContent from './Brand/Content'
import Brands from './Brand/List'
import ContentEntityAction from '../Common/ContentEntityAction'
import ImageTd from '../Common/ImageTd'
import ProductContent from './Product/Content'
import ProductForm from './Product/Form'
import Products from './Product/List'
import Title from '../Common/Title'

const ProductsRoutes = [
    {
        path: '/products',
        component: Products
    },
    {
        path: "/productContent",
        component: ProductContent
    },
    {
        path: '/brands',
        component: Brands
    },
    {
        path: "/brandContent",
        component: BrandContent
    }
]

const ProductsMenu = [
    {
        title: 'Products',
        icon: ShoppingCartIcon,
        children: [
            {
                title: 'Products',
                path: '/products'
            },
            {
                title: 'Brands',
                path: '/brands'
            },
            {
                title: 'Categories',
                path: '/hierarchies?entityType=product'
            }
        ]
    }
]

export { ContentEntityAction }
export { ImageTd }
export { ProductForm }
export { Products }
export { ProductsMenu }
export { ProductsRoutes }
export { Title }
