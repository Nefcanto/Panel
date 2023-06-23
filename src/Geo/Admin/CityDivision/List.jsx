import CityDivisionForm from './Form'
import {
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

const CityDivisions = () => {

    return <List
        title='CityDivisions'
        entityType='CityDivision'
        breadcrumbItems={[
            {
                title: 'Countries',
                link: '/countries'
            }
        ]}
        filters={filters}
        headers={headers}
        row={row}
        create={CityDivisionForm}
        hasEdit
        hasDelete
    />
}

export default CityDivisions
