import { Tags } from 'Taxonomy'

const VlogTags = () => {
    return <Tags
        breadcrumbItems={[
            {
                title: 'videos',
                link: '/videos'
            }
        ]}
    />
}

export default VlogTags
