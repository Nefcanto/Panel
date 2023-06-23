import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import CountryForm from './Form'
import {
    EntityAction,
    List,
    Text,
} from 'List'

const filters = <>
    <Text
        property='Name'
        placehodler='Name'
    />
</>

const headers = <>

    <th>Name</th>
    <th>Capital</th>
    <th>OfficialName</th>
    <th>AlternativeName</th>
    <th>Cctld</th>

</>

const row = entity => {

    return <>
        <td>
            {entity?.name}
        </td>
        <td>
            {entity?.capital}
        </td>
        <td>
            {entity?.officialName}
        </td>
        <td>
            {entity?.alternativeName}
        </td>
        <td>
            {entity?.cctld}
        </td>
    </>
}

const entityActions = entity => <>

    <EntityAction
        title="Management of administrativeDivisions"
        icon={FlagCircleIcon}
        goTo={`/administrativeDivisions?countryId=${entity?.id}`}
    />
</>

const Countries = ({ isSuperAdmin }) => {
    return <List
        title='Countries'
        entityType='Country'
        breadcrumbItems={[
            {
                title: 'Countries'
            }
        ]}
        filters={filters}
        headers={headers}
        entityActions={entityActions}
        row={row}
        create={isSuperAdmin && CountryForm}
        hasEdit
        hasDelete
    />
}

export default Countries
