import { ImageTd } from 'List'

const ProductImageTd = entity => <ImageTd
    url={entity?.relatedItems?.imageUrl}
    uploadUrl={`/product/setImage?id=${entity?.id}`}
    deletionUrl={`/product/deleteImage?id=${entity?.id}`}
/>

export default ProductImageTd
