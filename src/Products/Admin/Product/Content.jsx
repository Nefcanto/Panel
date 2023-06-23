import {
    PageForm,
    Rte,
} from 'Form'

const inputs = <>
    <Rte
        property='Content'
        placeholder="Write the product's description here ..."
    />
</>

const ProductContent = () => {
    return <PageForm
        title='Edit description'
        entityType="ProductContent"
        inputs={inputs}
        large
    />
}

export default ProductContent
