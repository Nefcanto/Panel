import ArticleIcon from '@mui/icons-material/Article'
import Authors from './Author/List'
import BlogComments from './Comments'
import BlogHierarchies from './Categories'
import BlogPosts from './Post/List'
import BlogTags from './Tags'
import PostComments from './Post/Comments'
import PostContent from './Post/Content'
import PostCount from './Post/Count'
import SequencePosts from './SequencePost/List'
import Sequences from './Sequence/List'

const BlogRoutes = [
    {
        path: "/posts",
        component: BlogPosts
    },
    {
        path: "/blogComments",
        component: BlogComments
    },
    {
        path: "/postComments",
        component: PostComments
    },
    {
        path: "/postContent",
        component: PostContent
    },
    {
        path: "/blogCategories",
        component: BlogHierarchies
    },
    {
        path: "/blogTags",
        component: BlogTags
    },
    {
        path: "/authors",
        component: Authors
    },
    {
        path: '/sequences',
        component: Sequences
    },
    {
        path: '/sequence/posts',
        component: SequencePosts
    }
]

const BlogMenu = [
    {
        title: "Blog",
        icon: ArticleIcon,
        children: [
            {
                title: "Posts",
                path: "/posts"
            },
            {
                title: "Comments",
                path: "/blogComments?entityType=blogPost"
            },
            {
                title: "Categories",
                path: "/blogCategories?entityType=blogPost"
            },
            {
                title: "Tags",
                path: "/blogTags?entityType=blogPost"
            },
            {
                title: "Authors",
                path: "/authors"
            },
            {
                title: 'Sequences',
                path: '/sequences'
            },
        ]
    }
]

export { BlogMenu }
export { BlogRoutes }
export { PostCount }
