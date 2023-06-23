import {
    Browse,
    List,
    Text,
} from 'List'
import RelationForm from './Form'
import NaturalPersonFilter from '../NaturalPerson/Filter'
import JuridicalPersonFielter from '../JuridicalPerson/Filter'

const filters = <>
    <JuridicalPersonFielter />
    <NaturalPersonFilter />
</>

const headers = <>
    <th>Juridical</th>
    <th>Natural</th>
    <th>Job</th>
</>

const row = entity => <>
    <td>{entity.juridicalPersonName}</td>
    <td>{entity.fullName}</td>
    <td>{entity.jobTitleText}</td>
</>

const Relations = (props) => {
    return <List
        title='Relations'
        entityType='Relation'
        filters={filters}
        headers={headers}
        row={row}
        create={RelationForm}
        hasDelete
        {...props}
    />
}

export default Relations
