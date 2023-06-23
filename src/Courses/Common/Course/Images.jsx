import { ImageGroup } from 'List'

const Images = entity => <td>
    <ImageGroup
        urls={entity.relatedItems.images?.map(i => i.relatedItems.url)}
    />
</td>

export default Images
