import { HierarchyTree } from 'Taxonomy'

const BlogHierarchies = () => {
    return <HierarchyTree
        title="Blog Categories"
        breadcrumbItems={[
            {
                title: 'Blog',
                link: '/posts'
            }
        ]}
    />
}

export default BlogHierarchies
