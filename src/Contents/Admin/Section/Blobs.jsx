import BlobsForm from '../Shared/BlobsForm'

const SectionBlobs = ({
    parentEntity,
    setProgress,
}) => {

    const { sectionId } = app.parseQuery()

    return <BlobsForm
        title='Blobs'
        getUrl={`/sectionPart/blobs?sectionId=${sectionId}`}
        saveTo={entity => `/sectionPartValue/saveBlob?partId=${entity.id}`}
        breadcrumbItems={[
            {
                title: parentEntity?.name,
                link: `/sections?name=${parentEntity?.name}`
            }
        ]}
        setProgress={setProgress}
    />
}

export default SectionBlobs
