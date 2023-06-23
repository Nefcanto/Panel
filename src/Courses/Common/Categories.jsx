import { HierarchyTree } from 'Taxonomy'

const CourseHierarchies = () => {
    return <HierarchyTree
        title="Course Categories"
        breadcrumbItems={[
            {
                title: 'Courses',
                link: '/courses'
            }
        ]}
    />
}

export default CourseHierarchies
