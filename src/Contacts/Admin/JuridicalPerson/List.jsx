import HomeIcon from '@mui/icons-material/Home'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import JuridicalPersonForm from './Form'
import {
    EntityAction,
    ImageTd,
    List,
} from 'List'

const headers = <>
    <th></th>
    <th>Name</th>
</>

const entityActions = entity => <>
    <EntityAction
        title='Addresses'
        icon={HomeIcon}
        goTo={`/addresses?personId=${entity.id}`}
    />
    <EntityAction
        title='Phones'
        icon={ContactPhoneIcon}
        goTo={`/phones?personId=${entity.id}`}
    />
</>

const row = entity => <>
    <ImageTd
        url={entity.relatedItems?.imageUrl}
        uploadUrl={`/person/setImage?id=${entity.id}`}
        deletionUrl={`/person/deleteImage?id=${entity.id}`}
    />
    <td>{entity.name}</td>
</>

const JuridicalPersons = () => {
    return <List
        title='Juridical persons'
        entityType='JuridicalPerson'
        entityActions={entityActions}
        headers={headers}
        row={row}
        create={JuridicalPersonForm}
    />
}

export default JuridicalPersons
