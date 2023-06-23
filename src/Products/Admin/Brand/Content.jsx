import {
    PageForm,
    Rte,
} from 'Form'

const inputs = <>
    <Rte
        property='Content'
        placeholder="Write the brand's description here ..."
    />
</>

const BrandContent = () => {
    return <PageForm
        title='Edit description'
        entityType="BrandContent"
        inputs={inputs}
        large
    />
}

export default BrandContent
