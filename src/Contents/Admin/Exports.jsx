import AbcIcon from '@mui/icons-material/Abc'
import ItemBlobs from './Item/Blobs'
import ItemData from './Item/Data'
import ItemParts from './ItemPart/List'
import Items from './Item/List'
import Layouts from './Layout/List'
import PageContent from './Page/Content'
import Pages from './Page/List'
import SectionBlobs from './Section/Blobs'
import SectionContent from './Section/Content'
import SectionData from './Section/Data'
import SectionParts from './SectionPart/List'
import Sections from './Section/List'

const ContentsRoutes = [
    {
        path: '/layouts',
        component: Layouts
    },
    {
        path: '/pages',
        component: Pages
    },
    {
        path: '/pageContent',
        component: PageContent
    },
    {
        path: '/sections',
        component: Sections
    },
    {
        path: '/sectionParts',
        component: SectionParts
    },
    {
        path: '/section/data',
        component: SectionData
    },
    {
        path: '/section/blobs',
        component: SectionBlobs
    },
    {
        path: '/section/content',
        component: SectionContent
    },
    {
        path: '/section/items',
        component: Items
    },
    {
        path: '/section/itemParts',
        component: ItemParts
    },
    {
        path: '/section/item/data',
        component: ItemData
    },
    {
        path: '/section/item/blobs',
        component: ItemBlobs
    }
]

const ContentsMenu = [
    {
        title: 'Contents',
        icon: AbcIcon,
        children: [
            {
                title: 'Layouts',
                path: '/layouts',
                superAdmin: true
            },
            {
                title: 'Pages',
                path: '/pages'
            },
            {
                title: 'Sections',
                path: '/sections'
            },
        ]
    }
]

export { ContentsMenu }
export { ContentsRoutes }
