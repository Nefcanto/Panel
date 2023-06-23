import { PageForm, Rte, app, post } from 'Form'

const inputs = <>
    <Rte
        property='Content'
        placeholder='Write the page content here ...'
    />
</>

const PageContent = () => {
    return <PageForm
        title='Edit content'
        entityType="PageContent"
        inputs={inputs}
        large
    />
}

export default PageContent
