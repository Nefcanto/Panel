import DataForm from '../Shared/DataForm'

const SectionData = () => {

    const { sectionId } = app.parseQuery()

    return <DataForm
        title='Section data'
        getUrl={`/sectionPart/nonBlobs?sectionId=${sectionId}`}
        submitTo='/sectionPartValue/save'
    />
}

export default SectionData
