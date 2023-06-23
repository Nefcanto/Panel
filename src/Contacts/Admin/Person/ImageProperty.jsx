import { Image } from 'List'

const ImageProperty = ({ entity }) => {
    return <Image
        url={entity.relatedItems.imageUrl}
        uploadUrl={`/person/setImage?id=${entity.id}`}
        deletionUrl={`/person/deleteImage?id=${entity.id}`}
    />
}

export default ImageProperty
