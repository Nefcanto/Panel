import { get } from 'App'

import {
    PageForm,
    Rte,
} from 'Form'

const inputs = <>
    <Rte
        property='Content'
        placeholder='Write your post here ...'
    />
</>

const PostContent = () => {

    return <PageForm
        title='Edit content'
        entityType="BlogPostContent"
        parentEntityType='BlogPost'
        breadcrumbItems={parent => [
            {
                title: 'Posts',
                link: '/posts'
            },
            {
                title: parent?.title,
                link: `/posts?title=${parent?.title}`
            }
        ]}
        inputs={inputs}
        large
    />
}

export default PostContent
