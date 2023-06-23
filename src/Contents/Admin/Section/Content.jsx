import { PageForm, Rte, app, post } from 'Form'

const inputs = <>
    <Rte
        property='Content'
        placeholder='Write your content here ...'
    />
</>

const SectionContent = () => {
    return <PageForm
        title='Edit content'
        entityType="SectionContent"
        inputs={inputs}
        large
    />
}

export default SectionContent
