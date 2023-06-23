import { Comments } from 'Social'

const BlogComments = () => {
    return <Comments
        breadcrumbItems={[
            {
                title: "Blog",
                link: '/posts'
            }
        ]}
    />
}

export default BlogComments
