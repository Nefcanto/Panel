import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import {
    EntityAction,
    ImageTd,
    List,
    Text,
} from 'List'
import NaturalPersonForm from './Form'

const filters = <>
    <Text
        property='FullName'
        placeholder='Name'
    />
</>

const headers = <>
    <th></th>
    <th>Name</th>
</>

const row = entity => <>
    <ImageTd
        url={entity.relatedItems?.imageUrl}
        uploadUrl={`/person/setImage?id=${entity.id}`}
        deletionUrl={`/person/deleteImage?id=${entity.id}`}
    />
    <td>{entity.fullName || entity.naturalPersonName}</td>
</>

const entityActions = entity => <>
    <EntityAction
        title='Relations'
        icon={BusinessIcon}
        goTo={`/relations?naturalPersonId=${entity?.id}`}

    />
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

const NaturalPersons = (props) => {
    return <List
        title='Natural persons'
        entityType='NaturalPerson'
        filters={filters}
        headers={headers}
        row={row}
        create={NaturalPersonForm}
        entityActions={entityActions}
        hasDelete
        {...props}
    />
}

export default NaturalPersons
