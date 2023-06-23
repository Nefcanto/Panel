import { Comments } from 'Social'

const PostComments = ({
    parentEntity,
    progress,
}) => {
    return !progress && <Comments
        breadcrumbItems={[
            {
                title: 'Posts',
                link: '/posts'
            },
            {
                title: parentEntity?.title,
                link: `/posts?title=${parentEntity?.title}`
            }
        ]}
    />
}

export default PostComments
