import DataForm from '../Shared/DataForm'

const ItemData = () => {

    const { sectionId, itemId } = app.parseQuery()

    return <DataForm
        title='Item data'
        getUrl={`/itemPart/nonBlobs?sectionId=${sectionId}&itemId=${itemId}`}
        submitTo='/itemPartValue/save'
    />
}

export default ItemData
