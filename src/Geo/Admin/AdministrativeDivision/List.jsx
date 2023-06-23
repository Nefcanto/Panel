import LocationCityIcon from '@mui/icons-material/LocationCity'
import AdministrativeDivisionForm from './Form'
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
</>

const row = entity => {

    return <>
        <td>
            {entity?.name}
        </td>
    </>
}

const entityActions = entity => <>

    <EntityAction
        title="Management of cities"
        icon={LocationCityIcon}
        goTo={`/cities?administrativeDivisionId=${entity?.id}`}
    />
</>

const AdministrativeDivisions = () => {
    return <List
        title='AdministrativeDivisions'
        entityType='AdministrativeDivision'
        breadcrumbItems={[
            {
                title: 'AdministrativeDivisions'
            }
        ]}
        filters={filters}
        headers={headers}
        entityActions={entityActions}
        row={row}
        create={AdministrativeDivisionForm}
        hasEdit
        hasDelete
    />
}

export default AdministrativeDivisions
