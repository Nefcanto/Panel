import { Tags } from 'Taxonomy'

const BlogTags = () => {
    return <Tags
        breadcrumbItems={[
            {
                title: 'Blog',
                link: '/posts'
            }
        ]}
    />
}

export default BlogTags
