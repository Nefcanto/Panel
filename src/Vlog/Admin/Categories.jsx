import { HierarchyTree } from 'Taxonomy'

const VlogHierarchies = () => {
    return <HierarchyTree
        title="Vlog Categories"
        breadcrumbItems={[
            {
                title: 'Vlog',
                link: '/videos'
            }
        ]}
    />
}

export default VlogHierarchies
