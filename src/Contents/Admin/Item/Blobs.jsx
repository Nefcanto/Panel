import BlobsForm from '../Shared/BlobsForm'

const ItemBlobs = ({
    parentEntity,
    setProgress,
}) => {

    const { sectionId, itemId } = app.parseQuery()

    return <BlobsForm
        title='Blobs'
        breadcrumbItems={[
            {
                title: `${parentEntity?.name}`,
                link: `/sections?name=${parentEntity?.name}`
            },
            {
                title: 'Items',
                link: `/section/items?sectionId=${parentEntity?.id}&name=${parentEntity?.name}`
            }
        ]}
        getUrl={`/itemPart/blobs?sectionId=${sectionId}&itemId=${itemId}`}
        saveTo={entity => `/itemPartValue/saveBlob?partId=${entity.id}`}
        setProgress={setProgress}
    />
}

export default ItemBlobs
