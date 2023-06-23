import { Tags } from 'Taxonomy'

const CourseTags = () => {
    return <Tags
        breadcrumbItems={[
            {
                title: 'Courses',
                link: '/courses'
            }
        ]}
    />
}

export default CourseTags
