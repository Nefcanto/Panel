import {
    Image,
    List,
} from 'List'

const card = entity => <>
    <Image
        url={entity.relatedItems?.imageUrl}
        uploadUrl={`/person/setImage?id=${entity.id}`}
        deletionUrl={`/person/deleteImage?id=${entity.id}`}
    />
    {
        entity.naturalPersonName ?
            <>
                <div>{entity.naturalPersonName}</div>
            </>
            :
            <>
                <div>{entity.juridicalPersonName}</div>
            </>
    }
</>

const Persons = (props) => {
    return <List
        title='Persons'
        entityType='Person'
        card={card}
        {...props}
    />
}

export default Persons
