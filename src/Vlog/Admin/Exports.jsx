import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import Videos from './Video/List'
import VlogHierarchies from './Categories'
import VlogTags from './Tags'

const VlogRoutes = [
    {
        path: "/videos",
        component: Videos
    },
    {
        path: "/vlogCategories",
        component: VlogHierarchies
    },
    {
        path: "/vlogTags",
        component: VlogTags
    }
]

const VlogMenu = [
    {
        title: "Vlog",
        icon: OndemandVideoIcon,
        children: [
            {
                title: "Videos",
                path: "/videos"
            },
            {
                title: "Categories",
                path: "/vlogCategories?entityType=vlogvideo"
            },
            {
                title: "Tags",
                path: "/vlogTags?entityType=vlogvideo"
            }
        ]
    }
]

export { Videos }
export { VlogMenu }
export { VlogRoutes }
