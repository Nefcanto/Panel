import LocationCityIcon from '@mui/icons-material/LocationCity'
import CityForm from './Form'
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
        title="Management of CityDivisions"
        icon={LocationCityIcon}
        goTo={`/cityDivisions?cityId=${entity?.id}`}
    />
</>

const Cities = () => {
    return <List
        title='Cities'
        entityType='City'
        filters={filters}
        headers={headers}
        row={row}
        entityActions={entityActions}
        create={CityForm}
        hasEdit
        hasDelete
        breadcrumbItems={[
            {
                title: 'Countries',
                link: '/countries'
            }
        ]}
    />
}

export default Cities
