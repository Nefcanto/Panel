import SearchIcon from '@mui/icons-material/Search'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import BrokenLinks from './BrokenLink/List'
import EntityParameterForm from './EntityParameter/Form'
import EntityParameters from './EntityParameter/List'
import EntitySeo from '../Common/EntityParameter/EntityAction'
import Gones from './Gone/List'
import ParameterObjectInputs from './ParameterObject/Inputs'
import PathParameters from './PathParameter/List'
import QueryParameterForm from './QueryParameter/Form'
import QueryParameters from './QueryParameter/List'
import Redirects from './Redirect/List'
import Snippets from './Snippet/List'

const SeoRoutes = [
    {
        path: "/seo/entities",
        component: EntityParameters
    },
    {
        path: "/seo/entity",
        component: EntityParameterForm
    },
    {
        path: "/seo/queries",
        component: QueryParameters
    },
    {
        path: "/seo/query/create",
        component: QueryParameterForm
    },
    {
        path: "/seo/query/edit",
        component: QueryParameterForm
    },
    {
        path: "/seo/snippets",
        component: Snippets
    },
    {
        path: "/redirects",
        component: Redirects
    },
    {
        path: "/gones",
        component: Gones
    },
    {
        path: "/brokenLinks",
        component: BrokenLinks
    },
    {
        path: "/paths",
        component: PathParameters
    }
]

const SeoMenu = [
    {
        title: "SEO",
        icon: SearchIcon,
        superAdmin: true,
        children: [
            {
                title: "Paths",
                path: "/paths"
            },
            {
                title: "Gones",
                path: "/gones"
            },
            {
                title: "Redirects",
                path: "/redirects"
            }
        ]
    },
    {
        title: "SEO Checker",
        icon: MonitorHeartIcon,
        superAdmin: true,
        children: [
            {
                title: "Broken links",
                path: "/brokenLinks"
            }
        ]
    }
]

export { EntitySeo }
export { SeoMenu }
export { SeoRoutes }
export { ParameterObjectInputs }
