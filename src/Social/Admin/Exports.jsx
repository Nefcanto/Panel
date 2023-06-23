import CommentCards from '../Common/Comment/Cards'
import Comments from './Comment/List'
import CommentsCount from './Comment/Chart'
import ViewComments from './Comment/View'

const SocialRoutes = [
    {
        path: "/comments",
        component: Comments
    }
]

const SocialMenu = [
]

export { CommentCards }
export { Comments }
export { CommentsCount }
export { SocialMenu }
export { SocialRoutes }
export { ViewComments }
